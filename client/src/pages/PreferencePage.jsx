import { useState } from "react";
import { Header } from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bell, Save, MapPin, Calendar, Filter, Sparkles, ArrowRight } from "lucide-react";

const PreferencePage = () => {
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [distance, setDistance] = useState(50);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showMe, setShowMe] = useState("Everyone");
  const [interests, setInterests] = useState([]);
  const [relationshipGoals, setRelationshipGoals] = useState("Marriage");
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const commonInterests = [
    "Travel", "Cooking", "Reading", "Spirituality", "Family", 
    "Fitness", "Outdoors", "Music", "Movies", "Art",
    "Career", "Education", "Volunteering"
  ];

  const handleInterestToggle = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMessage(true);
      
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);
    }, 1500);
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
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
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Find Your Perfect Match
              </h2>
              <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Age Range */}
              <motion.div 
                className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100"
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)" }}
                onHoverStart={() => setActiveSection('age')}
                onHoverEnd={() => setActiveSection(null)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                    <Calendar className="h-5 w-5 text-pink-500" />
                  </div>
                  <label className="block text-lg font-semibold text-gray-800">
                    Age Preference
                  </label>
                </div>
                
                <div className="mt-1 px-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>18</span>
                    <span>60+</span>
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute h-2 bg-pink-200 rounded-full w-full"></div>
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={ageRange[0]}
                      onChange={(e) => setAgeRange([parseInt(e.target.value), Math.max(parseInt(e.target.value) + 1, ageRange[1])])}
                      className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                      style={{
                        WebkitAppearance: "none",
                        height: "24px",
                        background: "transparent",
                        zIndex: 2
                      }}
                    />
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={ageRange[1]}
                      onChange={(e) => setAgeRange([Math.min(ageRange[0], parseInt(e.target.value) - 1), parseInt(e.target.value)])}
                      className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                      style={{
                        WebkitAppearance: "none",
                        height: "24px",
                        background: "transparent",
                        zIndex: 3
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <motion.div 
                      className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                      animate={{ scale: activeSection === 'age' ? 1.05 : 1 }}
                    >
                      {ageRange[0]} - {ageRange[1]} years
                    </motion.div>
                    <motion.div 
                      className="text-sm bg-white px-3 py-1 rounded-full text-pink-600 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {ageRange[1] - ageRange[0]} year range
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Distance */}
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)" }}
                onHoverStart={() => setActiveSection('distance')}
                onHoverEnd={() => setActiveSection(null)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <label className="block text-lg font-semibold text-gray-800">
                    Distance (km)
                  </label>
                </div>
                <div className="mt-1 px-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>1 km</span>
                    <span>100+ km</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${distance}%, #E5E7EB ${distance}%, #E5E7EB 100%)`
                    }}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <motion.div 
                      className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                      animate={{ scale: activeSection === 'distance' ? 1.05 : 1 }}
                    >
                      {distance} km
                    </motion.div>
                    <motion.div 
                      className="text-sm bg-white px-3 py-1 rounded-full text-blue-600 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {distance <= 20 ? "Nearby only" : distance <= 50 ? "Local area" : "Wide area"}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Relationship Goals */}
              <motion.div 
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100"
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(168, 85, 247, 0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                    <Heart className="h-5 w-5 text-purple-500" />
                  </div>
                  <label className="block text-lg font-semibold text-gray-800">
                    Relationship Goals
                  </label>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-3">
                  {["Marriage", "Long-term", "Traditional", "Modern"].map((goal) => (
                    <motion.button
                      key={goal}
                      type="button"
                      onClick={() => setRelationshipGoals(goal)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-300 ${
                        relationshipGoals === goal 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg" 
                          : "bg-white border-gray-200 text-gray-600 hover:bg-purple-50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {goal}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Show Me */}
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100"
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(16, 185, 129, 0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                    <Filter className="h-5 w-5 text-green-500" />
                  </div>
                  <label className="block text-lg font-semibold text-gray-800">
                    Show Me
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    id="showMe"
                    name="showMe"
                    value={showMe}
                    onChange={(e) => setShowMe(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 bg-white"
                  >
                    <option value="Everyone">Everyone</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>
              </motion.div>

              {/* Interests */}
              <motion.div 
                className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-100"
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(245, 158, 11, 0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                    <Heart className="h-5 w-5 text-yellow-500" />
                  </div>
                  <label className="block text-lg font-semibold text-gray-800">
                    Interests (Select up to 5)
                  </label>
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {commonInterests.map((interest) => (
                    <motion.button
                      key={interest}
                      type="button"
                      disabled={!interests.includes(interest) && interests.length >= 5}
                      onClick={() => handleInterestToggle(interest)}
                      className={`py-2 px-4 rounded-xl text-sm font-medium border transition-all duration-300 ${
                        interests.includes(interest) 
                          ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-transparent shadow-lg" 
                          : interests.length >= 5
                            ? "bg-gray-100 border-gray-200 text-gray-400"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-yellow-50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
                <div className="mt-3 text-sm text-gray-500 flex items-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-yellow-400 mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {interests.length}/5 interests selected
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div 
                className="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-xl border border-indigo-100"
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                      <Bell className="h-5 w-5 text-indigo-500" />
                    </div>
                    <label className="block text-lg font-semibold text-gray-800">
                      Match Notifications
                    </label>
                  </div>
                  <motion.div 
                    className="relative inline-block w-14 h-7 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                        notificationsEnabled ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-gray-300'
                      }`}
                      animate={{ backgroundColor: notificationsEnabled ? '#6366F1' : '#D1D5DB' }}
                    />
                    <motion.div
                      className="absolute h-5 w-5 bg-white rounded-full top-1"
                      animate={{ left: notificationsEnabled ? '28px' : '2px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.div>
                </div>
                <motion.div 
                  className="mt-3 text-sm text-gray-600"
                  animate={{ opacity: notificationsEnabled ? 1 : 0.5 }}
                >
                  {notificationsEnabled
                    ? "You'll receive notifications when someone likes your profile or you get a new match"
                    : "You won't receive match notifications"}
                </motion.div>
              </motion.div>

              {/* Save Button */}
              <motion.button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-6 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mr-3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6 mr-3" />
                    Save Preferences
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSavedMessage && (
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
            <span className="text-green-700 font-medium">Preferences saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreferencePage;