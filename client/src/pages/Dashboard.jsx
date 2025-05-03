  import { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Header } from '../components/Header';
  import Sidebar from "../components/Sidebar";
  import { useNavigate } from 'react-router-dom';
  import { Heart, MessageCircle, Calendar, CreditCard, FileText, User, Settings, HelpCircle, Users,  Sparkles } from 'lucide-react';

  const Homepage = () => {
    const navigate = useNavigate();
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [formCompleted, setFormCompleted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Categories data
    const categories = {
      services: [
        { icon: <Heart size={18} className="text-pink-500" />, text: 'Marriage Counseling', to: '/marriage-counseling' },
        { icon: <Users size={18} className="text-pink-400" />, text: 'Relationship Therapy', to: '/relationship-therapy' },
        { icon: <Sparkles size={18} className="text-pink-300" />, text: 'Ceremony Planning', to: '/ceremony-planning' },
        { icon: <MessageCircle size={18} className="text-pink-400" />, text: 'MiAmour App', to: '/dating-app' },
        { icon: <Calendar size={18} className="text-pink-300" />, text: 'Schedule', to: '/schedule' },
      ],
      billing: [
        { icon: <CreditCard size={18} className="text-pink-500" />, text: 'Payment Methods', to: '/billing-process' },
        { icon: <FileText size={18} className="text-pink-400" />, text: 'Invoices', to: '/invoices' },
      ],
      settings: [
        { icon: <User size={18} className="text-pink-500" />, text: 'My Account', to: '/profile' },
        { icon: <Settings size={18} className="text-pink-400" />, text: 'Preferences', to: '/preference' },
      ],
      support: [
        { icon: <HelpCircle size={18} className="text-pink-500" />, text: 'Get Help', to: '/help-support' },
        { icon: <HelpCircle size={18} className="text-pink-400" />, text: 'FAQs', to: '/faqs' },
      ]
    };

    // Check form completion status from local storage on mount
    useEffect(() => {
      const completed = localStorage.getItem("formCompleted") === "true";
      setFormCompleted(completed);
    }, []);

    // Single hero content
    const heroContent = {
      title: "Find Your Soulmate",
      subtitle: "Connect with someone who completes you.",
      bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" // Beach with romantic pink tones
    };

    // Video advertisements data
    const videoAdvertisements = [
      {
        id: 1,
        title: "Romantic Getaways",
        description: "Exclusive deals for couples planning their honeymoon",
        videoUrl: "https://example.com/videos/honeymoon.mp4",
        thumbnail: "🌴"
      },
      {
        id: 2,
        title: "Diamond Rings",
        description: "Curated selection from top jewelers",
        videoUrl: "https://example.com/videos/jewelry.mp4",
        thumbnail: "💍"
      },
      {
        id: 3,
        title: "Date Night Ideas",
        description: "Romantic restaurant suggestions",
        videoUrl: "https://example.com/videos/dining.mp4",
        thumbnail: "🍷"
      }
    ];

    // Auto-advance video advertisements
    useEffect(() => {
      let interval;
      if (isVideoPlaying) {
        interval = setInterval(() => {
          setCurrentAdIndex((prev) => (prev + 1) % videoAdvertisements.length);
        }, 8000);
      }
      return () => clearInterval(interval);
    }, [isVideoPlaying]);

    // Handle "Awaiting Match" button click
    const handleAwaitingMatchClick = () => {
      setShowPopup(true);
    };

    // Close popup
    const handleClosePopup = () => {
      setShowPopup(false);
    };

    // Animation variants
    const popupVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", transition: { duration: 0.3 } }
    };

    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          <Header />
          <main className="flex-grow overflow-y-auto bg-pink-50/30">
            <style>
              {`
                .parallax-bg {
                  background-attachment: fixed;
                  background-size: cover;
                  background-position: center;
                }
                @media (max-width: 768px) {
                  .parallax-bg {
                    background-attachment: scroll;
                  }
                }
                .parallax-header {
                  transform: translateY(0);
                  transition: transform 0.3s ease;
                }
                .parallax-section.scrolled .parallax-header {
                  transform: translateY(-20px);
                }
                .gradient-text {
                  background: linear-gradient(to right, #FF6B6B, #FF8E53);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
              `}
            </style>

            {/* Hero Section with Single Image */}
            <section className="relative h-[48rem] overflow-hidden">
              <motion.div
                className="absolute inset-0 parallax-bg"
                style={{ backgroundImage: `url(${heroContent.bgImage})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-pink-500/20" />
                <div className="container mx-auto px-6 h-full flex items-center">
                  <motion.div 
                    className="text-white max-w-3xl z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight gradient-text">
                      {heroContent.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
                      {heroContent.subtitle}
                    </p>
                    <div className="flex space-x-6">
                      {formCompleted ? (
                        <motion.button
                          className="bg-pink-500 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
                          onClick={handleAwaitingMatchClick}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Awaiting Match
                        </motion.button>
                      ) : (
                        <motion.button
                          className="bg-pink-500 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
                          onClick={() => navigate('/getting-started')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Matching
                        </motion.button>
                      )}
                      <motion.button
                        className="bg-white text-pink-500 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-50 transition-colors"
                        onClick={() => navigate('/learn-more')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Popup */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl border border-pink-100"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-pink-600 mb-4">
                      Ready to Find Your Match?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                      Our advanced algorithm is working to find your perfect partner. Track your match progress in real-time!
                    </p>
                    <div className="flex justify-center space-x-4">
                      <motion.button
                        className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors"
                        onClick={() => {
                          handleClosePopup();
                          navigate('/match-track');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Track My Match
                      </motion.button>
                      <motion.button
                        className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full border border-pink-300 hover:bg-pink-50 transition-colors"
                        onClick={handleClosePopup}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Maybe Later
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

            {/* Services Section */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <motion.h2 
                  className="text-4xl font-bold text-center mb-16 text-pink-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Discover Our Services
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {Object.entries(categories).flatMap(([category, items]) =>
                    items.map((item, index) => (
                      <motion.div
                        key={`${category}-${index}`}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:bg-pink-50/50 transition-all cursor-pointer border border-pink-100"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        onClick={() => navigate(item.to)}
                      >
                        <div className="flex items-center space-x-4">
                          {item.icon}
                          <h3 className="text-xl font-semibold text-gray-800">{item.text}</h3>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Featured Partners Section */}
            <section className="py-20 bg-pink-50">
              <div className="container mx-auto px-6">
                <motion.h2 
                  className="text-4xl font-bold text-center mb-16 text-pink-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Featured Partners
                </motion.h2>
                <motion.div 
                  className="relative bg-gradient-to-r from-pink-600 to-pink-400 rounded-2xl overflow-hidden h-96"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={videoAdvertisements[currentAdIndex].id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col items-center justify-center"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-9xl">{videoAdvertisements[currentAdIndex].thumbnail}</div>
                        </div>
                        <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                          <h3 className="text-2xl font-bold mb-2">{videoAdvertisements[currentAdIndex].title}</h3>
                          <p className="text-pink-100 text-lg">{videoAdvertisements[currentAdIndex].description}</p>
                        </div>
                        <div className="absolute bottom-8 right-8 flex items-center space-x-4">
                          <motion.button
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            className="bg-white/30 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isVideoPlaying ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </motion.button>
                          <div className="flex space-x-3">
                            {videoAdvertisements.map((_, index) => (
                              <motion.button
                                key={index}
                                onClick={() => setCurrentAdIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${currentAdIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
                                whileHover={{ scale: 1.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>

            {/* Matching Process Section */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <motion.h2 
                  className="text-4xl font-bold text-center mb-16 text-pink-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Our Matching Process
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                  {[
                    {
                      number: 1,
                      title: "Detailed Profile",
                      description: "Create a profile highlighting your personality and goals."
                    },
                    {
                      number: 2,
                      title: "Smart Compatibility",
                      description: "Our algorithm suggests matches based on compatibility."
                    },
                    {
                      number: 3,
                      title: "Quality Connections",
                      description: "Engage in meaningful conversations with your matches."
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:bg-pink-50/50 transition-all border border-pink-100"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                    >
                      <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-2xl font-bold mb-6">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 text-lg">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {formCompleted ? (
                    <motion.button
                      className="bg-pink-500 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
                      onClick={handleAwaitingMatchClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Awaiting Match
                    </motion.button>
                  ) : (
                    <motion.button
                      className="bg-pink-500 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
                      onClick={() => navigate('/getting-started')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Begin Your Journey
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  };

  export default Homepage;