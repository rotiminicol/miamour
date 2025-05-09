import User from '../models/User.js';
import Match from '../models/Match.js';
import Event from '../models/Event.js';
import Message from '../models/message.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('matches', 'status matchDate matchScore')
            .populate('events', 'title type status')
            .populate('messages', 'content createdAt');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user details'
        });
    }
};

export const getAnalytics = async (req, res) => {
    try {
        // Get total users
        const totalUsers = await User.countDocuments();
        
        // Get active users (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = await User.countDocuments({
            lastActive: { $gte: thirtyDaysAgo }
        });

        // Get total matches
        const totalMatches = await Match.countDocuments();
        
        // Get total events
        const totalEvents = await Event.countDocuments();
        
        // Get message statistics
        const messageStats = await Message.aggregate([
            {
                $group: {
                    _id: null,
                    totalMessages: { $sum: 1 },
                    averageMessageLength: {
                        $avg: {
                            $strLenUTF8: "$content"
                        }
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                userStats: {
                    totalUsers,
                    activeUsers
                },
                matchStats: {
                    totalMatches
                },
                eventStats: {
                    totalEvents
                },
                messageStats: messageStats[0] || {
                    totalMessages: 0,
                    averageMessageLength: 0
                }
            }
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics'
        });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('therapist', 'name')
            .populate('participants', 'name')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching events'
        });
    }
};

export const getMatches = async (req, res) => {
    try {
        const matches = await Match.find()
            .populate('user1', 'name')
            .populate('user2', 'name')
            .sort({ matchDate: -1 });

        res.status(200).json({
            success: true,
            data: matches
        });
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching matches'
        });
    }
};
