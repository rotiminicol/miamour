import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.js";
import { updateProfile, getDashboardStats, getUserProfile, updateUserProfile, getAdminUsers } from "../controllers/userController.js";

const router = express.Router();

// All routes are protected
// Admin routes
router.use('/admin', adminRoute);
router.get('/admin/users', getAdminUsers);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

router.put("/update", protectRoute, updateProfile);
router.get("/dashboard/stats", getDashboardStats);

export default router;