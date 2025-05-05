import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import banner from '../assets/wedding19.png';
import logo from '../assets/miLogo.png';
import { FaHeart } from 'react-icons/fa';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';
import GoogleAuthFlow from '../components/GoogleAuthFlow';
import IjeuwaAuthFlow from '../components/IjeuwaAuthFlow';

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('signup'); // signup, login, google, ijeuwa
  const [authMode, setAuthMode] = useState('signup'); // tracks if we're in login or signup flow
  const navigate = useNavigate();

  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
    setAuthMode(activeForm === 'login' ? 'signup' : 'login');
  };

  const handleGoogleAuth = () => {
    setActiveForm('google');
  };

  const handleIjeuwaAuth = () => {
    setActiveForm('ijeuwa');
  };

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful:', userData);
    navigate('/profile');
  };

  const handleAuthCancel = () => {
    setActiveForm(authMode); // Go back to the original form (login or signup)
  };

  // Simplified heart animation
  const heartVariants = {
    float: {
      y: [-10, -50, -100],
      opacity: [0.2, 0.8, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeOut',
      },
    },
  };

  // Determine the title based on active form
  const getFormTitle = () => {
    switch (activeForm) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Find Your Perfect Match';
      case 'google': return authMode === 'login' ? 'Login with Google' : 'Sign up with Google';
      case 'ijeuwa': return authMode === 'login' ? 'Login with Ijeuwa' : 'Sign up with Ijeuwa';
      default: return 'Join Miamour';
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 10}px`,
            }}
            variants={heartVariants}
            animate="float"
            initial={{ opacity: 0 }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </div>

      {/* Main Card - Fullscreen on mobile, max-width on desktop */}
      <motion.div
        className="w-full h-full md:w-[90vw] md:max-w-6xl md:h-[80vh] md:max-h-[700px] bg-white/90 rounded-none md:rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Logo Section - Hidden on mobile */}
        <div className="hidden md:flex absolute top-4 left-4 md:top-6 md:left-6 z-20 items-center gap-3">
          <motion.img
            src={logo}
            alt="Miamour Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h1
            className="font-serif text-2xl md:text-3xl font-bold text-pink-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Miamour
          </motion.h1>
        </div>

        {/* Form Section - Updated to handle all form types */}
        <div className="w-full md:w-1/2 h-full bg-white/95 flex items-center justify-center order-2 md:order-2">
          <AnimatePresence mode="wait">
            {activeForm === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <LoginForm 
                  toggleForm={toggleForm} 
                  onGoogleClick={handleGoogleAuth}
                  onIjeuwaClick={handleIjeuwaAuth}
                />
              </motion.div>
            )}
            
            {activeForm === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full overflow-hidden"
              >
                <SignupForm 
                  toggleForm={toggleForm}
                  onGoogleClick={handleGoogleAuth}
                  onIjeuwaClick={handleIjeuwaAuth}
                />
              </motion.div>
            )}
            
            {activeForm === 'google' && (
              <motion.div
                key="google"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <GoogleAuthFlow 
                  isLogin={authMode === 'login'}
                  onSuccess={handleAuthSuccess}
                  onCancel={handleAuthCancel}
                />
              </motion.div>
            )}
            
            {activeForm === 'ijeuwa' && (
              <motion.div
                key="ijeuwa"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <IjeuwaAuthFlow 
                  isLogin={authMode === 'login'}
                  onSuccess={handleAuthSuccess}
                  onCancel={handleAuthCancel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Image Section - Hidden on mobile for performance */}
        <div className="hidden md:block w-1/2 h-full bg-pink-100 relative order-1">
          <motion.img
            src={banner}
            alt="Authentication illustration"
            className="w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/30"></div>
          <motion.div
            className="absolute bottom-6 left-6 right-6 text-white"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              {getFormTitle()}
            </h2>
            <p className="text-base md:text-lg">
              {activeForm === 'login' 
                ? 'Welcome back to your journey to lasting love' 
                : 'Join Miamour and begin your journey to lasting love'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;