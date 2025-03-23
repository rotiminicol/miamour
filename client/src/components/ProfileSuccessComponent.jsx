import  { useState, useEffect } from "react";
import { Check, Clock, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfileSuccessComponent = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl mb-6 text-center"
        variants={itemVariants}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-500" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Your profile has been created successfully and is ready for review.
        </p>
        <p className="text-gray-600 mb-8">
          Our matchmaking experts will begin reviewing your profile within:
        </p>
      </motion.div>

      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center mb-4">
          <Clock className="text-pink-500 mr-2" size={24} />
          <h3 className="text-xl font-semibold text-gray-800">Time Remaining</h3>
        </div>
        <div className="bg-gray-50 py-4 px-6 rounded-xl flex items-center justify-center">
          <p className="text-3xl font-mono font-bold text-gray-800">
            {formatTime(timeLeft)}
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => navigate("/payment")}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Make Payment for Your Plan
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSuccessComponent;