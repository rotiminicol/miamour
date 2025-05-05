import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Eye, EyeOff, UserX, Sparkles } from "lucide-react";

const PrivacyPage = () => {
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Header />

      <div className="flex-grow flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm py-8 px-6 shadow-2xl sm:rounded-2xl sm:px-8 border border-pink-100"
            whileHover={{ boxShadow: "0 8px 30px rgba(236, 72, 153, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex items-center justify-center mb-8"
                variants={itemVariants}
              >
                <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Privacy Settings
                </h2>
                <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
              </motion.div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Profile Visibility */}
                <motion.div 
                  className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)" }}
                  onHoverStart={() => setActiveSection('visibility')}
                  onHoverEnd={() => setActiveSection(null)}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                      <Eye className="h-5 w-5 text-pink-500" />
                    </div>
                    <label className="block text-lg font-semibold text-gray-800">
                      Profile Visibility
                    </label>
                  </div>
                  <div className="mt-1 relative">
                    <motion.select
                      id="profileVisibility"
                      name="profileVisibility"
                      value={profileVisibility}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700 bg-white transition-all duration-300"
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.2)" }}
                    >
                      <option value="Public">Public - Anyone can view your profile</option>
                      <option value="Private">Private - Only followers can view your profile</option>
                    </motion.select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ArrowRight className="h-4 w-4 text-pink-500" />
                    </div>
                  </div>
                  <motion.p 
                    className="mt-3 text-sm text-gray-600"
                    animate={{ opacity: activeSection === 'visibility' ? 1 : 0.7 }}
                  >
                    {profileVisibility === "Public" ? 
                      "Your profile and posts are visible to everyone." : 
                      "Only people you approve can see your content."}
                  </motion.p>
                </motion.div>

                {/* Blocked Users */}
                <motion.div 
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(168, 85, 247, 0.1)" }}
                  onHoverStart={() => setActiveSection('blocked')}
                  onHoverEnd={() => setActiveSection(null)}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                      <UserX className="h-5 w-5 text-purple-500" />
                    </div>
                    <label className="block text-lg font-semibold text-gray-800">
                      Blocked Users
                    </label>
                  </div>
                  <div className="mt-1">
                    <motion.div 
                      className="bg-white/50 backdrop-blur-sm rounded-xl border border-purple-100 p-4"
                      initial={{ height: "auto" }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {blockedUsers.length > 0 ? (
                        <motion.ul className="space-y-3">
                          {blockedUsers.map((user, index) => (
                            <motion.li 
                              key={index} 
                              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-purple-100"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              exit={{ opacity: 0, x: 20 }}
                              whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(168, 85, 247, 0.1)" }}
                            >
                              <span className="font-medium text-gray-700">{user}</span>
                              <motion.button
                                type="button"
                                onClick={() => setBlockedUsers(blockedUsers.filter((u) => u !== user))}
                                className="text-sm text-purple-600 hover:text-purple-800 bg-purple-50 px-4 py-2 rounded-xl flex items-center transition-all duration-300"
                                whileHover={{ scale: 1.05, backgroundColor: "#F3E8FF" }}
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
                          className="flex flex-col items-center justify-center py-8 text-center"
                        >
                          <EyeOff className="h-12 w-12 text-purple-300 mb-3" />
                          <p className="text-gray-500">No blocked users at the moment.</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Save Button */}
                <motion.button
                  type="submit"
                  className="w-full flex justify-center items-center py-4 px-6 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Shield className="w-6 h-6 mr-3" />
                  Save Privacy Settings
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed bottom-6 right-6 bg-white px-6 py-4 rounded-xl shadow-2xl border border-green-100 flex items-center"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-green-700 font-medium">Settings saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivacyPage;