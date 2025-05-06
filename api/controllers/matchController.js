import User from "../models/User.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";
import MatchCard from '../models/MatchCard.js';
import { createNotification } from './notificationController.js';
import cloudinary from '../config/cloudinary.js';

export const swipeRight = async (req, res) => {
	try {
		const { likedUserId } = req.params;
		const currentUser = await User.findById(req.user.id);
		const likedUser = await User.findById(likedUserId);

		if (!likedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		if (!currentUser.likes.includes(likedUserId)) {
			currentUser.likes.push(likedUserId);
			await currentUser.save();

			// if the other user already liked us, it's a match, so let's update both users
			if (likedUser.likes.includes(currentUser.id)) {
				currentUser.matches.push(likedUserId);
				likedUser.matches.push(currentUser.id);

				await Promise.all([await currentUser.save(), await likedUser.save()]);

				// send notification in real-time with socket.io
				const connectedUsers = getConnectedUsers();
				const io = getIO();

				const likedUserSocketId = connectedUsers.get(likedUserId);

				if (likedUserSocketId) {
					io.to(likedUserSocketId).emit("newMatch", {
						_id: currentUser._id,
						name: currentUser.name,
						image: currentUser.image,
					});
				}

				const currentSocketId = connectedUsers.get(currentUser._id.toString());
				if (currentSocketId) {
					io.to(currentSocketId).emit("newMatch", {
						_id: likedUser._id,
						name: likedUser.name,
						image: likedUser.image,
					});
				}
			}
		}

		res.status(200).json({
			success: true,
			user: currentUser,
		});
	} catch (error) {
		console.log("Error in swipeRight: ", error);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const swipeLeft = async (req, res) => {
	try {
		const { dislikedUserId } = req.params;
		const currentUser = await User.findById(req.user.id);

		if (!currentUser.dislikes.includes(dislikedUserId)) {
			currentUser.dislikes.push(dislikedUserId);
			await currentUser.save();
		}

		res.status(200).json({
			success: true,
			user: currentUser,
		});
	} catch (error) {
		console.log("Error in swipeLeft: ", error);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const getMatches = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).populate("matches", "name image");

		res.status(200).json({
			success: true,
			matches: user.matches,
		});
	} catch (error) {
		console.log("Error in getMatches: ", error);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const getUserProfiles = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);

		const users = await User.find({
			$and: [
				{ _id: { $ne: currentUser.id } },
				{ _id: { $nin: currentUser.likes } },
				{ _id: { $nin: currentUser.dislikes } },
				{ _id: { $nin: currentUser.matches } },
				{
					gender:
						currentUser.genderPreference === "both"
							? { $in: ["male", "female"] }
							: currentUser.genderPreference,
				},
				{ genderPreference: { $in: [currentUser.gender, "both"] } },
			],
		});

		res.status(200).json({
			success: true,
			users,
		});
	} catch (error) {
		console.log("Error in getUserProfiles: ", error);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// Create a new match card
export const createMatchCard = async (req, res) => {
	try {
		const {
			name,
			age,
			gender,
			location,
			email,
			phone,
			pictures,
			profession,
			education,
			religion,
			familyBackground,
			hobbies,
			relationshipStatus,
			previousMarriages,
			divorceDetails,
			hasChildren,
			numberOfChildren,
			childrenAges,
			livingArrangement,
			partnerAgeRange,
			partnerLocationPreference,
			partnerReligionPreference,
			partnerEducationPreference,
			acceptPartnerWithChildren,
			dealBreakers,
			marriageTimeframe,
			privacyLevel
		} = req.body;

		// Upload pictures to Cloudinary
		const uploadedPictures = await Promise.all(
			pictures.map(async (picture) => {
				if (picture.url.startsWith('data:')) {
					const result = await cloudinary.uploader.upload(picture.url, {
						folder: 'match_cards',
						resource_type: 'auto'
					});
					return {
						url: result.secure_url,
						isPrimary: picture.isPrimary
					};
				}
				return picture;
			})
		);

		// Create match card
		const matchCard = new MatchCard({
			user: req.user._id,
			name,
			age,
			gender,
			location,
			email,
			phone,
			pictures: uploadedPictures,
			profession,
			education,
			religion,
			familyBackground,
			hobbies: hobbies.split(',').map(h => h.trim()),
			relationshipStatus,
			previousMarriages,
			divorceDetails,
			hasChildren,
			numberOfChildren,
			childrenAges,
			livingArrangement,
			partnerAgeRange,
			partnerLocationPreference,
			partnerReligionPreference,
			partnerEducationPreference,
			acceptPartnerWithChildren,
			dealBreakers,
			marriageTimeframe,
			privacyLevel,
			status: 'matching'
		});

		await matchCard.save();

		// Create notification for match card creation
		await createNotification(
			req.user._id,
			'Profile Created',
			'Your match card has been created successfully. We are now finding your perfect match!',
			'getting_started',
			'/match-track'
		);

		// Start matching process
		await findPotentialMatches(matchCard._id);

		res.status(201).json({
			success: true,
			data: matchCard
		});
	} catch (error) {
		console.error('Error creating match card:', error);
		res.status(500).json({
			success: false,
			error: 'Error creating match card'
		});
	}
};

// Find potential matches for a user
const findPotentialMatches = async (matchCardId) => {
	try {
		const matchCard = await MatchCard.findById(matchCardId);
		if (!matchCard) return;

		// Find potential matches based on preferences
		const potentialMatches = await MatchCard.find({
			_id: { $ne: matchCardId },
			status: 'matching',
			gender: matchCard.partnerGenderPreference,
			'partnerGenderPreference': matchCard.gender,
			age: {
				$gte: parseInt(matchCard.partnerAgeRange.split('-')[0]),
				$lte: parseInt(matchCard.partnerAgeRange.split('-')[1])
			},
			'partnerAgeRange': {
				$regex: new RegExp(matchCard.age.toString())
			},
			religion: matchCard.partnerReligionPreference,
			'partnerReligionPreference': matchCard.religion
		});

		// Calculate compatibility scores and create matches
		for (const potentialMatch of potentialMatches) {
			const compatibilityScore = calculateCompatibilityScore(matchCard, potentialMatch);
			
			if (compatibilityScore >= 70) { // Only create matches with 70% or higher compatibility
				matchCard.matches.push({
					user: potentialMatch.user,
					compatibilityScore,
					status: 'pending'
				});

				// Create notification for potential match
				await createNotification(
					matchCard.user,
					'Potential Match Found',
					`We found a potential match with ${compatibilityScore}% compatibility!`,
					'match',
					'/match-track'
				);
			}
		}

		await matchCard.save();
	} catch (error) {
		console.error('Error finding potential matches:', error);
	}
};

// Calculate compatibility score between two users
const calculateCompatibilityScore = (user1, user2) => {
	let score = 0;
	const totalFactors = 5;

	// Age compatibility (20%)
	const ageScore = calculateAgeCompatibility(user1.age, user2.age);
	score += ageScore * 0.2;

	// Location compatibility (20%)
	const locationScore = user1.location === user2.location ? 100 : 50;
	score += locationScore * 0.2;

	// Religion compatibility (20%)
	const religionScore = user1.religion === user2.religion ? 100 : 50;
	score += religionScore * 0.2;

	// Education compatibility (20%)
	const educationScore = calculateEducationCompatibility(user1.education, user2.education);
	score += educationScore * 0.2;

	// Hobbies compatibility (20%)
	const hobbiesScore = calculateHobbiesCompatibility(user1.hobbies, user2.hobbies);
	score += hobbiesScore * 0.2;

	return Math.round(score);
};

// Helper functions for compatibility calculation
const calculateAgeCompatibility = (age1, age2) => {
	const ageDiff = Math.abs(age1 - age2);
	if (ageDiff <= 2) return 100;
	if (ageDiff <= 5) return 80;
	if (ageDiff <= 10) return 60;
	return 40;
};

const calculateEducationCompatibility = (edu1, edu2) => {
	const educationLevels = {
		'highSchool': 1,
		'bachelors': 2,
		'masters': 3,
		'phd': 4,
		'other': 1
	};
	
	const diff = Math.abs(educationLevels[edu1] - educationLevels[edu2]);
	if (diff === 0) return 100;
	if (diff === 1) return 80;
	if (diff === 2) return 60;
	return 40;
};

const calculateHobbiesCompatibility = (hobbies1, hobbies2) => {
	const commonHobbies = hobbies1.filter(h => hobbies2.includes(h));
	return (commonHobbies.length / Math.max(hobbies1.length, hobbies2.length)) * 100;
};

// Get user's match card
export const getMatchCard = async (req, res) => {
	try {
		const matchCard = await MatchCard.findOne({ user: req.user._id });
		
		if (!matchCard) {
			return res.status(404).json({
				success: false,
				error: 'Match card not found'
			});
		}

		res.status(200).json({
			success: true,
			data: matchCard
		});
	} catch (error) {
		console.error('Error getting match card:', error);
		res.status(500).json({
			success: false,
			error: 'Error getting match card'
		});
	}
};

// Update match card
export const updateMatchCard = async (req, res) => {
	try {
		const matchCard = await MatchCard.findOne({ user: req.user._id });
		
		if (!matchCard) {
			return res.status(404).json({
				success: false,
				error: 'Match card not found'
			});
		}

		// Handle picture updates
		if (req.body.pictures) {
			const uploadedPictures = await Promise.all(
				req.body.pictures.map(async (picture) => {
					if (picture.url.startsWith('data:')) {
						const result = await cloudinary.uploader.upload(picture.url, {
							folder: 'match_cards',
							resource_type: 'auto'
						});
						return {
							url: result.secure_url,
							isPrimary: picture.isPrimary
						};
					}
					return picture;
				})
			);
			req.body.pictures = uploadedPictures;
		}

		// Update match card
		Object.assign(matchCard, req.body);
		await matchCard.save();

		// Create notification for profile update
		await createNotification(
			req.user._id,
			'Profile Updated',
			'Your match card has been updated successfully.',
			'profile_update',
			'/match-track'
		);

		res.status(200).json({
			success: true,
			data: matchCard
		});
	} catch (error) {
		console.error('Error updating match card:', error);
		res.status(500).json({
			success: false,
			error: 'Error updating match card'
		});
	}
};

// Get potential matches
export const getPotentialMatches = async (req, res) => {
	try {
		const matchCard = await MatchCard.findOne({ user: req.user._id });
		
		if (!matchCard) {
			return res.status(404).json({
				success: false,
				error: 'Match card not found'
			});
		}

		const matches = await MatchCard.find({
			_id: { $ne: matchCard._id },
			status: 'matching',
			gender: matchCard.partnerGenderPreference,
			'partnerGenderPreference': matchCard.gender
		}).populate('user', 'name email');

		res.status(200).json({
			success: true,
			data: matches
		});
	} catch (error) {
		console.error('Error getting potential matches:', error);
		res.status(500).json({
			success: false,
			error: 'Error getting potential matches'
		});
	}
};

// Accept or reject a match
export const handleMatch = async (req, res) => {
	try {
		const { matchId, action } = req.body;
		
		const matchCard = await MatchCard.findOne({ user: req.user._id });
		if (!matchCard) {
			return res.status(404).json({
				success: false,
				error: 'Match card not found'
			});
		}

		const match = matchCard.matches.id(matchId);
		if (!match) {
			return res.status(404).json({
				success: false,
				error: 'Match not found'
			});
		}

		match.status = action === 'accept' ? 'accepted' : 'rejected';
		await matchCard.save();

		// If both users accept, create a chat room
		if (action === 'accept') {
			const otherUserMatchCard = await MatchCard.findOne({
				user: match.user,
				'matches.user': req.user._id
			});

			if (otherUserMatchCard) {
				const otherMatch = otherUserMatchCard.matches.find(
					m => m.user.toString() === req.user._id.toString()
				);

				if (otherMatch && otherMatch.status === 'accepted') {
					// Create chat room logic here
					// This will be implemented in the chat system
				}
			}
		}

		res.status(200).json({
			success: true,
			data: match
		});
	} catch (error) {
		console.error('Error handling match:', error);
		res.status(500).json({
			success: false,
			error: 'Error handling match'
		});
	}
};
