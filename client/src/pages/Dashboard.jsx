import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useScroll, useTransform } from 'framer-motion';
import { 
  Heart, MessageCircle, Calendar, User, 
  HelpCircle, Users, Sparkles, TrendingUp, 
  Activity, Award, Settings, Shield, 
  BookOpen, Star, Info, Phone, Bell, ChevronRight
} from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

// Simplified StatCard with clean design
const StatCard = ({ icon, title, value, change, isPositive = true, to }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white rounded-lg p-5 shadow hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => navigate(to)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
          {icon}
        </div>
        <div className={`text-sm ${isPositive ? 'text-pink-500' : 'text-blue-500'} font-medium flex items-center`}>
          <TrendingUp size={14} className={`mr-1 ${!isPositive && 'transform rotate-180'}`} />
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
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

// Clean NavigationCard
const NavigationCard = ({ title, icon, description, to }) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white rounded-lg p-5 shadow hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => navigate(to)}
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div>
          <ChevronRight className="w-5 h-5 text-pink-500" />
        </div>
      </div>
    </div>
  );
};

NavigationCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

// Redesigned Dashboard with wedding/dating theme
const WeddingDatingDashboard = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Profile image from assets
  const profileImage = "assets/test.png";

  // Simple parallax effect
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-pink-50 overflow-hidden">
      {/* Simple background with subtle wedding theme */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ 
          backgroundImage: 'url(/images/wedding-pattern.png)', 
          backgroundSize: '200px',
          transform: `translateY(${yBackground}px)`
        }} 
      />
      
      <Sidebar />
      
      <div className="relative flex-grow flex flex-col" ref={containerRef}>
        <Header />
        
        <main className="relative flex-grow overflow-y-auto px-6 py-8 lg:px-10 lg:py-12">
          {/* Welcome Section */}
          <div className="mb-10 bg-white rounded-xl p-6 shadow">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  Welcome back, 
                  <span className="ml-2 text-pink-600">
                    {authUser?.name || 'User'}
                  </span>
                </h1>
                <p className="text-gray-600 mt-2">
                  Discover whats new in your relationship journey today.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
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
          </div>

          {/* Main Services Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <Heart size={20} className="text-pink-600 mr-2" />
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <NavigationCard
                title="Marriage Counseling"
                icon={<Heart size={20} />}
                description="Professional guidance for couples"
                to="/marriage-counseling"
              />
              <NavigationCard
                title="Dating App"
                icon={<Users size={20} />}
                description="Connect with your perfect match"
                to="/dating-app"
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
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <Calendar size={20} className="text-pink-600 mr-2" />
              Planning Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <HelpCircle size={20} className="text-pink-600 mr-2" />
              Support & Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <User size={20} className="text-pink-600 mr-2" />
              Account Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

          {/* Achievement Section - Simple Banner */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <Award size={20} className="text-pink-600 mr-2" />
              Recent Achievement
            </h2>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-5 text-white shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-white/20">
                  <Award size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Relationship Milestone Achieved!</h3>
                  <p className="text-white/90 mt-1">Completed 10 counseling sessions together. View all your achievements!</p>
                </div>
                <button 
                  onClick={() => navigate(authUser ? "/achievements" : "/login")}
                  className="ml-auto px-4 py-2 bg-white text-pink-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
          
          {/* Featured Success Story */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <Heart size={20} className="text-pink-600 mr-2" />
              Success Story
            </h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-pink-100 p-6 flex items-center justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src="assets/test.png" 
                      alt="Couple" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold text-gray-800">Sarah & Michael</h3>
                  <p className="text-gray-500 mb-4">Matched 18 months ago • Married 3 months ago</p>
                  <p className="text-gray-600 mb-4">We met through the matchmaking service and instantly connected. The relationship counseling helped us build a strong foundation. Were so grateful to have found each other!</p>
                  <button 
                    onClick={() => navigate("/success-stories")}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
                  >
                    Read More Stories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Simplified Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
              Ready to Find Your Match?
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Our AI-powered algorithm is finding your perfect partner. Track your match progress now!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-pink-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors"
                onClick={() => {
                  setShowPopup(false);
                  navigate('/match-track');
                }}
              >
                Track My Match
              </button>
              <button
                className="bg-gray-100 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
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

export default WeddingDatingDashboard;