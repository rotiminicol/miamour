import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, Bell, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/assets/miLogo2.png"; 

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

  return (
    <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Simplified Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.img
                src={logo}
                alt="Logo"
                className="w-12 h-12 object-contain bg-white rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-extrabold text-white hidden sm:inline tracking-tight"
              >
                MIAMOUR
              </motion.span>
            </Link>
          </div>

          {/* Refined Dropdown with Animated Avatar */}
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
                      src={getAvatar()}
                      className="h-12 w-12 object-cover rounded-full border-2 border-white shadow-md"
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
                  <div className="flex-col items-start hidden sm:flex">
                    <span className="text-white font-medium text-sm">{authUser.name}</span>
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
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-pink-100 overflow-hidden"
                      style={{
                        boxShadow: "0 8px 20px rgba(236, 72, 153, 0.2)",
                      }}
                    >
                      {/* User Info Section */}
                      <motion.div
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-4 py-4 border-b border-pink-50 bg-pink-50"
                      >
                        <div className="flex items-center space-x-3">
                          <motion.img
                            src={getAvatar()}
                            className="h-12 w-12 object-cover rounded-full"
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
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 text-sm truncate">{authUser.name}</p>
                            <p className="text-xs text-gray-500 truncate">{authUser.email}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Profile Links */}
                      <div className="py-1">
                        {[
                          { icon: <User size={16} />, text: "My Profile", subtext: "View and edit profile", link: "/profile" },
                          { icon: <Bell size={16} />, text: "Notifications", subtext: "View all alerts", link: "/notifications" },
                          { icon: <LogOut size={16} />, text: "Logout", subtext: "Sign out of account", action: () => { logout(); setDropdownOpen(false); } },
                        ].map((item, index) => (
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
                                <div className="mr-3 text-pink-500">{item.icon}</div>
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
                                <div className="mr-3 text-pink-500">{item.icon}</div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800">{item.text}</p>
                                  <p className="text-xs text-gray-500">{item.subtext}</p>
                                </div>
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="border-t border-pink-50 px-4 py-2 bg-pink-50 text-center">
                        <p className="text-xs text-pink-600 font-medium">Premium Member</p>
                      </div>
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