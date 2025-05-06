import express from 'express';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get all notifications for the current user
router.get('/', getUserNotifications);

// Mark a notification as read
router.put('/:notificationId/read', markNotificationAsRead);

// Mark all notifications as read
router.put('/read-all', markAllNotificationsAsRead);

// Delete a notification
router.delete('/:notificationId', deleteNotification);

export default router; 