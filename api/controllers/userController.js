import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
	try {
		const { image, ...otherData } = req.body;

		let updatedData = otherData;

		if (image) {
			// Validate Base64 image
			const base64Regex = /^data:image\/(png|jpeg|jpg);base64,/;
			if (base64Regex.test(image)) {
				try {
					const uploadResponse = await cloudinary.uploader.upload(image);
					updatedData.image = uploadResponse.secure_url;
				} catch (error) {
					console.error("Error uploading image:", error);
					return res.status(400).json({
						success: false,
						message: "Error uploading image",
					});
				}
			} else {
				return res.status(400).json({
					success: false,
					message: "Invalid image format",
				});
			}
		}

		const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });

		res.status(200).json({
			success: true,
			user: updatedUser,
		});
	} catch (error) {
		console.log("Error in updateProfile: ", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
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