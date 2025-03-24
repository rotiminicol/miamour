import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import PrivacySelectionComponent from "../components/PrivacySelectionComponent";
import PaymentConfirmationComponent from "../components/PaymentConfirmationComponent";
import ProfileSuccessComponent from "../components/ProfileSuccessComponent";

const GettingStarted = () => {
  const [currentView, setCurrentView] = useState("form"); // form, privacy, payment, success
  const [formData, setFormData] = useState({
    // Form data from your original code
    // ...
  });
  const [privacyOption, setPrivacyOption] = useState(null);
  const [animationDirection, setAnimationDirection] = useState("forward");
  const navigate = useNavigate();

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
    setTimeout(() => navigate("/dashboard"), 3000); // Redirect after 3s
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

  // Animation variants
  const pageVariants = {
    enter: (direction) => ({
      x: direction === "forward" ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === "forward" ? -300 : 300,
      opacity: 0
    })
  };

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col p-6 relative overflow-hidden">
          {/* Progress bar */}
          <div className="w-full max-w-3xl mx-auto mb-6">
            <div className="h-2 bg-pink-100 rounded-full">
              <motion.div 
                className="h-full bg-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Profile</span>
              <span>Privacy</span>
              <span>Payment</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Main content container */}
          <div className="relative flex-grow flex justify-center items-center">
            <AnimatePresence custom={animationDirection} mode="wait">
              <motion.div
                key={currentView}
                custom={animationDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative overflow-hidden"
              >
                {/* Background decoration elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-pink-100 opacity-50"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-purple-100 opacity-50"></div>
                
                {/* Back button for privacy and payment views */}
                {(currentView === "privacy" || currentView === "payment") && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="absolute top-4 left-4 text-pink-500 hover:text-pink-700 transition-colors duration-200 z-10"
                  >
                    ← Back
                  </motion.button>
                )}

                {currentView === "form" && (
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-8"
                    >
                      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Find Your Perfect Match
                      </h1>
                      <p className="text-center text-gray-600">
                        Let our matchmaking experts help you find your soulmate
                      </p>
                    </motion.div>
                    <ProfileForm onSubmit={handleFormSubmit} initialData={formData} />
                  </div>
                )}

                {currentView === "privacy" && (
                  <div className="relative z-10 pt-6">
                    <PrivacySelectionComponent
                      onSelect={handlePrivacySelect}
                      selectedOption={privacyOption}
                    />
                  </div>
                )}

                {currentView === "payment" && (
                  <div className="relative z-10 pt-6">
                    <PaymentConfirmationComponent
                      option={privacyOption}
                      onConfirm={handlePaymentConfirm}
                      onCancel={handlePaymentCancel}
                    />
                  </div>
                )}

                {currentView === "success" && (
                  <div className="relative z-10">
                    <ProfileSuccessComponent />
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




