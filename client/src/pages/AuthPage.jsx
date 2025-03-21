import  { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';
import { motion, AnimatePresence } from 'framer-motion';
import banner from '../assets/wedding19.png';
import logo from '../assets/miLogo.png';
import { FaHeart } from 'react-icons/fa';

const AuthPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="w-full max-w-6xl h-auto md:h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Logo */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 flex items-center gap-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ 
                rotate: { 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                },
                scale: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
              <div className="relative p-0.5 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 shadow-lg">
                <div className="bg-white p-1 rounded-full">
                  <img
                    src={logo}
                    alt={isLoginActive ? "Login illustration" : "Signup illustration"}
                    className="w-8 h-8 md:w-10 md:h-10 object-cover"
                  />
                </div>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 text-pink-600"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5 
                }}
              >
                <FaHeart className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="font-serif text-2xl font-bold text-pink-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              MiAmour
            </motion.h1>
          </div>
        
        <div className={`flex flex-col md:flex-row w-full h-full transition-all duration-700 ease-in-out`}>
          {/* Form Section */}
          <motion.div 
            className={`w-full md:w-1/2 order-2 ${isLoginActive ? 'md:order-2' : 'md:order-1'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isLoginActive ? (
                <LoginForm key="login" toggleForm={toggleForm} />
              ) : (
                <SignupForm key="signup" toggleForm={toggleForm} />
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className={`hidden md:block w-1/2 ${isLoginActive ? 'order-1' : 'order-2'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full bg-pink-100 relative">
              <img
                src={banner}
                alt={isLoginActive ? "Login illustration" : "Signup illustration"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-pink-600/40"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-serif font-bold mb-2">Find Your Perfect Match</h2>
                <p className="text-lg">Join MiAmour and begin your journey to lasting love</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;