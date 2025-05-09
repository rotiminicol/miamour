import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'matched', 'rejected', 'blocked'],
        default: 'pending',
    },
    matchDate: {
        type: Date,
        default: Date.now,
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    matchScore: {
        type: Number,
        default: 0,
    },
    preferencesMatch: {
        type: Number,
        default: 0,
    },
    interestsMatch: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Add indexes
matchSchema.index({ user1: 1, user2: 1 }, { unique: true });

matchSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Match', matchSchema);
