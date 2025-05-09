import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, User, MessageCircle, Heart } from 'lucide-react';

const AnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState({
    userActivity: [],
    matches: [],
    messages: [],
    events: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        // Fetch all analytics data in parallel
        const [activityRes, matchesRes, messagesRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/analytics/activity`),
          fetch(`${API_BASE_URL}/api/analytics/matches`),
          fetch(`${API_BASE_URL}/api/analytics/messages`),
          fetch(`${API_BASE_URL}/api/analytics/events`)
        ]);

        // Check for errors
        if (!activityRes.ok || !matchesRes.ok || !messagesRes.ok || !eventsRes.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        // Parse responses
        const [activityData, matchesData, messagesData, eventsData] = await Promise.all([
          activityRes.json(),
          matchesRes.json(),
          messagesRes.json(),
          eventsRes.json()
        ]);

        setAnalyticsData({
          userActivity: activityData,
          matches: matchesData,
          messages: messagesData,
          events: eventsData
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading analytics data</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* User Activity Chart */}
      <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-xl p-6">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-pink-500" />
          User Activity Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.userActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#ff69b4" name="Active Users" />
            <Bar dataKey="matches" fill="#8b008b" name="Matches Made" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Matches and Messages Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-pink-500" />
            Matches Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.matches}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff69b4" name="Matches" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-pink-500" />
            Messages Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.messages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff69b4" name="Messages" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events Stats */}
      <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-xl p-6">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-pink-500" />
          Events Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.events}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ff69b4" name="Events" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsSection;
