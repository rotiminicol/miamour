import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile } from "../controllers/userController.js";
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controllers/matchController.js";

const router = express.Router();

// User routes
router.put("/user/update", protectRoute, updateProfile);

// Match routes
router.post("/match/swipe-right/:likedUserId", protectRoute, swipeRight);
router.post("/match/swipe-left/:dislikedUserId", protectRoute, swipeLeft);
router.get("/match", protectRoute, getMatches);
router.get("/match/user-profiles", protectRoute, getUserProfiles);

export default router;