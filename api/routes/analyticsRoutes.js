import express from 'express';
const router = express.Router();
import { getAnalyticsData } from '../controllers/analyticsController.js';

// Analytics routes
router.get('/:type', getAnalyticsData);

export default router;
