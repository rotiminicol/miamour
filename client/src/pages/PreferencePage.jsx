import { useState } from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { Heart, Bell, Save, MapPin, Calendar, Filter } from "lucide-react";

const PreferencePage = () => {
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [distance, setDistance] = useState(50);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showMe, setShowMe] = useState("Everyone");
  const [interests, setInterests] = useState([]);
  const [relationshipGoals, setRelationshipGoals] = useState("Marriage");
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

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

  const fadeIn = {
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div 
            className="bg-white py-8 px-6 shadow-lg sm:rounded-xl sm:px-8 border border-pink-100"
            whileHover={{ boxShadow: "0 8px 30px rgba(236, 72, 153, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-8">
              <Heart className="h-8 w-8 text-pink-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Match</h2>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Age Range */}
              <motion.div 
                className="bg-pink-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                  <label className="block text-sm font-medium text-gray-700">
                    Age Preference
                  </label>
                </div>
                
                <div className="mt-1 px-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>18</span>
                    <span>60+</span>
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute h-1 bg-pink-200 rounded-full w-full"></div>
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={ageRange[0]}
                      onChange={(e) => setAgeRange([parseInt(e.target.value), Math.max(parseInt(e.target.value) + 1, ageRange[1])])}
                      className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                      style={{
                        WebkitAppearance: "none",
                        height: "18px",
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
                        height: "18px",
                        background: "transparent",
                        zIndex: 3
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-pink-600">
                      {ageRange[0]} - {ageRange[1]} years
                    </div>
                    <motion.div 
                      className="text-xs bg-pink-100 px-2 py-1 rounded-full text-pink-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {ageRange[1] - ageRange[0]} year range
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Distance */}
              <motion.div 
                className="bg-blue-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <label className="block text-sm font-medium text-gray-700">
                    Distance (km)
                  </label>
                </div>
                <div className="mt-1 px-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>1 km</span>
                    <span>100+ km</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-blue-200 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm font-medium text-blue-600">
                      {distance} km
                    </div>
                    <motion.div 
                      className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-600"
                      whileTap={{ scale: 0.95 }}
                    >
                      {distance <= 20 ? "Nearby only" : distance <= 50 ? "Local area" : "Wide area"}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Relationship Goals */}
              <motion.div 
                className="bg-purple-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <Heart className="h-5 w-5 text-purple-500 mr-2" />
                  <label className="block text-sm font-medium text-gray-700">
                    Relationship Goals
                  </label>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {["Marriage", "Long-term", "Traditional", "Modern"].map((goal) => (
                    <motion.button
                      key={goal}
                      type="button"
                      onClick={() => setRelationshipGoals(goal)}
                      className={`py-2 px-4 rounded-full text-sm font-medium border ${
                        relationshipGoals === goal 
                          ? "bg-purple-100 border-purple-300 text-purple-700" 
                          : "bg-white border-gray-200 text-gray-500 hover:bg-purple-50"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {goal}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Show Me */}
              <motion.div 
                className="bg-green-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <Filter className="h-5 w-5 text-green-500 mr-2" />
                  <label className="block text-sm font-medium text-gray-700">
                    Show Me
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    id="showMe"
                    name="showMe"
                    value={showMe}
                    onChange={(e) => setShowMe(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
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
                className="bg-yellow-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <Heart className="h-5 w-5 text-yellow-600 mr-2" />
                  <label className="block text-sm font-medium text-gray-700">
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
                      className={`py-1 px-3 rounded-full text-xs font-medium border ${
                        interests.includes(interest) 
                          ? "bg-yellow-100 border-yellow-300 text-yellow-700" 
                          : interests.length >= 5
                            ? "bg-gray-100 border-gray-200 text-gray-400"
                            : "bg-white border-gray-200 text-gray-500 hover:bg-yellow-50"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {interests.length}/5 interests selected
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div 
                className="bg-indigo-50 p-4 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-indigo-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Match Notifications
                    </label>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full">
                    <input
                      type="checkbox"
                      className="opacity-0 w-0 h-0"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <motion.span
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                        notificationsEnabled ? 'bg-indigo-500' : 'bg-gray-300'
                      }`}
                      animate={{ backgroundColor: notificationsEnabled ? '#6366F1' : '#D1D5DB' }}
                    >
                      <motion.span
                        className="absolute h-4 w-4 bg-white rounded-full top-1"
                        animate={{ left: notificationsEnabled ? '26px' : '2px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {notificationsEnabled
                    ? "You'll receive notifications when someone likes your profile or you get a new match"
                    : "You won't receive match notifications"}
                </div>
              </motion.div>

              {/* Save Button */}
              <motion.button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Preferences
                  </>
                )}
              </motion.button>
              
              {/* Success Message */}
              <motion.div
                className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg shadow-lg flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: showSavedMessage ? 1 : 0,
                  y: showSavedMessage ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Preferences saved successfully!
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreferencePage;