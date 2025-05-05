import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Heart, MessageCircle, Calendar, User, 
  HelpCircle, Users, Sparkles, TrendingUp, 
  Activity, Award, Settings, Shield, 
  BookOpen, Star, Info, Phone, Bell, ChevronRight
} from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

// Enhanced StatCard Component with 3D effect
const StatCard = ({ icon, title, value, change, isPositive = true, to }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * 10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="bg-gradient-to-br from-white to-rose-50/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100/50 cursor-pointer backdrop-blur-sm"
      onClick={() => navigate(to)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div 
          className="p-3 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <motion.div 
          className={`flex items-center text-sm ${isPositive ? 'text-emerald-500' : 'text-rose-500'} font-medium bg-${isPositive ? 'emerald' : 'rose'}-50 px-2 py-1 rounded-full`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1 transform rotate-180" />}
          <span>{change}</span>
        </motion.div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <motion.p 
        className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mt-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {value}
      </motion.p>
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

// Enhanced NavigationCard Component with hover effects
const NavigationCard = ({ title, icon, description, to }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      className="bg-gradient-to-br from-white to-rose-50/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100/50 cursor-pointer backdrop-blur-sm"
      onClick={() => navigate(to)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(244, 114, 182, 0.1), 0 10px 10px -5px rgba(244, 114, 182, 0.04)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          className="p-3 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <div className="flex-grow">
          <motion.h3 
            className="text-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ChevronRight className="w-5 h-5 text-rose-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};

NavigationCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

// Enhanced Homepage Component with parallax scrolling
const EnhancedHomepage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Sidebar />
      <div className="flex-grow flex flex-col" ref={containerRef}>
        <Header />
        <main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
          {/* Welcome Section with Parallax */}
          <motion.div 
            className="mb-10 relative"
            style={{ y, opacity, scale }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-3xl blur-3xl" />
            <div className="relative">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome back, <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">{authUser?.name || 'User'}</span>
              </h1>
              <p className="text-gray-600 text-lg mt-2">Here is what happening with your relationship journey today.</p>
            </div>
          </motion.div>

          {/* Stats Overview with staggered animation */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <StatCard 
              icon={<Heart size={20} />}
              title="Match Requests"
              value="8"
              change="+4 this week"
              isPositive={true}
              to="/match-requests"
            />
            <StatCard 
              icon={<MessageCircle size={20} />}
              title="Messages"
              value="24"
              change="12 unread"
              isPositive={true}
              to="/messages"
            />
            <StatCard 
              icon={<Calendar size={20} />}
              title="Upcoming Sessions"
              value="3"
              change="Next: Today 3PM"
              isPositive={true}
              to="/upcoming-sessions"
            />
            <StatCard 
              icon={<Activity size={20} />}
              title="Relationship Score"
              value="85%"
              change="+12% vs last month"
              isPositive={true}
              to="/relationship-score"
            />
          </motion.div>

          {/* Main Services Section with floating animation */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Marriage Counseling"
                icon={<Heart size={24} />}
                description="Professional counseling for couples"
                to="/marriage-counseling"
              />
              <NavigationCard
                title="Dating App"
                icon={<Users size={24} />}
                description="Find your perfect match"
                to="/dating-app"
              />
              <NavigationCard
                title="Relationship Therapy"
                icon={<MessageCircle size={24} />}
                description="Expert relationship guidance"
                to="/relationship-therapy"
              />
            </div>
          </motion.div>

          {/* Planning Services Section with floating animation */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">Planning Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Ceremony Planning"
                icon={<Sparkles size={24} />}
                description="Plan your perfect ceremony"
                to="/ceremony-planning"
              />
              <NavigationCard
                title="Marriage Planning"
                icon={<Calendar size={24} />}
                description="Comprehensive marriage planning"
                to="/marriage-planning"
              />
              <NavigationCard
                title="Personalized Matchmaking"
                icon={<Star size={24} />}
                description="Find your soulmate"
                to="/personalized-matchmaking"
              />
            </div>
          </motion.div>

          {/* Support & Resources Section with floating animation */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">Support & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Help Center"
                icon={<HelpCircle size={24} />}
                description="Get help and support"
                to="/help-center"
              />
              <NavigationCard
                title="FAQs"
                icon={<Info size={24} />}
                description="Frequently asked questions"
                to="/faqs"
              />
              <NavigationCard
                title="Contact Us"
                icon={<Phone size={24} />}
                description="Get in touch with us"
                to="/contact-us"
              />
              <NavigationCard
                title="Resources"
                icon={<BookOpen size={24} />}
                description="Helpful resources"
                to="/resources"
              />
            </div>
          </motion.div>

          {/* User Management Section with floating animation */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">Account Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Profile"
                icon={<User size={24} />}
                description="Manage your profile"
                to="/profile"
              />
              <NavigationCard
                title="Preferences"
                icon={<Settings size={24} />}
                description="Update your preferences"
                to="/preference"
              />
              <NavigationCard
                title="Privacy"
                icon={<Shield size={24} />}
                description="Privacy settings"
                to="/privacy"
              />
              <NavigationCard
                title="Notifications"
                icon={<Bell size={24} />}
                description="Manage notifications"
                to="/notifications"
              />
            </div>
          </motion.div>

          {/* Achievement Section with 3D effect */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">Recent Achievement</h2>
            <motion.div 
              className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg"
              whileHover={{ 
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="p-3 rounded-xl bg-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Award size={24} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold">Relationship Milestone Achieved!</h3>
                  <p className="text-white/80 mt-1">Completed 10 counseling sessions together. View all your achievements!</p>
                </div>
                <motion.button 
                  onClick={() => navigate(authUser ? "/achievements" : "/login")}
                  className="ml-auto px-4 py-2 bg-white text-rose-600 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Popup with 3D effect */}
      {showPopup && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="text-center">
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Ready to Find Your Match?
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Our advanced algorithm is working to find your perfect partner. Track your match progress in real-time!
              </motion.p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium py-2 px-6 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300"
                  onClick={() => {
                    setShowPopup(false);
                    navigate('/match-track');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Track My Match
                </motion.button>
                <motion.button
                  className="bg-white text-rose-600 font-medium py-2 px-6 rounded-lg border border-rose-200 hover:bg-rose-50 transition-all duration-300"
                  onClick={() => setShowPopup(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Maybe Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedHomepage;