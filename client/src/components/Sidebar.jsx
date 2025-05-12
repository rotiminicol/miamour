import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { 
  Heart, Loader, MessageCircle, Home, CreditCard, 
  Settings, Shield, Calendar, HelpCircle, FileText, Gift,
  ChevronRight, User, Menu, ArrowLeftCircle, Users, Sparkles,
  BarChart2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Unified glassmorphism/gradient style
const glassBg = "bg-white/70 backdrop-blur-md border border-pink-100 shadow-xl";
const gradientAccent = "bg-gradient-to-r from-pink-100 via-white to-purple-100";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const location = useLocation();
  const { authUser } = useAuthStore();
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCategory = (category) => setExpandedCategory(expandedCategory === category ? null : category);

  const getAvatar = () => {
    if (authUser?.image) return authUser.image;
    const isFemale = authUser?.gender === "female";
    return isFemale ? "/assets/avatarwoman.png" : "/assets/avatarmale.png";
  };

  useEffect(() => { getMyMatches(); }, [getMyMatches]);
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth < 1024) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => { if (window.innerWidth < 1024) setIsOpen(false); }, [location.pathname]);

  const categories = {
    services: [
      { icon: <Heart size={18} className="text-pink-500" />, text: 'Counseling', to: '/marriage-counseling' },
      { icon: <Calendar size={18} className="text-teal-500" />, text: 'Schedule', to: '/schedule' },
      { icon: <Home size={18} className="text-amber-500" />, text: 'Ceremony Planning', to: '/ceremony-planning' },
      { icon: <Home size={18} className="text-amber-500" />, text: 'Marriage Planning', to: '/marriage-planning' },
      { icon: <Users size={18} className="text-purple-500" />, text: 'Relationship Therapy', to: '/relationship-therapy' },
      { icon: <Sparkles size={18} className="text-pink-400" />, text: 'Personalized Matchmaking', to: '/personalized-matchmaking' },
      { icon: <Users size={18} className="text-blue-500" />, text: 'Therapy Sessions', to: '/therapy' }
    ],
    billing: [
      { icon: <CreditCard size={18} className="text-green-500" />, text: 'Payment Methods', to: '/billing-process' },
      { icon: <CreditCard size={18} className="text-green-600" />, text: 'Subscriptions', to: '/subscriptions' },
      { icon: <FileText size={18} className="text-green-400" />, text: 'Invoices', to: '/invoices' },
      { icon: <Gift size={18} className="text-green-700" />, text: 'Discounts', to: '/discounts' },
    ],
    settings: [
      { icon: <User size={18} className="text-blue-500" />, text: 'My Account', to: '/profile' },
      { icon: <Settings size={18} className="text-blue-600" />, text: 'Preferences', to: '/preference' },
      { icon: <Shield size={18} className="text-blue-400" />, text: 'Privacy', to: '/privacy' },
    ],
    support: [
      { icon: <HelpCircle size={18} className="text-orange-500" />, text: 'Get Help', to: '/help-support' },
      { icon: <MessageCircle size={18} className="text-orange-400" />, text: 'Contact Us', to: '/contact-us' },
      { icon: <HelpCircle size={18} className="text-orange-600" />, text: 'FAQs', to: '/faqs' },
      { icon: <HelpCircle size={18} className="text-orange-300" />, text: 'Resources', to: '/resources' },
    ]
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      <motion.div
        className={`
          fixed inset-y-0 left-0 z-30 ${glassBg} ${gradientAccent} overflow-hidden
          ${window.innerWidth >= 1024 ? 'relative' : 'fixed'}
        `}
        initial={{ width: window.innerWidth >= 1024 ? "18rem" : "0" }}
        animate={{
          width: isOpen ? "18rem" : (window.innerWidth >= 1024 ? "4.5rem" : "0"),
          x: (!isOpen && window.innerWidth < 1024) ? "-100%" : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        <div className='flex flex-col h-full'>
          <div className='py-4 px-4 border-b border-pink-100 flex justify-between items-center bg-gradient-to-r from-pink-50 to-purple-50/70'>
            {isOpen ? (
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Heart className='text-pink-600' size={28} />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className='text-xl font-bold text-pink-600'
                >
                  Miamour
                </motion.h2>
              </Link>
            ) : (
              <div className="flex justify-center w-full"></div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='p-2 text-pink-600 hover:text-pink-800 focus:outline-none w-10 h-10 flex items-center justify-center'
              onClick={toggleSidebar}
            >
              {isOpen ? (
                <ArrowLeftCircle size={24} />
              ) : (
                <Menu size={24} />
              )}
            </motion.button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='p-4 border-b border-pink-200 overflow-hidden'
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className='text-lg font-semibold text-gray-700'>Your Matches</h3>
                  <Link to="/matches" className="text-pink-500 text-sm hover:text-pink-700">
                    View All
                  </Link>
                </div>
                <div className='max-h-40 overflow-y-auto'>
                  {isLoadingMyMatches ? (
                    <div className="py-3 flex justify-center">
                      <Loader className='text-pink-500 animate-spin' size={24} />
                    </div>
                  ) : matches.length === 0 ? (
                    <div className='py-3 text-center text-gray-500 text-sm'>
                      No matches found yet
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {matches.slice(0, 6).map((match) => (
                        <Link key={match._id} to={`/chat/${match._id}`}>
                          <motion.div
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="flex flex-col items-center"
                          >
                            <div className="relative">
                              <img
                                src={match.image || "/avatar.png"}
                                alt={match.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                              />
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <span className="text-xs text-center mt-1 truncate w-full">{match.name.split(' ')[0]}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className='flex-grow overflow-y-auto py-2'>
            <Link
              to="/dashboard"
              className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                isActiveRoute('/dashboard')
                  ? 'bg-pink-100 text-pink-700'
                  : 'text-gray-700 hover:bg-pink-50'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="mr-3"
              >
                <BarChart2 size={20} className={isOpen ? "text-pink-600" : "text-pink-500"} />
              </motion.div>
              {isOpen && <span className="font-medium">Dashboard</span>}
            </Link>
            <Link
              to="/homepage"
              className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                isActiveRoute('/homepage')
                  ? 'bg-pink-100 text-pink-700'
                  : 'text-gray-700 hover:bg-pink-50'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="mr-3"
              >
                <Home size={20} className={isOpen ? "text-pink-600" : "text-pink-500"} />
              </motion.div>
              {isOpen && <span className="font-medium">Home</span>}
            </Link>
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="mb-1">
                {isOpen ? (
                  <motion.button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-pink-50 transition-colors duration-200"
                  >
                    <span className="font-medium capitalize">{category}</span>
                    <motion.div
                      animate={{ rotate: expandedCategory === category ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </motion.button>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="py-3 flex justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setIsOpen(true);
                        setExpandedCategory(category);
                      }}
                      className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      {category === 'services' && <Heart size={20} className="text-pink-500" />}
                      {category === 'billing' && <CreditCard size={20} className="text-green-500" />}
                      {category === 'settings' && <Settings size={20} className="text-blue-500" />}
                      {category === 'support' && <HelpCircle size={20} className="text-orange-500" />}
                    </motion.button>
                  </motion.div>
                )}
                <AnimatePresence>
                  {isOpen && expandedCategory === category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.to}
                          className={`flex items-center pl-10 pr-6 py-2 transition-colors duration-200 ${
                            isActiveRoute(item.to)
                              ? 'bg-pink-100 text-pink-700'
                              : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                          }`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {item.icon}
                          </motion.div>
                          <span className="ml-3">{item.text}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {isOpen && authUser && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 border-t border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50/70"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="rounded-full overflow-hidden"
                  >
                    <img
                      src={getAvatar()}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border-2 border-pink-300 shadow"
                    />
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-800">{authUser.name}</p>
                    <p className="text-xs text-gray-500">{authUser.email}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <AnimatePresence>
        {!isOpen && window.innerWidth < 1024 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className='fixed bottom-6 left-6 p-3 bg-pink-600 text-white rounded-full z-20 shadow-lg'
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
export default Sidebar;