import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile, getDashboardStats, getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

// All routes are protected
router.use(protectRoute);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

router.put("/update", updateProfile);
router.get("/dashboard/stats", getDashboardStats);

export default router;