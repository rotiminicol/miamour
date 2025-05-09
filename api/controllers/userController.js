import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import { createNotification } from './notificationController.js';
import asyncHandler from 'express-async-handler';

export const getAdminUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

export const updateProfile = async (req, res) => {
	try {
		console.log("Received update profile request for user:", req.user.id);
		const { 
			name, 
			bio, 
			age, 
			gender, 
			relationshipStatus, 
			maritalHistory, 
			numberOfChildren, 
			nationality, 
			hobbies, 
			image 
		} = req.body;

		let updatedData = {
			name,
			bio,
			age,
			gender,
			relationshipStatus,
			maritalHistory,
			numberOfChildren,
			nationality,
			hobbies: Array.isArray(hobbies) ? hobbies : hobbies.split(',').map(h => h.trim())
		};

		if (image) {
			const base64Image = image;
			const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
			
			try {
				console.log("Uploading image to Cloudinary...");
				const result = await cloudinary.uploader.upload(
					`data:image/${base64Image.split(';')[0].split('/')[1]};base64,${base64Data}`,
					{
						folder: "profile_images",
						resource_type: "auto"
					}
				);
				console.log("Cloudinary upload response:", result);
				updatedData.image = result.secure_url;
				
				// Create notification for profile picture update
				await createNotification(
					req.user._id,
					'Profile Updated',
					'Your profile picture has been updated successfully.',
					'profile_update',
					'/profile'
				);
			} catch (error) {
				console.error("Error uploading image to Cloudinary:", error);
				return res.status(400).json({
					success: false,
					message: `Error uploading image: ${error.message}`,
					error: error.message
				});
			}
		}

		try {
			console.log("Updating user in database with data:", { ...updatedData, image: updatedData.image ? "Image URL present" : "No image" });
			const updatedUser = await User.findByIdAndUpdate(
				req.user.id, 
				updatedData, 
				{ 
					new: true,
					runValidators: true 
				}
			);

			if (!updatedUser) {
				console.error("User not found:", req.user.id);
				return res.status(404).json({
					success: false,
					message: "User not found",
					userId: req.user.id
				});
			}

			console.log("User updated successfully:", updatedUser._id);
			
			// Create notification for profile update
			await createNotification(
				req.user._id,
				'Profile Updated',
				'Your profile has been updated successfully.',
				'profile_update',
				'/profile'
			);

			res.status(200).json({
				success: true,
				user: updatedUser,
			});
		} catch (error) {
			console.error("Error updating user in database:", error);
			return res.status(500).json({
				success: false,
				message: `Error updating user: ${error.message}`,
				error: error.message
			});
		}
	} catch (error) {
		console.error("Error in updateProfile:", error);
		res.status(500).json({
			success: false,
			message: error.message || "Internal server error",
			error: error.message
		});
	}
};

export const getDashboardStats = async (req, res) => {
	try {
		// For now, return sample data
		const stats = {
			matchRequests: 5,
			messages: 12,
			upcomingSessions: 3,
			relationshipScore: 85,
			completedSessions: 8
		};
		
		res.json(stats);
	} catch (error) {
		console.error('Error in getDashboardStats:', error);
		res.status(500).json({
			success: false,
			message: 'Internal server error'
		});
	}
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		location: user.location,
		age: user.age,
		gender: user.gender,
		images: user.images || []
	});
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const { name, email, phone, location, age, gender, images } = req.body;

	// Update user fields
	user.name = name || user.name;
	user.email = email || user.email;
	user.phone = phone || user.phone;
	user.location = location || user.location;
	user.age = age || user.age;
	user.gender = gender || user.gender;
	user.images = images || user.images;

	const updatedUser = await user.save();

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		phone: updatedUser.phone,
		location: updatedUser.location,
		age: updatedUser.age,
		gender: updatedUser.gender,
		images: updatedUser.images
	});
});

export {
	getUserProfile,
	updateUserProfile
};
