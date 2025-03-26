import { useState } from 'react';
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
    <div className="flex justify-center items-center min-h-screen bg-pink-50 overflow-hidden">
      {/* Floating hearts background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="w-full max-w-6xl h-auto md:h-[600px] bg-white rounded-xl shadow-lg overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* 3D Logo */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 flex items-center gap-3">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            animate={{ 
              rotateY: [0, 180, 360],
              rotateX: [0, 20, 0]
            }}
            transition={{ 
              rotateY: { 
                repeat: Infinity, 
                duration: 8,
                ease: "linear" 
              },
              rotateX: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              },
              scale: { duration: 0.3 }
            }}
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-sm opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            
            {/* Logo container */}
            <motion.div 
              className="relative p-0.5 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 shadow-lg"
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              <div className="bg-white p-1 rounded-full">
                <motion.img
                  src={logo}
                  alt="MiAmour Logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-cover"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
            
            {/* Floating heart */}
            <motion.div
              className="absolute -top-1 -right-1 text-pink-600"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
                y: [0, -5, 0],
                rotateZ: [0, 20, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5 
              }}
              style={{
                transformStyle: "preserve-3d"
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
        
        {/* Main content with 3D flip effect */}
        <motion.div 
          className={`flex flex-col md:flex-row w-full h-full`}
          animate={{
            rotateY: isLoginActive ? 0 : 180
          }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {/* Form Section */}
          <motion.div 
            className={`w-full md:w-1/2 order-2 ${isLoginActive ? 'md:order-2' : 'md:order-1'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              backfaceVisibility: "hidden",
              transform: isLoginActive ? "rotateY(0deg)" : "rotateY(180deg)"
            }}
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
            style={{
              backfaceVisibility: "hidden",
              transform: isLoginActive ? "rotateY(0deg)" : "rotateY(180deg)"
            }}
          >
            <div className="w-full h-full bg-pink-100 relative overflow-hidden">
              <motion.img
                src={banner}
                alt={isLoginActive ? "Login illustration" : "Signup illustration"}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-pink-600/40"></div>
              
              <motion.div 
                className="absolute bottom-8 left-8 right-8 text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2 
                  className="text-3xl font-serif font-bold mb-2"
                  whileHover={{ scale: 1.02 }}
                >
                  Find Your Perfect Match
                </motion.h2>
                <motion.p 
                  className="text-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  Join MiAmour and begin your journey to lasting love
                </motion.p>
              </motion.div>
              
              {/* Floating hearts overlay */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-200"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    fontSize: `${Math.random() * 24 + 16}px`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaHeart />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;