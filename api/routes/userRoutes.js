import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile, getDashboardStats } from "../controllers/userController.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile);
router.get("/profile", protectRoute, (req, res) => {
  res.json({ username: "Alex", email: "alex@example.com" });
});
router.get("/dashboard/stats", protectRoute, getDashboardStats);

export default router;