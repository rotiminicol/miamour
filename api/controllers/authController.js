import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

export const signup = async (req, res) => {
	const { name, email, password, phoneNumber, country, age, gender, genderPreference } = req.body;
	console.log('Signup attempt with data:', { name, email, phoneNumber, country, age, gender, genderPreference });
	try {
		// Check for required fields
		const requiredFields = { name, email, password, phoneNumber, country, age, gender, genderPreference };
		const missingFields = Object.entries(requiredFields)
			.filter(([_, value]) => !value)
			.map(([key]) => key);

		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: `Missing required fields: ${missingFields.join(', ')}`,
				missingFields
			});
		}

		if (age < 18) {
			return res.status(400).json({
				success: false,
				message: "You must at lest 18 years old",
			});
		}

		if (password.length < 8) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 8 characters",
			});
		}

		// Check if email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: 'Email already in use',
				field: 'email'
			});
		}

		const newUser = await User.create({
			name,
			email,
			password,
			phoneNumber,
			country,
			age,
			gender,
			genderPreference,
		});

		const token = signToken(newUser._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(201).json({
			success: true,
			user: newUser,
		});
	} catch (error) {
		console.log("Error in signup controller:", error);
		
		// Handle duplicate key error (MongoDB)
		if (error.code === 11000) {
			const field = Object.keys(error.keyValue)[0];
			return res.status(400).json({
				success: false,
				message: `${field} already in use`,
				field
			});
		}

		// Handle validation errors
		if (error.name === 'ValidationError') {
			const errors = {};
			Object.keys(error.errors).forEach(key => {
				errors[key] = error.errors[key].message;
			});
			return res.status(400).json({
				success: false,
				message: 'Validation failed',
				errors
			});
		}

		res.status(500).json({ 
			success: false, 
			message: 'An unexpected error occurred. Please try again.' 
		});
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = signToken(user._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.log("Error in login controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
