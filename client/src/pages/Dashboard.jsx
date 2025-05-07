
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useScroll, useTransform, motion } from 'framer-motion';
import {
  Heart, MessageCircle, Calendar, User,
  HelpCircle, Sparkles, TrendingUp,
  Activity, Award, Settings, Shield,
  BookOpen, Star, Info, Phone, Bell, ChevronRight
} from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

// Glassmorphism/gradient tokens
const glassBg = "bg-white/80 backdrop-blur-md border border-pink-100 shadow-xl";
const gradientBg = "bg-gradient-to-br from-pink-50 via-white to-purple-50";

// StatCard component
const StatCard = ({ icon, title, value, change, isPositive = true, to }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 32px 0 rgba(255,0,128,0.10)" }}
      className={`${glassBg} rounded-2xl p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
      onClick={() => navigate(to)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-200 text-white shadow">
          {icon}
        </div>
        <div className={`text-xs ${isPositive ? 'text-pink-500' : 'text-blue-500'} font-semibold flex items-center`}>
          <TrendingUp size={14} className={`mr-1 ${!isPositive && 'rotate-180'}`} />
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-500 text-xs font-medium uppercase">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </motion.div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  isPositive: PropTypes.bool,
  to: PropTypes.string.isRequired
};

// NavigationCard component
const NavigationCard = ({ title, icon, description, to }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(255,0,128,0.10)" }}
      className={`${glassBg} rounded-xl p-5 transition-all duration-300 cursor-pointer group flex items-center relative overflow-hidden`}
      onClick={() => navigate(to)}
    >
      <div className="p-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-200 text-white shadow mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-pink-400 group-hover:text-purple-500 transition" />
    </motion.div>
  );
};

NavigationCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for geometric SVG background
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className={`relative flex flex-col lg:flex-row min-h-screen ${gradientBg} overflow-hidden`}>
      {/* Parallax geometric background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.svg
          width="100%" height="100%" viewBox="0 0 1440 600"
          className="absolute top-0 left-0"
          style={{ y: y1 }}
        >
          <circle cx="1200" cy="100" r="180" fill="#f0f4ff" opacity="0.7" />
          <rect x="100" y="400" width="300" height="120" rx="60" fill="#ffe4f0" opacity="0.5" />
        </motion.svg>
        <motion.svg
          width="100%" height="100%" viewBox="0 0 1440 600"
          className="absolute top-0 left-0"
          style={{ y: y2 }}
        >
          <ellipse cx="400" cy="120" rx="120" ry="60" fill="#f7faff" opacity="0.7" />
          <rect x="900" y="350" width="220" height="80" rx="40" fill="#ffd6ec" opacity="0.4" />
        </motion.svg>
      </motion.div>

      <Sidebar />

      <div className="relative flex-grow flex flex-col z-10" ref={containerRef}>
        <Header />

        <main className="relative flex-grow overflow-y-auto px-6 py-8 lg:px-12 lg:py-14">
          {/* Welcome Section - no profile image */}
          <div className={`${glassBg} rounded-3xl p-8 shadow-2xl border border-pink-100 flex items-center gap-6 mb-12`}>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                <span className="mr-2">Welcome back,</span>
                <span className="text-pink-500 drop-shadow">{authUser?.name || 'User'}</span>
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Here’s your relationship dashboard overview.
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-14">
            <StatCard
              icon={<Heart size={22} />}
              title="Match Requests"
              value="8"
              change="+4 this week"
              isPositive={true}
              to="/match-requests"
            />
            <StatCard
              icon={<MessageCircle size={22} />}
              title="Messages"
              value="24"
              change="12 unread"
              isPositive={true}
              to="/messages"
            />
            <StatCard
              icon={<Calendar size={22} />}
              title="Upcoming Sessions"
              value="3"
              change="Next: Today 3PM"
              isPositive={true}
              to="/upcoming-sessions"
            />
            <StatCard
              icon={<Activity size={22} />}
              title="Relationship Score"
              value="85%"
              change="+12% vs last month"
              isPositive={true}
              to="/relationship-score"
            />
          </div>

          {/* Main Services Section */}
          <div className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Heart size={20} className="text-pink-500" />
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <NavigationCard
                title="Marriage Counseling"
                icon={<Heart size={20} />}
                description="Professional guidance for couples"
                to="/marriage-counseling"
              />
              <NavigationCard
                title="Relationship Therapy"
                icon={<MessageCircle size={20} />}
                description="Expert support for relationships"
                to="/relationship-therapy"
              />
            </div>
          </div>

          {/* Planning Services Section */}
          <div className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-pink-500" />
              Planning Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <NavigationCard
                title="Ceremony Planning"
                icon={<Sparkles size={20} />}
                description="Craft your dream ceremony"
                to="/ceremony-planning"
              />
              <NavigationCard
                title="Marriage Planning"
                icon={<Calendar size={20} />}
                description="Plan your perfect marriage"
                to="/marriage-planning"
              />
              <NavigationCard
                title="Personalized Matchmaking"
                icon={<Star size={20} />}
                description="Find your ideal partner"
                to="/personalized-matchmaking"
              />
            </div>
          </div>

          {/* Support & Resources Section */}
          <div className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle size={20} className="text-pink-500" />
              Support & Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              <NavigationCard
                title="Help Center"
                icon={<HelpCircle size={20} />}
                description="Access support resources"
                to="/help-center"
              />
              <NavigationCard
                title="FAQs"
                icon={<Info size={20} />}
                description="Answers to common questions"
                to="/faqs"
              />
              <NavigationCard
                title="Contact Us"
                icon={<Phone size={20} />}
                description="Reach out to our team"
                to="/contact-us"
              />
              <NavigationCard
                title="Resources"
                icon={<BookOpen size={20} />}
                description="Explore helpful guides"
                to="/resources"
              />
            </div>
          </div>

          {/* User Management Section */}
          <div className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-pink-500" />
              Account Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              <NavigationCard
                title="Profile"
                icon={<User size={20} />}
                description="Manage your profile details"
                to="/profile"
              />
              <NavigationCard
                title="Preferences"
                icon={<Settings size={20} />}
                description="Customize your experience"
                to="/preference"
              />
              <NavigationCard
                title="Privacy"
                icon={<Shield size={20} />}
                description="Control your privacy settings"
                to="/privacy"
              />
              <NavigationCard
                title="Notifications"
                icon={<Bell size={20} />}
                description="Manage your alerts"
                to="/notifications"
              />
            </div>
          </div>

          {/* Achievement Section */}
          <div className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Award size={20} className="text-pink-500" />
              Recent Achievement
            </h2>
            <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 rounded-3xl p-7 text-white shadow-xl flex items-center gap-6">
              <div className="p-4 rounded-full bg-white/30">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Relationship Milestone Achieved!</h3>
                <p className="text-white/90 mt-1">Completed 10 counseling sessions together. View all your achievements!</p>
              </div>
              <button
                onClick={() => navigate(authUser ? "/achievements" : "/login")}
                className="ml-auto px-6 py-2 bg-white text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-colors shadow"
              >
                View All
              </button>
            </div>
          </div>

          {/* Featured Success Story */}
          <div className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Heart size={20} className="text-pink-500" />
              Success Story
            </h2>
            <div className={`${glassBg} rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-pink-100`}>
              <div className="md:w-1/3 bg-gradient-to-br from-pink-100 to-purple-100 p-8 flex items-center justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
                  <img
                    src="assets/test.png"
                    alt="Couple"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-900">Sarah & Michael</h3>
                <p className="text-gray-400 mb-3">Matched 18 months ago • Married 3 months ago</p>
                <p className="text-gray-600 mb-4">We met through the matchmaking service and instantly connected. The relationship counseling helped us build a strong foundation. Were so grateful to have found each other!</p>
                <button
                  onClick={() => navigate("/success-stories")}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors shadow"
                >
                  Read More Stories
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className={`${glassBg} rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl text-center`}>
            <h2 className="text-3xl font-extrabold text-pink-500 mb-4">
              Ready to Find Your Match?
            </h2>
            <p className="text-gray-600 mb-6">
              Our AI-powered algorithm is finding your perfect partner. Track your match progress now!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-pink-500 text-white font-bold py-2 px-8 rounded-full hover:bg-pink-600 transition-colors shadow"
                onClick={() => {
                  setShowPopup(false);
                  navigate('/match-track');
                }}
              >
                Track My Match
              </button>
              <button
                className="bg-gray-100 text-gray-700 font-bold py-2 px-8 rounded-full hover:bg-gray-200 transition-colors shadow"
                onClick={() => setShowPopup(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
