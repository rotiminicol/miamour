import { Check, CreditCard, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfileSuccessComponent = () => {
  const navigate = useNavigate();

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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Complete!</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Your profile has been created successfully.
        </p>
        <p className="text-gray-600 mb-8">
          You can now proceed to payment or return to your dashboard.
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-col space-y-4"
        variants={itemVariants}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => navigate("/payment")}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Make Payment for Your Plan
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Dashboard
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSuccessComponent;