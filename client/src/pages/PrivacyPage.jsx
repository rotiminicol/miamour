import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Eye, EyeOff, UserX } from "lucide-react";

const PrivacyPage = () => {
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Example blocked users for demonstration
  useEffect(() => {
    // Simulate loading blocked users
    setTimeout(() => {
      setBlockedUsers(["user123", "anonymous_user"]);
    }, 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-white py-8 px-6 shadow-lg sm:rounded-lg border border-pink-100 relative overflow-hidden"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full opacity-20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-100 rounded-tr-full opacity-20" />

            <motion.div 
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex items-center mb-8"
                variants={itemVariants}
              >
                <Shield className="text-pink-600 mr-3 h-7 w-7" />
                <h2 className="text-3xl font-bold text-gray-800">
                  <span className="text-pink-600">Privacy</span> Settings
                </h2>
              </motion.div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Profile Visibility */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-pink-500" />
                    Profile Visibility
                  </label>
                  <div className="mt-1 relative">
                    <motion.select
                      id="profileVisibility"
                      name="profileVisibility"
                      value={profileVisibility}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-gray-700 transition-colors duration-200"
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.2)" }}
                    >
                      <option value="Public">Public - Anyone can view your profile</option>
                      <option value="Private">Private - Only followers can view your profile</option>
                    </motion.select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ArrowRight className="h-4 w-4 text-pink-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {profileVisibility === "Public" ? 
                      "Your profile and posts are visible to everyone." : 
                      "Only people you approve can see your content."}
                  </p>
                </motion.div>

                {/* Blocked Users */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="blockedUsers" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <UserX className="h-4 w-4 mr-2 text-pink-500" />
                    Blocked Users
                  </label>
                  <div className="mt-1">
                    <motion.div 
                      className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                      initial={{ height: "auto" }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {blockedUsers.length > 0 ? (
                        <motion.ul className="space-y-3">
                          {blockedUsers.map((user, index) => (
                            <motion.li 
                              key={index} 
                              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              exit={{ opacity: 0, x: 20 }}
                              whileHover={{ backgroundColor: "rgba(252, 231, 243, 0.5)", x: 5 }}
                            >
                              <span className="font-medium text-gray-700">{user}</span>
                              <motion.button
                                type="button"
                                onClick={() => setBlockedUsers(blockedUsers.filter((u) => u !== user))}
                                className="text-sm text-pink-600 hover:text-pink-800 bg-pink-50 px-3 py-1 rounded-full flex items-center"
                                whileHover={{ scale: 1.05, backgroundColor: "#FCE7F3" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Unblock
                              </motion.button>
                            </motion.li>
                          ))}
                        </motion.ul>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-6 text-center"
                        >
                          <EyeOff className="h-10 w-10 text-pink-300 mb-2" />
                          <p className="text-gray-500">No blocked users at the moment.</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Save Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    whileHover={{ backgroundColor: "#DB2777", scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Save Privacy Settings
                  </motion.button>
                </motion.div>
              </form>

              {/* Success message */}
              <motion.div
                className="fixed bottom-10 inset-x-0 flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showSuccess ? 1 : 0, y: showSuccess ? 0 : 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-green-50 text-green-800 px-6 py-3 rounded-full shadow-lg border border-green-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Settings saved successfully!
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;