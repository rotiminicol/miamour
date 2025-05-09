import express from 'express';
import { protectRoute, adminRoute } from '../middleware/auth.js';
import {
    getUsers,
    getUserDetails,
    getAnalytics,
    getEvents,
    getMatches
} from '../controllers/adminController.js';

const router = express.Router();

// Admin authentication required for all routes
router.use(adminRoute);

// User management routes
router.get('/users', getUsers);
router.get('/users/:userId', getUserDetails);

// Analytics routes
router.get('/analytics', getAnalytics);

// Events management routes
router.get('/events', getEvents);

// Matches management routes
router.get('/matches', getMatches);

export default router;
