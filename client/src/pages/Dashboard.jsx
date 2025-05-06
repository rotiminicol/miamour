import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Calendar, User, 
  HelpCircle, Users, Sparkles, TrendingUp, 
  Activity, Award, Settings, Shield, 
  BookOpen, Star, Info, Phone, Bell, ChevronRight
} from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

// Glassmorphism StatCard with enhanced 3D effects
const StatCard = ({ icon, title, value, change, isPositive = true, to }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glow, setGlow] = useState(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * 12;
    const rotateYValue = ((x - centerX) / centerX) * 12;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
    setGlow(0.5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlow(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden"
      onClick={() => navigate(to)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: `0 0 ${glow * 40}px rgba(244, 114, 182, ${glow})`
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-pink-100/20 opacity-50" />
      <div className="relative flex items-start justify-between mb-4">
        <motion.div 
          className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {icon}
        </motion.div>
        <motion.div 
          className={`flex items-center text-sm ${isPositive ? 'text-emerald-400' : 'text-rose-400'} font-medium bg-${isPositive ? 'emerald' : 'rose'}-50/30 px-3 py-1 rounded-full backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1 transform rotate-180" />}
          <span>{change}</span>
        </motion.div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium tracking-wide">{title}</h3>
      <motion.p 
        className="text-3xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mt-2"
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

// Enhanced NavigationCard with dynamic glow
const NavigationCard = ({ title, icon, description, to }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden"
      onClick={() => navigate(to)}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 30px -5px rgba(244, 114, 182, 0.2), 0 10px 15px -5px rgba(244, 114, 182, 0.1)"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-pink-100/20 opacity-50" />
      <div className="relative flex items-center space-x-4">
        <motion.div 
          className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {icon}
        </motion.div>
        <div className="flex-grow">
          <motion.h3 
            className="text-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {title}
          </motion.h3>
          <p className="text-sm text-gray-500 tracking-wide">{description}</p>
        </div>
        <motion.div
          whileHover={{ x: 8, rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <ChevronRight className="w-5 h-5 text-rose-500" />
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

// Enhanced Homepage with advanced animations and dynamic background
const EnhancedHomepage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleHero = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.9]), {
    stiffness: 120,
    damping: 30
  });

  // Dynamic background particles
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-rose-300/20 blur-sm';
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      document.querySelector('.background-layer')?.appendChild(particle);

      const animate = () => {
        particle.style.transition = `all ${Math.random() * 5 + 3}s ease-in-out`;
        particle.style.transform = `translateY(-${Math.random() * 200 + 100}px) scale(${Math.random() * 0.5 + 0.5})`;
        particle.style.opacity = '0';
      };

      animate();
      setTimeout(() => particle.remove(), 8000);
    };

    const interval = setInterval(createParticle, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50 overflow-hidden">
      <motion.div 
        className="background-layer absolute inset-0 pointer-events-none"
        style={{ y: yBackground }}
      />
      <Sidebar />
      <div className="relative flex-grow flex flex-col" ref={containerRef}>
        <Header />
        <main className="relative flex-grow overflow-y-auto px-6 py-8 lg:px-10 lg:py-12">
          {/* Welcome Section with Enhanced Parallax */}
          <motion.div 
            className="mb-12 relative"
            style={{ y: yContent, opacity: opacityHero, scale: scaleHero }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200/30 to-pink-200/30 rounded-3xl blur-3xl transform scale-105" />
            <div className="relative">
              <motion.h1 
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Welcome back, 
                <span className="ml-2 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {authUser?.name || 'User'}
                </span>
              </motion.h1>
              <motion.p 
                className="text-gray-500 text-lg mt-3 tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Discover what is new in your relationship journey today.
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Overview with Staggered Animation */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15 }}
          >
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
          </motion.div>

          {/* Main Services Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Marriage Counseling"
                icon={<Heart size={26} />}
                description="Professional guidance for couples"
                to="/marriage-counseling"
              />
              <NavigationCard
                title="Dating App"
                icon={<Users size={26} />}
                description="Connect with your perfect match"
                to="/dating-app"
              />
              <NavigationCard
                title="Relationship Therapy"
                icon={<MessageCircle size={26} />}
                description="Expert support for relationships"
                to="/relationship-therapy"
              />
            </div>
          </motion.div>

          {/* Planning Services Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight">Planning Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Ceremony Planning"
                icon={<Sparkles size={26} />}
                description="Craft your dream ceremony"
                to="/ceremony-planning"
              />
              <NavigationCard
                title="Marriage Planning"
                icon={<Calendar size={26} />}
                description="Plan your perfect marriage"
                to="/marriage-planning"
              />
              <NavigationCard
                title="Personalized Matchmaking"
                icon={<Star size={26} />}
                description="Find your ideal partner"
                to="/personalized-matchmaking"
              />
            </div>
          </motion.div>

          {/* Support & Resources Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight">Support & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Help Center"
                icon={<HelpCircle size={26} />}
                description="Access support resources"
                to="/help-center"
              />
              <NavigationCard
                title="FAQs"
                icon={<Info size={26} />}
                description="Answers to common questions"
                to="/faqs"
              />
              <NavigationCard
                title="Contact Us"
                icon={<Phone size={26} />}
                description="Reach out to our team"
                to="/contact-us"
              />
              <NavigationCard
                title="Resources"
                icon={<BookOpen size={26} />}
                description="Explore helpful guides"
                to="/resources"
              />
            </div>
          </motion.div>

          {/* User Management Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight">Account Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <NavigationCard
                title="Profile"
                icon={<User size={26} />}
                description="Manage your profile details"
                to="/profile"
              />
              <NavigationCard
                title="Preferences"
                icon={<Settings size={26} />}
                description="Customize your experience"
                to="/preference"
              />
              <NavigationCard
                title="Privacy"
                icon={<Shield size={26} />}
                description="Control your privacy settings"
                to="/privacy"
              />
              <NavigationCard
                title="Notifications"
                icon={<Bell size={26} />}
                description="Manage your alerts"
                to="/notifications"
              />
            </div>
          </motion.div>

          {/* Achievement Section with Enhanced 3D Effect */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight">Recent Achievement</h2>
            <motion.div 
              className="relative bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl overflow-hidden"
              whileHover={{ 
                scale: 1.03,
                rotateX: 3,
                rotateY: 3,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 opacity-50" />
              <div className="relative flex items-center space-x-4">
                <motion.div 
                  className="p-3 rounded-xl bg-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Award size={26} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Relationship Milestone Achieved!</h3>
                  <p className="text-white/90 mt-1 text-sm">Completed 10 counseling sessions together. View all your achievements!</p>
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

      {/* Enhanced Popup with Glassmorphism */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20"
              initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-pink-100/20 opacity-50" />
              <div className="relative text-center">
                <motion.h2 
                  className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Ready to Find Your Match?
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mb-8 text-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Our AI-powered algorithm is finding your perfect partner. Track your match progress now!
                </motion.p>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium py-3 px-8 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300"
                    onClick={() => {
                      setShowPopup(false);
                      navigate('/match-track');
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(244, 114, 182, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Track My Match
                  </motion.button>
                  <motion.button
                    className="bg-white/30 backdrop-blur-sm text-rose-600 font-medium py-3 px-8 rounded-lg border border-white/20 hover:bg-white/40 transition-all duration-300"
                    onClick={() => setShowPopup(false)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(244, 114, 182, 0.3)" }}
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