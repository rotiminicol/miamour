const Chat = require('../models/Chat');
const User = require('../models/User');
const { createNotification } = require('../utils/notificationUtils');
const asyncHandler = require('express-async-handler');

// @desc    Get or create a chat between two users
// @route   GET /api/chat/:userId
// @access  Private
const getOrCreateChat = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  // Check if chat already exists
  let chat = await Chat.findOne({
    participants: { $all: [currentUserId, userId] },
    active: true
  }).populate('participants', 'name pictures');

  if (!chat) {
    // Create new chat
    chat = await Chat.create({
      participants: [currentUserId, userId],
      messages: []
    });
    chat = await chat.populate('participants', 'name pictures');
  }

  res.json(chat);
});

// @desc    Get all chats for current user
// @route   GET /api/chat
// @access  Private
const getUserChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    participants: req.user._id,
    active: true
  })
    .populate('participants', 'name pictures')
    .sort({ lastMessage: -1 });

  res.json(chats);
});

// @desc    Get messages for a specific chat
// @route   GET /api/chat/:chatId/messages
// @access  Private
const getChatMessages = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.chatId)
    .populate('participants', 'name pictures');

  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }

  // Check if user is a participant
  if (!chat.participants.some(p => p._id.toString() === req.user._id.toString())) {
    res.status(403);
    throw new Error('Not authorized to access this chat');
  }

  // Mark messages as read
  await chat.markAsRead(req.user._id);

  res.json(chat.messages);
});

// @desc    Send a message in a chat
// @route   POST /api/chat/:chatId/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const chat = await Chat.findById(req.params.chatId);

  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }

  // Check if user is a participant
  if (!chat.participants.some(p => p.toString() === req.user._id.toString())) {
    res.status(403);
    throw new Error('Not authorized to send messages in this chat');
  }

  // Add message
  await chat.addMessage(req.user._id, content);

  // Get the other participant
  const otherParticipant = chat.participants.find(
    p => p.toString() !== req.user._id.toString()
  );

  // Create notification for the other participant
  await createNotification(
    otherParticipant,
    'New Message',
    `You have a new message from ${req.user.name}`,
    'message'
  );

  // Get updated chat with populated participants
  const updatedChat = await Chat.findById(chat._id)
    .populate('participants', 'name pictures');

  res.json(updatedChat.messages[updatedChat.messages.length - 1]);
});

// @desc    Mark chat as inactive
// @route   DELETE /api/chat/:chatId
// @access  Private
const deleteChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);

  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }

  // Check if user is a participant
  if (!chat.participants.some(p => p.toString() === req.user._id.toString())) {
    res.status(403);
    throw new Error('Not authorized to delete this chat');
  }

  chat.active = false;
  await chat.save();

  res.json({ message: 'Chat deleted successfully' });
});

module.exports = {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  sendMessage,
  deleteChat
}; 