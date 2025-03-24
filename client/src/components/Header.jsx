import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/miLogo.png"

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

  // Replace this with your logo URL
 

  return (
    <header className='bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <Link to='/' className='flex items-center space-x-2 group'>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Replace Flame with your logo */}
                <img
                  src={logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </motion.div>
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='text-2xl font-bold text-white hidden sm:inline'
              >
                MIAMOUR
              </motion.span>
            </Link>
          </div>

          {/* Profile Dropdown - Mobile & Desktop */}
          <div className='flex items-center space-x-4'>
            {authUser ? (
              <div className='relative' ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center space-x-2 focus:outline-none group'
                >
                  <div className='relative'>
                    <motion.img
                      src={authUser.image || "/avatar.png"}
                      className='h-12 w-12 object-cover rounded-full border-2 border-white shadow-md'
                      alt='User image'
                      whileHover={{ borderColor: "#ffb6c1" }}
                    />
                    <span className='absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white'></span>
                  </div>
                  
                  {/* User info - Only visible on desktop */}
                  <div className='flex-col items-start hidden sm:flex'>
                    <span className='text-white font-medium'>{authUser.name}</span>
                    <span className='text-pink-200 text-xs'>Online</span>
                  </div>
                  
                  {/* Dropdown arrow - Only visible on desktop */}
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:block"
                  >
                    <ChevronDown className='h-5 w-5 text-white' />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className='absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl border-2 border-pink-200 py-2 z-10 overflow-hidden'
                      style={{ boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)' }}
                    >
                      {/* User Info Section - Enhanced */}
                      <div className='px-5 py-4 border-b-2 border-pink-200 bg-gradient-to-r from-pink-100 to-pink-200'>
                        <div className='flex items-center space-x-4'>
                          <img
                            src={authUser.image || "/avatar.png"}
                            className='h-16 w-16 object-cover rounded-full border-3 border-pink-500 shadow-lg'
                            alt='User image'
                          />
                          <div>
                            <p className='font-bold text-gray-800 text-lg'>{authUser.name}</p>
                            <p className='text-sm font-medium text-gray-600'>{authUser.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Profile Links - Enhanced */}
                      <div className='py-2'>
                        <Link
                          to='/profile'
                          className='px-5 py-3 text-base font-semibold text-gray-700 hover:bg-pink-100 flex items-center space-x-3 transition-all duration-300 hover:pl-8 hover:text-pink-600 relative overflow-hidden group'
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="absolute left-0 h-full w-1 bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.3 }}>
                            <User className="text-pink-500" size={20} />
                          </motion.div>
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to='/notifications'
                          className='px-5 py-3 text-base font-semibold text-gray-700 hover:bg-pink-100 flex items-center space-x-3 transition-all duration-300 hover:pl-8 hover:text-pink-600 relative overflow-hidden group'
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="absolute left-0 h-full w-1 bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.3 }}>
                            <Bell className="text-pink-500" size={20} />
                          </motion.div>
                          <span>Notifications</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className='w-full text-left px-5 py-3 text-base font-semibold text-gray-700 hover:bg-pink-100 flex items-center space-x-3 transition-all duration-300 hover:pl-8 hover:text-pink-600 relative overflow-hidden group'
                        >
                          <div className="absolute left-0 h-full w-1 bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.3 }}>
                            <LogOut className="text-pink-500" size={20} />
                          </motion.div>
                          <span>Logout</span>
                        </button>
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
                    to='/auth'
                    className='text-white hover:text-pink-200 transition duration-150 ease-in-out text-lg font-medium'
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to='/auth'
                    className='bg-white text-pink-600 px-6 py-2 rounded-full font-bold hover:bg-pink-100 transition duration-150 ease-in-out shadow-md'
                  >
                    {/* Text changes based on screen size */}
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