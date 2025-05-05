import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Heart, MessageCircle, Calendar, User, 
  HelpCircle, Users, Sparkles, TrendingUp, 
  Activity, Award,
  CreditCard, FileText, Settings, Shield,
  BookOpen, Star, Info, Phone, Gift, Bell
} from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

// Dashboard Stats Card Component
const StatCard = ({ icon, title, value, change, isPositive = true, to }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (to) {
      navigate(to);
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-6 shadow-lg cursor-pointer border border-pink-100/50"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.15)" }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-pink-400 text-white">
          {icon}
        </div>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} font-medium`}>
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1 transform rotate-180" />}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mt-4">{title}</h3>
      <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mt-1">{value}</p>
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

// Navigation Card Component
const NavigationCard = ({ title, icon, description, to, color }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.15)" }}
      className={`bg-gradient-to-br from-white to-pink-50 rounded-xl p-6 shadow-lg cursor-pointer border border-pink-100/50 ${color}`}
      onClick={() => navigate(to)}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-pink-400 text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

NavigationCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

// Enhanced Homepage Component
const EnhancedHomepage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const mainControls = useAnimation();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      if (scrollY.current > 50) {
        mainControls.start("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mainControls]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-pink-50/30">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-8 py-10">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">Welcome back, {authUser?.name || 'User'}!</h1>
            <p className="text-gray-600 text-lg mt-2">Here is what is happening with your relationship journey today.</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            <motion.div variants={itemVariants}>
              <StatCard 
                icon={<Heart size={20} className="text-white" />}
                title="Match Requests"
                value="8"
                change="+4 this week"
                isPositive={true}
                to="/match-requests"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard 
                icon={<MessageCircle size={20} className="text-white" />}
                title="Messages"
                value="24"
                change="12 unread"
                isPositive={true}
                to="/messages"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard 
                icon={<Calendar size={20} className="text-white" />}
                title="Upcoming Sessions"
                value="3"
                change="Next: Today 3PM"
                isPositive={true}
                to="/upcoming-sessions"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard 
                icon={<Activity size={20} className="text-white" />}
                title="Relationship Score"
                value="85%"
                change="+12% vs last month"
                isPositive={true}
                to="/relationship-score"
              />
            </motion.div>
          </motion.div>

          {/* Section Headers */}
          <motion.h2 
            className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>

          {/* Main Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Marriage Counseling"
                icon={<Heart size={24} className="text-white" />}
                description="Professional counseling for couples"
                to="/marriage-counseling"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Dating App"
                icon={<Users size={24} className="text-white" />}
                description="Find your perfect match"
                to="/dating-app"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Relationship Therapy"
                icon={<MessageCircle size={24} className="text-white" />}
                description="Expert relationship guidance"
                to="/relationship-therapy"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
            </div>
          </motion.div>

          {/* Planning Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Planning Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Ceremony Planning"
                icon={<Sparkles size={24} className="text-white" />}
                description="Plan your perfect ceremony"
                to="/ceremony-planning"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Marriage Planning"
                icon={<Calendar size={24} className="text-white" />}
                description="Comprehensive marriage planning"
                to="/marriage-planning"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Personalized Matchmaking"
                icon={<Star size={24} className="text-white" />}
                description="Find your soulmate"
                to="/personalized-matchmaking"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
            </div>
          </motion.div>

          {/* Support & Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Support & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Help Center"
                icon={<HelpCircle size={24} className="text-white" />}
                description="Get help and support"
                to="/help-center"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="FAQs"
                icon={<Info size={24} className="text-white" />}
                description="Frequently asked questions"
                to="/faqs"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Contact Us"
                icon={<Phone size={24} className="text-white" />}
                description="Get in touch with us"
                to="/contact-us"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Resources"
                icon={<BookOpen size={24} className="text-white" />}
                description="Helpful resources"
                to="/resources"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
            </div>
          </motion.div>

          {/* User Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Profile"
                icon={<User size={24} className="text-white" />}
                description="Manage your profile"
                to="/profile"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Preferences"
                icon={<Settings size={24} className="text-white" />}
                description="Update your preferences"
                to="/preference"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Privacy"
                icon={<Shield size={24} className="text-white" />}
                description="Privacy settings"
                to="/privacy"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Notifications"
                icon={<Bell size={24} className="text-white" />}
                description="Manage notifications"
                to="/notifications"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
            </div>
          </motion.div>

          {/* Billing & Subscriptions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing & Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Subscriptions"
                icon={<CreditCard size={24} className="text-white" />}
                description="Manage subscriptions"
                to="/subscriptions"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Invoices"
                icon={<FileText size={24} className="text-white" />}
                description="View your invoices"
                to="/invoices"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Discounts"
                icon={<Gift size={24} className="text-white" />}
                description="Available discounts"
                to="/discounts"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Payment Methods"
                icon={<CreditCard size={24} className="text-white" />}
                description="Manage payment methods"
                to="/billing-process"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
            </div>
          </motion.div>

          {/* Content Pages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Blog"
                icon={<BookOpen size={24} className="text-white" />}
                description="Latest articles and news"
                to="/blog"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Success Stories"
                icon={<Star size={24} className="text-white" />}
                description="Read success stories"
                to="/success-stories"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Dating Tips"
                icon={<Heart size={24} className="text-white" />}
                description="Expert dating advice"
                to="/dating-tips"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
              <NavigationCard
                title="Safety Guide"
                icon={<Shield size={24} className="text-white" />}
                description="Online safety tips"
                to="/safety-guide"
                color="hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-50"
              />
            </div>
          </motion.div>

          {/* Achievement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-6">Achievements</h2>
            <NavigationCard
              title="Relationship Milestone Achieved!"
              icon={<Award size={24} className="text-white" />}
              description="Completed 10 counseling sessions together. View all your achievements!"
              to={authUser ? "/achievements" : "/login"}
              color="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 text-white hover:from-pink-600 hover:via-pink-700 hover:to-pink-600"
            />
          </motion.div>
        </main>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl border border-pink-200"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-pink-600 mb-4">
                  Ready to Find Your Match?
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Our advanced algorithm is working to find your perfect partner. Track your match progress in real-time!
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors"
                    onClick={() => {
                      handleClosePopup();
                      navigate('/match-track');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Track My Match
                  </motion.button>
                  <motion.button
                    className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors"
                    onClick={handleClosePopup}
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
      </AnimatePresence>
    </div>
  );
};

export default EnhancedHomepage;