const express = require('express');
const router = express.Router();
const {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  sendMessage,
  deleteChat
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Get or create chat with a user
router.get('/:userId', getOrCreateChat);

// Get all chats for current user
router.get('/', getUserChats);

// Get messages for a specific chat
router.get('/:chatId/messages', getChatMessages);

// Send a message in a chat
router.post('/:chatId/messages', sendMessage);

// Delete a chat
router.delete('/:chatId', deleteChat);

module.exports = router; 