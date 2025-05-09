
import { Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProfileSuccessComponent() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [activating, setActivating] = useState(false);

  // Trigger checkmark animation on mount
  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });
  }, [controls]);

  // Navigate to dashboard after 5 minutes (300,000ms), matching GettingStarted
  useEffect(() => {
    const timer = setTimeout(() => {
      handleContinue();
    }, 300000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  const handleContinue = () => {
    navigate("/");
  }
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
      {/* Animated floating particles (from GettingStarted) */}
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
            className={`absolute rounded-full ${
              i % 3 === 0 ? "bg-pink-300" : i % 2 === 0 ? "bg-purple-300" : "bg-blue-300"
            } ${i % 4 === 0 ? "w-3 h-3" : "w-2 h-2"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </AnimatePresence>

      {/* Success message card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl shadow-lg mb-12 text-center border border-gray-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="relative z-10">
          <motion.div
            animate={controls}
            className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Check className="text-white" size={48} />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Profile Complete!</h2>
          <p className="text-gray-600 mb-6 text-xl">
            Your profile has been created successfully.
          </p>
          <p className="text-gray-600 mb-2 text-lg font-medium">
            We are now finding your perfect match!
          </p>
          <div className="flex justify-center">
            <motion.div
              animate={{
                x: [-5, 5, -5],
                transition: { repeat: Infinity, duration: 2 }
              }}
            >
              <ChevronRight className="text-gray-400 w-8 h-8 rotate-90" />
            </motion.div>
          </div>
          {/* Continue to Dashboard Button */}
          <button
            onClick={handleContinue}
            className="mt-6 px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition disabled:opacity-60"
            disabled={activating}
          >
            {activating ? "Activating..." : "Continue to Dashboard"}
          </button>
        </div>
      </motion.div>

      {/* Confetti animation (from GettingStarted success view) */}
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
              i % 5 === 0
                ? "bg-yellow-400"
                : i % 4 === 0
                ? "bg-pink-400"
                : i % 3 === 0
                ? "bg-blue-400"
                : "bg-green-400"
            } rounded-sm`}
            style={{
              left: `${50 + (Math.random() * 20 - 10)}%`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ProfileSuccessComponent;
