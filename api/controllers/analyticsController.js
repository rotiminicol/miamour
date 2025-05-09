import mongoose from 'mongoose';
import User from '../models/User.js';
import Match from '../models/Match.js';
import Event from '../models/event.js';
import Message from '../models/message.js';

const getDateRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    return { start, end };
};

const aggregateData = async (model, dateField, groupFields) => {
    return await model.aggregate([
        {
            $match: {
                [dateField]: {
                    $gte: getDateRange(30).start,
                    $lte: getDateRange(30).end
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: `$${dateField}`
                    }
                },
                ...groupFields
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
};

const calculateTotals = (data, fields) => {
    const totals = {};
    fields.forEach(field => {
        totals[field] = data.reduce((sum, item) => sum + item[field], 0);
    });
    return totals;
};

export const getAnalyticsData = async (req, res) => {
    try {
        const type = req.params.type;

        switch (type) {
            case 'activity':
                const activityData = await aggregateData(User, 'createdAt', {
                    users: { $sum: 1 },
                    matches: { $sum: { $size: "$matches" } }
                });
                const activityTotals = calculateTotals(activityData, ['users', 'matches']);
                res.json({
                    success: true,
                    data: activityData,
                    total: activityTotals
                });
                break;

            case 'users':
                const usersData = await User.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: getDateRange(30).start,
                                $lte: getDateRange(30).end
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalUsers: { $sum: 1 },
                            activeUsers: {
                                $sum: {
                                    $cond: [{ $eq: ["$status", "active"] }, 1, 0]
                                }
                            },
                            averageAge: {
                                $avg: "$age"
                            }
                        }
                    }
                ]);
                res.json({
                    success: true,
                    data: {
                        ...usersData[0],
                        inactiveUsers: usersData[0].totalUsers - usersData[0].activeUsers
                    }
                });
                break;

            case 'matches':
                const matchesData = await aggregateData(Match, 'matchDate', {
                    totalMatches: { $sum: 1 },
                    averageMatchScore: {
                        $avg: "$matchScore"
                    }
                });
                const matchesTotals = calculateTotals(matchesData, ['totalMatches']);
                res.json({
                    success: true,
                    data: matchesData,
                    total: matchesTotals
                });
                break;

            case 'events':
                const eventsData = await aggregateData(Event, 'date', {
                    totalEvents: { $sum: 1 },
                    byType: {
                        $push: {
                            type: "$type",
                            count: 1
                        }
                    }
                });
                const eventsTotals = calculateTotals(eventsData, ['totalEvents']);
                res.json({
                    success: true,
                    data: eventsData,
                    total: eventsTotals
                });
                break;

            case 'messages':
                const messagesData = await Message.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: getDateRange(30).start,
                                $lte: getDateRange(30).end
                            }
                        }
                    },
                    {
                        $project: {
                            contentLength: {
                                $cond: {
                                    if: { $eq: ["$content", undefined] },
                                    then: 0,
                                    else: { $strLenBytes: "$content" }
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt"
                                }
                            },
                            totalMessages: { $sum: 1 },
                            totalLength: { $sum: { $ifNull: ["$contentLength", 0] } }
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ]);

                // Calculate average length after grouping
                const totalMessages = messagesData.reduce((sum, item) => sum + item.totalMessages, 0);
                const totalLength = messagesData.reduce((sum, item) => sum + (item.totalLength || 0), 0);
                const averageLength = totalMessages > 0 ? totalLength / totalMessages : 0;

                res.json({
                    success: true,
                    data: messagesData,
                    total: {
                        totalMessages,
                        averageLength
                    }
                });
                break;

            default:
                res.status(400).json({
                    success: false,
                    error: 'Invalid analytics type'
                });
        }
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch analytics data'
        });
    }
};

export default getAnalyticsData;