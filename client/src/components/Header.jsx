import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, Bell, Heart, Rocket, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/miLogo.png";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [logoHoverState, setLogoHoverState] = useState(0); // 0: normal, 1: hovering, 2: animating

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Trigger logo animation sequence
  useEffect(() => {
    if (logoHoverState === 1) {
      const timer = setTimeout(() => {
        setLogoHoverState(2);
        setTimeout(() => setLogoHoverState(0), 2000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [logoHoverState]);

  return (
    <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Supercharged Logo Animation */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group relative"
              onMouseEnter={() => setLogoHoverState(1)}
              onMouseLeave={() => logoHoverState !== 2 && setLogoHoverState(0)}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: logoHoverState === 1 ? 1.1 : 1,
                  rotate: logoHoverState === 2 ? [0, 10, -10, 0] : 0
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.8, when: "afterChildren" }
                }}
              >
                {/* Glowing logo container */}
                <motion.div
                  className="relative z-10 p-1 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg"
                  animate={{
                    boxShadow: logoHoverState === 2 ? [
                      "0 0 0 0px rgba(255,255,255,0.4)",
                      "0 0 0 10px rgba(255,255,255,0)",
                      "0 0 0 20px rgba(255,255,255,0)"
                    ] : "0 0 0 0px rgba(255,255,255,0)"
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-10 h-10 object-contain"
                  />
                </motion.div>
                
                {/* Animated elements */}
                <AnimatePresence>
                  {(logoHoverState > 0) && (
                    <>
                      {/* Floating hearts */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.5, 1],
                          opacity: [0, 1, 1],
                          rotate: [0, 360],
                          y: [0, -20, 0],
                          x: [-20, 0, -20]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 1.5,
                          ease: "anticipate"
                        }}
                        className="absolute -top-4 -left-4 text-red-500 z-0"
                      >
                        <Heart className="w-6 h-6 fill-current" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.5, 1],
                          opacity: [0, 1, 1],
                          rotate: [0, -360],
                          y: [0, 20, 0],
                          x: [20, 0, 20]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 1.5,
                          ease: "anticipate",
                          delay: 0.2
                        }}
                        className="absolute -bottom-4 -right-4 text-red-500 z-0"
                      >
                        <Heart className="w-6 h-6 fill-current" />
                      </motion.div>
                      
                      {/* Rocket animation */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                        animate={{ 
                          scale: logoHoverState === 2 ? [1, 1.5, 0.5, 1] : [0, 1],
                          opacity: [0, 1, 1],
                          x: logoHoverState === 2 ? [0, 40, -30, 0] : [0, 0],
                          y: logoHoverState === 2 ? [0, -50, 30, 0] : [0, 0]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 1.5,
                          ease: "backInOut"
                        }}
                        className="absolute -top-8 right-0 text-yellow-300 z-0"
                      >
                        <Rocket className="w-5 h-5" />
                      </motion.div>
                      
                      {/* Sparkle burst */}
                      {logoHoverState === 2 && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                x: Math.cos((i/8)*Math.PI*2) * 30,
                                y: Math.sin((i/8)*Math.PI*2) * 30
                              }}
                              transition={{ 
                                duration: 1,
                                delay: i * 0.05,
                                ease: "easeOut"
                              }}
                              className="absolute inset-0 flex items-center justify-center text-yellow-300"
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-white hidden sm:inline"
              >
                MIAMOUR
              </motion.span>
            </Link>
          </div>

          {/* Ultra-Wide Animated Dropdown */}
          <div className="flex items-center space-x-4">
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
                      src={authUser.image || "/avatar.png"}
                      className="h-12 w-12 object-cover rounded-full border-2 border-white shadow-md"
                      alt="User image"
                      whileHover={{ borderColor: "#ffb6c1" }}
                    />
                    <span className="absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></span>
                  </div>
                  
                  <div className="flex-col items-start hidden sm:flex">
                    <span className="text-white font-medium">{authUser.name}</span>
                    <span className="text-pink-200 text-xs">Online</span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:block"
                  >
                    <ChevronDown className="h-5 w-5 text-white" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-pink-200 overflow-hidden"
                      style={{
                        boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)"
                      }}
                    >
                      {/* User Info Section */}
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-6 py-5 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-pink-100"
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative"
                          >
                            <img
                              src={authUser.image || "/avatar.png"}
                              className="h-16 w-16 object-cover rounded-full border-2 border-pink-400 shadow-sm"
                              alt="User image"
                            />
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity
                              }}
                              className="absolute inset-0 rounded-full border-2 border-pink-400 pointer-events-none"
                            />
                          </motion.div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-800 text-lg truncate">{authUser.name}</p>
                            <p className="text-sm font-medium text-gray-600 truncate">{authUser.email}</p>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="h-1 bg-gradient-to-r from-pink-400 to-pink-600 mt-2 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Profile Links with Staggered Animations */}
                      <div className="py-2">
                        {[
                          { icon: <User size={18} />, text: "My Profile", subtext: "View and edit profile", link: "/profile" },
                          { icon: <Bell size={18} />, text: "Notifications", subtext: "View all alerts", link: "/notifications" },
                          { icon: <LogOut size={18} />, text: "Logout", subtext: "Sign out of account", action: () => { logout(); setDropdownOpen(false); } }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            whileHover={{ x: 5 }}
                          >
                            {item.link ? (
                              <Link
                                to={item.link}
                                className="flex items-center px-6 py-4 text-gray-700 hover:bg-pink-50 transition-colors duration-200"
                                onClick={() => setDropdownOpen(false)}
                              >
                                <div className="mr-4 bg-pink-100 p-2 rounded-full">
                                  {item.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{item.text}</p>
                                  <p className="text-xs text-gray-500">{item.subtext}</p>
                                </div>
                                <motion.div
                                  className="ml-auto text-pink-400 opacity-0 group-hover:opacity-100"
                                  whileHover={{ x: 5 }}
                                >
                                  <ChevronRight size={16} />
                                </motion.div>
                              </Link>
                            ) : (
                              <button
                                onClick={item.action}
                                className="w-full flex items-center px-6 py-4 text-gray-700 hover:bg-pink-50 transition-colors duration-200"
                              >
                                <div className="mr-4 bg-pink-100 p-2 rounded-full">
                                  {item.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{item.text}</p>
                                  <p className="text-xs text-gray-500">{item.subtext}</p>
                                </div>
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Footer with animated border */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5 }}
                        className="border-t border-pink-200 px-6 py-3 bg-pink-50 text-center"
                      >
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-xs text-pink-600"
                        >
                          Premium Member
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block"
                >
                  <Link
                    to="/auth"
                    className="text-white hover:text-pink-200 transition duration-150 ease-in-out text-lg font-medium"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth"
                    className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold hover:bg-pink-100 transition duration-150 ease-in-out shadow-md"
                  >
                    <span className="hidden sm:inline">Sign Up</span>
                    <span className="sm:hidden">Join</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};