import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, Bell, ChevronRight, Settings, Heart, MessageCircle, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine avatar based on gender (male/female)
  const getAvatar = () => {
    const isFemale = authUser?.gender === "female";
    return isFemale ? "/assets/avatarwoman.png" : "/assets/avatarmale.png";
  };

  const menuItems = [
    { 
      icon: <User size={18} />, 
      text: "My Profile", 
      subtext: "View and edit profile", 
      link: "/profile",
      color: "text-blue-500"
    },
    { 
      icon: <Heart size={18} />, 
      text: "My Matches", 
      subtext: "View your matches", 
      link: "/matches",
      color: "text-pink-500"
    },
    { 
      icon: <MessageCircle size={18} />, 
      text: "Messages", 
      subtext: "View your conversations", 
      link: "/messages",
      color: "text-purple-500"
    },
    { 
      icon: <Bell size={18} />, 
      text: "Notifications", 
      subtext: "View all alerts", 
      link: "/notifications",
      color: "text-amber-500"
    },
    { 
      icon: <Settings size={18} />, 
      text: "Settings", 
      subtext: "Manage your preferences", 
      link: "/settings",
      color: "text-gray-500"
    },
    { 
      icon: <Shield size={18} />, 
      text: "Privacy", 
      subtext: "Manage your privacy", 
      link: "/privacy",
      color: "text-green-500"
    },
    { 
      icon: <LogOut size={18} />, 
      text: "Logout", 
      subtext: "Sign out of account", 
      action: () => { logout(); setDropdownOpen(false); },
      color: "text-red-500"
    },
  ];

  return (
    <header className="bg-white border-b border-pink-100 py-4 px-6 flex justify-between items-center shadow-sm">
      <Link to="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <img 
          src="/assets/miLogo2.png" 
          alt="Miamour Logo" 
          className="h-8 mr-2"
        />
        <span className="text-2xl font-bold text-pink-600">Miamour</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-pink-50 relative"
        >
          <Bell size={20} className="text-pink-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </motion.button>
        
        {authUser ? (
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="relative">
                <motion.img
                  src={getAvatar()}
                  className="h-10 w-10 object-cover rounded-full border-2 border-pink-200"
                  alt="User avatar"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></span>
              </div>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-pink-600" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-pink-100 overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-6 py-5 border-b border-pink-50 bg-gradient-to-r from-pink-50 to-purple-50"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.img
                        src={getAvatar()}
                        className="h-14 w-14 object-cover rounded-full border-2 border-white shadow-md"
                        alt="User avatar"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-lg truncate">{authUser.name}</p>
                        <p className="text-sm text-gray-500 truncate">{authUser.email}</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ backgroundColor: "#fef1f7" }}
                        className="px-4 py-3 hover:bg-pink-50 transition-colors duration-150"
                      >
                        {item.link ? (
                          <Link
                            to={item.link}
                            className="flex items-center"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className={`mr-3 ${item.color}`}>{item.icon}</div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{item.text}</p>
                              <p className="text-xs text-gray-500">{item.subtext}</p>
                            </div>
                            <motion.div
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="ml-auto text-pink-400"
                            >
                              <ChevronRight size={16} />
                            </motion.div>
                          </Link>
                        ) : (
                          <button
                            onClick={item.action}
                            className="flex items-center w-full text-left"
                          >
                            <div className={`mr-3 ${item.color}`}>{item.icon}</div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{item.text}</p>
                              <p className="text-xs text-gray-500">{item.subtext}</p>
                            </div>
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-pink-50 px-6 py-4 bg-gradient-to-r from-pink-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-pink-600">Premium Member</p>
                        <p className="text-xs text-gray-500">Enjoy all premium features</p>
                      </div>
                      <Link to="/billing-process">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm rounded-full font-medium shadow-md hover:from-pink-600 hover:to-purple-600"
                        >
                          Upgrade
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <Link
              to="/auth"
              className="text-pink-600 hover:text-pink-700 transition duration-150 ease-in-out text-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/auth"
              className="bg-pink-600 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-700 transition duration-150 ease-in-out shadow-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};