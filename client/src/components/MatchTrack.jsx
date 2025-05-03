import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles,  Check, Clock } from 'lucide-react';

const MatchTrack = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  // Mock profiles data
  const profiles = [
    {
      id: 1,
      name: "Alex",
      age: 28,
      location: "New York",
      bio: "Adventure seeker and coffee enthusiast. Looking for someone to share life's moments with.",
      interests: ["Hiking", "Photography", "Reading"],
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sophia",
      age: 26,
      location: "Chicago",
      bio: "Creative soul who loves art galleries and weekend getaways. Seeking meaningful connections.",
      interests: ["Painting", "Travel", "Yoga"],
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "James",
      age: 30,
      location: "Los Angeles",
      bio: "Tech entrepreneur by day, jazz lover by night. Want to find someone who shares my passions.",
      interests: ["Technology", "Music", "Fitness"],
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  // Simulate matching process
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsMatched(true);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Show profiles when matching is in progress
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const profileTimer = setInterval(() => {
        setCurrentProfile(profiles[Math.floor(Math.random() * profiles.length)]);
        setShowProfile(true);
        
        setTimeout(() => {
          setShowProfile(false);
        }, 2000);
      }, 3000);

      return () => clearInterval(profileTimer);
    }
  }, [progress]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9 }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: `${progress}%`, transition: { duration: 1 } }
  };

  return (
    <div className="min-h-screen bg-pink-50/30">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-8 text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isMatched ? "Match Found!" : "Finding Your Perfect Match"}
            </motion.h1>
            <motion.p 
              className="text-pink-100 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isMatched ? 
                "We've found someone special for you!" : 
                "Our algorithm is searching through thousands of profiles..."}
            </motion.p>
          </div>

          {/* Progress Section */}
          <div className="p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-pink-600">
                  {isMatched ? "Completed" : "Matching Progress"}
                </span>
                <span className="font-bold text-pink-600">{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-4 bg-pink-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                  variants={progressBarVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>

            {/* Status Indicator */}
            <motion.div 
              className="flex items-center justify-center mb-8 p-4 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isMatched ? (
                <div className="flex items-center space-x-3 bg-green-50 text-green-600 px-6 py-3 rounded-full">
                  <Check size={24} className="text-green-500" />
                  <span className="font-semibold text-lg">Compatibility Match Found!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3 bg-blue-50 text-blue-600 px-6 py-3 rounded-full">
                  <Clock size={24} className="text-blue-500" />
                  <span className="font-semibold text-lg">Searching for matches...</span>
                </div>
              )}
            </motion.div>

            {/* Profile Display Area */}
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden bg-pink-50 flex items-center justify-center">
              {isMatched ? (
                <motion.div
                  className="text-center p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mx-auto w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg">
                    <img 
                      src={profiles[1].image} 
                      alt="Match" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                      <div className="absolute -top-2 -right-2 bg-pink-500 rounded-full p-2 shadow-md">
                        <Heart size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-pink-600 mb-1">{profiles[1].name}, {profiles[1].age}</h3>
                  <p className="text-pink-500 mb-4">{profiles[1].location}</p>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">{profiles[1].bio}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {profiles[1].interests.map((interest, i) => (
                      <span key={i} className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors"
                      onClick={() => navigate('/chat')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Chatting
                    </motion.button>
                    <motion.button
                      className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors"
                      onClick={() => navigate('/profile')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence>
                    {showProfile && currentProfile && (
                      <motion.div
                        key={currentProfile.id}
                        className="absolute inset-0 flex items-center justify-center p-6"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
                          <div className="relative mx-auto w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-pink-200">
                            <img 
                              src={currentProfile.image} 
                              alt="Potential match" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {currentProfile.name}, {currentProfile.age}
                          </h3>
                          <p className="text-pink-500 text-sm mb-3">{currentProfile.location}</p>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{currentProfile.bio}</p>
                          <div className="flex justify-center space-x-2">
                            {currentProfile.interests.slice(0, 2).map((interest, i) => (
                              <span key={i} className="bg-pink-50 text-pink-600 px-2 py-1 rounded-full text-xs">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!showProfile && (
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center">
                          <Sparkles size={40} className="text-pink-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-pink-600 mb-2">
                        Scanning Potential Matches
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Were analyzing compatibility based on your profile, preferences, and behavior patterns.
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Additional Info */}
            {!isMatched && (
              <motion.div
                className="bg-pink-50 rounded-xl p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="font-medium text-pink-600 mb-2">
                  Estimated time remaining: {Math.floor((100 - progress) / 10)} minutes
                </h4>
                <p className="text-gray-600 text-sm">
                  The more complete your profile, the faster we can find your perfect match.
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
            {isMatched ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Ready to connect?</h3>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors"
                    onClick={() => navigate('/chat')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send First Message
                  </motion.button>
                  <motion.button
                    className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors"
                    onClick={() => navigate('/dashboard')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Dashboard
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Want to improve your matches?</h3>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors"
                    onClick={() => navigate('/profile')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Complete My Profile
                  </motion.button>
                  <motion.button
                    className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors"
                    onClick={() => navigate('/preferences')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Adjust Preferences
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MatchTrack;