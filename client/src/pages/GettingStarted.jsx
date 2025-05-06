import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import PrivacySelectionComponent from "../components/PrivacySelectionComponent";
import PaymentConfirmationComponent from "../components/PaymentConfirmationComponent";
import ProfileSuccessComponent from "../components/ProfileSuccessComponent";

const GettingStarted = () => {
  const [currentView, setCurrentView] = useState("form");
  const [formData, setFormData] = useState({});
  const [privacyOption, setPrivacyOption] = useState(null);
  const [animationDirection, setAnimationDirection] = useState("forward");
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize form data with user data from navigation state
  useEffect(() => {
    if (location.state?.userData) {
      setFormData(location.state.userData);
    }
  }, [location.state]);

  // Gradient colors for different views
  const viewGradients = {
    form: "from-fuchsia-100 via-purple-100 to-pink-100",
    privacy: "from-indigo-100 via-blue-100 to-purple-100",
    payment: "from-emerald-100 via-teal-100 to-cyan-100",
    success: "from-green-100 via-lime-100 to-emerald-100"
  };

  const getProgressPercentage = () => {
    const steps = { form: 25, privacy: 50, payment: 75, success: 100 };
    return steps[currentView] || 0;
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setAnimationDirection("forward");
    setCurrentView("privacy");
  };

  const handlePrivacySelect = (option) => {
    setPrivacyOption(option);
    setAnimationDirection("forward");
    setCurrentView("payment");
  };

  const handlePaymentConfirm = () => {
    setAnimationDirection("forward");
    setCurrentView("success");
    // Save form completion status to local storage
    localStorage.setItem("formCompleted", "true");
    setTimeout(() => navigate("/dashboard"), 300000);
  };

  const handlePaymentCancel = () => {
    setAnimationDirection("backward");
    setCurrentView("privacy");
  };

  const handleBack = () => {
    setAnimationDirection("backward");
    if (currentView === "privacy") setCurrentView("form");
    else if (currentView === "payment") setCurrentView("privacy");
  };
  

  // Enhanced animation variants
  const pageVariants = {
    enter: (direction) => ({
      x: direction === "forward" ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction === "forward" ? -500 : 500,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    })
  };

  const progressColors = {
    form: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
    privacy: "bg-gradient-to-r from-indigo-500 to-purple-500",
    payment: "bg-gradient-to-r from-teal-500 to-cyan-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500"
  };

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen bg-gradient-to-br ${viewGradients[currentView]} overflow-hidden transition-all duration-700`}>
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col p-6 relative overflow-hidden">
          {/* Animated floating particles */}
          <AnimatePresence>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className={`absolute rounded-full ${i % 3 === 0 ? 'bg-pink-300' : i % 2 === 0 ? 'bg-purple-300' : 'bg-blue-300'} ${
                  i % 4 === 0 ? 'w-3 h-3' : 'w-2 h-2'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </AnimatePresence>

          {/* Enhanced progress bar with animated steps */}
          <div className="w-full max-w-7xl mx-auto mb-8 relative ">
            <div className="h-3 bg-white bg-opacity-30 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className={`h-full ${progressColors[currentView]} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  damping: 15
                }}
              />
            </div>
            <div className="flex justify-between mt-4 relative">
              {["form", "privacy", "payment", "success"].map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      getProgressPercentage() >= index * 25 + 25 
                        ? progressColors[currentView] 
                        : "bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {index + 1}
                  </motion.div>
                  <motion.span 
                    className={`text-xs mt-1 font-medium ${
                      getProgressPercentage() >= index * 25 + 25 
                        ? "text-gray-800" 
                        : "text-gray-500"
                    }`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Main content container with enhanced animations */}
          <div className="relative flex-grow flex justify-center items-center">
            <AnimatePresence custom={animationDirection} mode="wait">
              <motion.div
                key={currentView}
                custom={animationDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-7xl p-8 relative overflow-hidden border border-white border-opacity-30"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                {/* Dynamic background decoration elements */}
                <motion.div 
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-pink-200 opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-purple-200 opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2
                  }}
                />
                
                {/* Back button with enhanced animation */}
                {(currentView === "privacy" || currentView === "payment") && (
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      x: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 z-10 group"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.span 
                      className="mr-1 text-2xl group-hover:-translate-x-1 transition-transform"
                    >
                      ←
                    </motion.span>
                    <span>Back</span>
                  </motion.button>
                )}

                {currentView === "form" && (
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mb-8 text-center"
                    >
                      <motion.h1 
                        className="text-4xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%']
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        Find Your Perfect Match
                      </motion.h1>
                      <motion.p 
                        className="text-lg text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Let our matchmaking experts help you find your soulmate
                      </motion.p>
                    </motion.div>
                    <ProfileForm onSubmit={handleFormSubmit} initialData={formData} />
                  </div>
                )}

                {currentView === "privacy" && (
                  <div className="relative z-10 pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <PrivacySelectionComponent
                        onSelect={handlePrivacySelect}
                        selectedOption={privacyOption}
                      />
                    </motion.div>
                  </div>
                )}

                {currentView === "payment" && (
                  <div className="relative z-10 pt-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <PaymentConfirmationComponent
                        option={privacyOption}
                        onConfirm={handlePaymentConfirm}
                        onCancel={handlePaymentCancel}
                      />
                    </motion.div>
                  </div>
                )}

                {currentView === "success" && (
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ProfileSuccessComponent />
                    </motion.div>
                    {/* Confetti animation */}
                    <AnimatePresence>
                      {[...Array(30)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            x: Math.random() * 100 - 50,
                            y: -20,
                            rotate: Math.random() * 360,
                            opacity: 0
                          }}
                          animate={{
                            y: window.innerHeight,
                            x: Math.random() * 200 - 100,
                            rotate: Math.random() * 360,
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 3,
                            delay: i * 0.05,
                            ease: "linear"
                          }}
                          className={`absolute top-0 left-1/2 w-2 h-2 ${
                            i % 5 === 0 ? 'bg-yellow-400' : 
                            i % 4 === 0 ? 'bg-pink-400' : 
                            i % 3 === 0 ? 'bg-blue-400' : 
                            'bg-green-400'
                          } rounded-sm`}
                          style={{
                            left: `${50 + (Math.random() * 20 - 10)}%`
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GettingStarted;