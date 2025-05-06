import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controllers/matchController.js";
import { protect } from '../middleware/authMiddleware.js';
import {
  createMatchCard,
  getMatchCard,
  updateMatchCard,
  getPotentialMatches,
  handleMatch
} from '../controllers/matchController.js';

const router = express.Router();

router.post("/swipe-right/:likedUserId", protectRoute, swipeRight);
router.post("/swipe-left/:dislikedUserId", protectRoute, swipeLeft);

router.get("/", protectRoute, getMatches);
router.get("/user-profiles", protectRoute, getUserProfiles);

// Create a new match card
router.post('/', protect, createMatchCard);

// Get user's match card
router.get('/my-card', protect, getMatchCard);

// Update match card
router.put('/my-card', protect, updateMatchCard);

// Get potential matches
router.get('/potential', protect, getPotentialMatches);

// Handle match (accept/reject)
router.post('/handle', protect, handleMatch);

export default router;