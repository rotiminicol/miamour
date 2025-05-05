import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Check, Clock, X, MessageCircle, User, Star, Zap, Calendar, Users, Target, Award } from 'lucide-react';

const MatchTrack = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [compatibilityScore, setCompatibilityScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');
  const controls = useAnimation();
  const progressRef = useRef(null);

  // Mock profiles data
  const profiles = [
    {
      id: 1,
      name: "Alex",
      age: 28,
      location: "New York",
      bio: "Adventure seeker and coffee enthusiast. Looking for someone to share life's moments with.",
      interests: ["Hiking", "Photography", "Reading"],
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      compatibility: 92
    },
    {
      id: 2,
      name: "Sophia",
      age: 26,
      location: "Chicago",
      bio: "Creative soul who loves art galleries and weekend getaways. Seeking meaningful connections.",
      interests: ["Painting", "Travel", "Yoga"],
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      compatibility: 88
    },
    {
      id: 3,
      name: "James",
      age: 30,
      location: "Los Angeles",
      bio: "Tech entrepreneur by day, jazz lover by night. Want to find someone who shares my passions.",
      interests: ["Technology", "Music", "Fitness"],
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      compatibility: 85
    }
  ];

  // Simulate matching process
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsMatched(true);
          setShowCelebration(true);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Show profiles when matching is in progress
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const profileTimer = setInterval(() => {
        const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
        setCurrentProfile(randomProfile);
        setCompatibilityScore(Math.floor(Math.random() * 20) + 75);
        setShowProfile(true);
        
        setTimeout(() => {
          setShowProfile(false);
        }, 2000);
      }, 5000);

      return () => clearInterval(profileTimer);
    }
  }, [progress]);

  // Celebration animation
  useEffect(() => {
    if (showCelebration) {
      controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5 }
      });
      
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showCelebration, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.9,
      transition: { 
        duration: 0.3 
      } 
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`, 
      transition: { 
        duration: 1,
        ease: "easeOut"
      } 
    }
  };

  const confettiVariants = {
    initial: { 
      y: -10,
      opacity: 0 
    },
    animate: (i) => ({
      y: [0, -20, 0],
      opacity: [1, 0],
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    })
  };

  const renderConfetti = () => {
    return Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        custom={i}
        variants={confettiVariants}
        initial="initial"
        animate="animate"
        className={`absolute w-2 h-2 rounded-full ${
          i % 3 === 0 ? 'bg-pink-500' : 
          i % 3 === 1 ? 'bg-purple-500' : 'bg-yellow-400'
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));
  };

  const tabs = [
    { id: 'progress', label: 'Matching Progress', icon: <Target size={18} /> },
    { id: 'timeline', label: 'Timeline', icon: <Calendar size={18} /> },
    { id: 'community', label: 'Community', icon: <Users size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full bg-pink-100/50 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-purple-100/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {/* Celebration overlay */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-purple-400/10 z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {renderConfetti()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-20 h-20 rounded-full bg-white"></div>
              <div className="absolute bottom-0 right-1/3 w-32 h-32 rounded-full bg-white"></div>
            </div>
            
            <motion.div
              animate={controls}
              className="relative z-10"
            >
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isMatched ? "Match Found! 🎉" : "Finding Your Perfect Match"}
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
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="border-b border-pink-100">
            <div className="flex space-x-1 p-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:bg-pink-50/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'progress' && (
              <div className="space-y-8">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-pink-600">
                      {isMatched ? "Completed" : "Matching Progress"}
                    </span>
                    <span className="font-bold text-pink-600">{Math.min(progress, 100)}%</span>
                  </div>
                  <div className="h-3 bg-pink-100 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full relative"
                      variants={progressBarVariants}
                      initial="initial"
                      animate="animate"
                      ref={progressRef}
                    >
                      <motion.div 
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-pink-600"
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: ["0 0 0 0 rgba(236, 72, 153, 0.3)", "0 0 0 8px rgba(236, 72, 153, 0)"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                    </motion.div>
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
                    <motion.div 
                      className="flex items-center space-x-3 bg-green-50 text-green-600 px-6 py-3 rounded-full shadow-sm"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check size={24} className="text-green-500" />
                      </motion.div>
                      <span className="font-semibold text-lg">Compatibility Match Found!</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex items-center space-x-3 bg-blue-50 text-blue-600 px-6 py-3 rounded-full shadow-sm"
                      animate={{
                        x: [0, 2, -2, 0],
                        transition: { 
                          duration: 2,
                          repeat: Infinity 
                        }
                      }}
                    >
                      <Clock size={24} className="text-blue-500" />
                      <span className="font-semibold text-lg">Searching for matches...</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Profile Display Area */}
                <div className="relative h-96 mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center border border-pink-100">
                  {isMatched ? (
                    <motion.div
                      className="text-center p-6 w-full max-w-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <div className="relative mx-auto w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg">
                        <img 
                          src={profiles[1].image} 
                          alt="Match" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                          <motion.div 
                            className="absolute -top-2 -right-2 bg-pink-500 rounded-full p-2 shadow-md"
                            animate={{
                              rotate: [0, 20, -20, 0],
                              transition: { duration: 1, repeat: Infinity }
                            }}
                          >
                            <Heart 
                              size={20} 
                              className="text-white"
                              fill="currentColor"
                            />
                          </motion.div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-pink-600 mb-1">{profiles[1].name}, {profiles[1].age}</h3>
                      <p className="text-pink-500 mb-4">{profiles[1].location}</p>
                      
                      {/* Compatibility meter */}
                      <div className="w-full bg-pink-100 rounded-full h-2.5 mb-4 mx-auto max-w-xs">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full" 
                          style={{ width: `${profiles[1].compatibility}%` }}
                        ></div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span className="font-bold text-green-600">
                            {profiles[1].compatibility}% Match
                          </span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">{profiles[1].bio}</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {profiles[1].interests.map((interest, i) => (
                          <motion.span 
                            key={i}
                            className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            {interest}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex justify-center space-x-4">
                        <motion.button
                          className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors flex items-center space-x-2 shadow-lg shadow-pink-200"
                          onClick={() => navigate('/chat')}
                          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle size={18} />
                          <span>Start Chatting</span>
                        </motion.button>
                        <motion.button
                          className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors flex items-center space-x-2"
                          onClick={() => navigate('/profile')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <User size={18} />
                          <span>View Profile</span>
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
                          >
                            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center border-2 border-pink-200 relative">
                              <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md border border-pink-100">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
                                  {compatibilityScore}%
                                </div>
                              </div>
                              <div className="relative mx-auto w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-pink-200 shadow-md">
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
                                  <motion.span 
                                    key={i}
                                    className="bg-pink-50 text-pink-600 px-2 py-1 rounded-full text-xs"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {interest}
                                  </motion.span>
                                ))}
                              </div>
                              <div className="mt-4 flex justify-center space-x-3">
                                <motion.button 
                                  className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <X size={18} />
                                </motion.button>
                                <motion.button 
                                  className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Heart size={18} />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {!showProfile && (
                        <motion.div
                          className="text-center p-6 max-w-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div 
                            className="flex justify-center mb-6"
                            animate={{
                              rotate: [0, 5, -5, 0],
                              transition: { 
                                duration: 2,
                                repeat: Infinity 
                              }
                            }}
                          >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shadow-inner">
                              <Sparkles size={40} className="text-pink-400" />
                            </div>
                          </motion.div>
                          <motion.h3 
                            className="text-xl font-semibold text-pink-600 mb-2"
                            animate={{
                              opacity: [0.8, 1, 0.8],
                              transition: { duration: 2, repeat: Infinity }
                            }}
                          >
                            Scanning Potential Matches
                          </motion.h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Analyzing compatibility based on your profile, preferences, and behavior patterns.
                          </p>
                          
                          <div className="mt-8 grid grid-cols-3 gap-4 max-w-xs mx-auto">
                            {["Personality", "Interests", "Values"].map((item, i) => (
                              <motion.div 
                                key={i}
                                className="bg-white p-2 rounded-lg shadow-sm text-xs"
                                animate={{
                                  y: [0, -5, 0],
                                  transition: {
                                    duration: 2,
                                    delay: i * 0.3,
                                    repeat: Infinity
                                  }
                                }}
                              >
                                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                  <Star size={14} className="text-pink-500" />
                                </div>
                                {item}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                {/* Additional Info */}
                {!isMatched && (
                  <motion.div
                    className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 text-center border border-pink-100 shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Zap size={18} className="text-pink-500" />
                      <h4 className="font-medium text-pink-600">
                        Estimated time remaining: {Math.floor((100 - progress) / 10)} minutes
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The more complete your profile, the faster we can find your perfect match.
                    </p>
                    
                    <motion.div 
                      className="mt-4 h-1 bg-pink-100 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <div 
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                        style={{ width: `${Math.random() * 30 + 40}%` }}
                      ></div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Matching Timeline</h3>
                  <p className="text-gray-600">Our matching process typically takes 5-7 days to find your perfect match</p>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-pink-200"></div>
                  
                  {[
                    { day: 1, title: "Profile Analysis", description: "We analyze your profile and preferences" },
                    { day: 2, title: "Initial Screening", description: "Identifying potential matches" },
                    { day: 3, title: "Compatibility Check", description: "Evaluating compatibility factors" },
                    { day: 4, title: "Deep Analysis", description: "Detailed personality matching" },
                    { day: 5, title: "Final Selection", description: "Selecting the best matches" },
                    { day: 6, title: "Verification", description: "Verifying match authenticity" },
                    { day: 7, title: "Match Ready", description: "Your match will be ready!" }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative mb-8"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className="w-1/2 px-4">
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-100">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-pink-600 font-semibold">{step.day}</span>
                              </div>
                              <h4 className="font-semibold text-gray-800">{step.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {index + 1}
                        </div>
                        <div className="w-1/2"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'community' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Community Insights</h3>
                  <p className="text-gray-600">See what others are saying about their matching experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "Sarah", location: "New York", text: "Found my perfect match after 6 days! Worth the wait!" },
                    { name: "Michael", location: "London", text: "The matching process was thorough and professional." },
                    { name: "Emma", location: "Paris", text: "Great experience! The algorithm really works." },
                    { name: "David", location: "Tokyo", text: "Patiently waited and found someone amazing!" }
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-pink-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-600 font-semibold">{testimonial.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{testimonial.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Achievements</h3>
                  <p className="text-gray-600">Track your progress and earn rewards</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Profile Complete", progress: 100, icon: <User size={24} /> },
                    { title: "Preferences Set", progress: 100, icon: <Heart size={24} /> },
                    { title: "Matching Progress", progress: Math.min(progress, 100), icon: <Target size={24} /> }
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-pink-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                          {achievement.icon}
                        </div>
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      </div>
                      <div className="w-full bg-pink-100 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <p className="text-right text-sm text-gray-500 mt-2">{achievement.progress}%</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
            {isMatched ? (
              <div className="space-y-4">
                <motion.h3 
                  className="text-xl font-semibold text-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Ready to connect?
                </motion.h3>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors flex items-center space-x-2 shadow-lg shadow-pink-200"
                    onClick={() => navigate('/chat')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} />
                    <span>Send First Message</span>
                  </motion.button>
                  <motion.button
                    className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors flex items-center space-x-2"
                    onClick={() => navigate('/dashboard')}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Back to Dashboard</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Want to improve your matches?</h3>
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-pink-200"
                    onClick={() => navigate('/profile')}
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User size={18} />
                    <span>Complete My Profile</span>
                  </motion.button>
                  <motion.button
                    className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
                    onClick={() => navigate('/preferences')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star size={18} />
                    <span>Adjust Preferences</span>
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