const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema],
  lastMessage: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
chatSchema.index({ participants: 1 });
chatSchema.index({ lastMessage: -1 });

// Method to add a new message
chatSchema.methods.addMessage = async function(senderId, content) {
  this.messages.push({
    sender: senderId,
    content,
    timestamp: new Date()
  });
  this.lastMessage = new Date();
  return this.save();
};

// Method to mark messages as read
chatSchema.methods.markAsRead = async function(userId) {
  this.messages.forEach(message => {
    if (message.sender.toString() !== userId.toString() && !message.read) {
      message.read = true;
    }
  });
  return this.save();
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat; 