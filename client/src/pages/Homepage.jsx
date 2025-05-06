import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, CreditCard, FileText, User, Settings, HelpCircle, Users, Sparkles } from 'lucide-react';
import useMatchStore from '../store/matchStore';
import { useAuthStore } from '../store/useAuthStore';

const Homepage = () => {
  const navigate = useNavigate();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const { matchCard, loading, fetchMatchCard } = useMatchStore();
  const { authUser, checkAuth } = useAuthStore();

  // Fetch user profile and match card status when component mounts
  useEffect(() => {
    checkAuth();
    fetchMatchCard();
  }, [checkAuth, fetchMatchCard]);

  // Categories data
  const categories = {
    services: [
      { icon: <Heart size={24} className="text-pink-500" />, text: 'Marriage Counseling', to: '/marriage-counseling', description: 'Build a lasting partnership.' },
      { icon: <Users size={24} className="text-pink-400" />, text: 'Relationship Therapy', to: '/relationship-therapy', description: 'Strengthen your bond.' },
      { icon: <MessageCircle size={24} className="text-pink-400" />, text: 'miamour App', to: '/dating-app', description: 'Connect with matches.' },
      { icon: <Calendar size={24} className="text-pink-300" />, text: 'Schedule', to: '/schedule', description: 'Book your sessions.' },
      { icon: <Sparkles size={24} className="text-pink-500" />, text: 'Ceremony Planning', to: '/ceremony-planning', description: 'Plan your dream event.' },
      { icon: <MessageCircle size={24} className="text-pink-500" />, text: 'Personalized Matching', to: '/getting-started', description: 'Find your perfect partner.' },
    ],
    billing: [
      { icon: <CreditCard size={24} className="text-pink-500" />, text: 'Payment Methods', to: '/billing-process', description: 'Manage payments.' },
      { icon: <FileText size={24} className="text-pink-400" />, text: 'Insets: invoices', to: '/invoices', description: 'View billing history.' },
    ],
    settings: [
      { icon: <User size={24} className="text-pink-500" />, text: 'My Account', to: '/profile', description: 'Update your profile.' },
      { icon: <Settings size={24} className="text-pink-400" />, text: 'Preferences', to: '/preference', description: 'Customize settings.' },
    ],
    support: [
      { icon: <HelpCircle size={24} className="text-pink-500" />, text: 'Get Help', to: '/help-support', description: 'Contact support.' },
      { icon: <HelpCircle size={24} className="text-pink-400" />, text: 'FAQs', to: '/faqs', description: 'Find answers.' },
    ],
  };

  // Hero content
  const heroContent = {
    title: 'Find Your Soulmate',
    subtitle: 'Connect with someone who completes you.',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  };

  // Wedding advertisements
  const weddingAdvertisements = [
    {
      id: 1,
      title: 'Dream Wedding Venues',
      description: 'Discover breathtaking locations for your special day.',
      imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Explore Venues',
      to: '/wedding-venues',
    },
    {
      id: 2,
      title: 'Bridal Elegance',
      description: 'Find the perfect dress from top designers.',
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Shop Dresses',
      to: '/bridal-fashion',
    },
    {
      id: 3,
      title: 'Honeymoon Bliss',
      description: 'Plan your romantic getaway with exclusive deals.',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Book Now',
      to: '/honeymoon-destinations',
    },
  ];

  // Memoized navigation handler
  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Auto-advance carousel with proper cleanup
  useEffect(() => {
    if (!isCarouselPlaying) return;

    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % weddingAdvertisements.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isCarouselPlaying, weddingAdvertisements.length]);

  // Handle carousel navigation
  const handleNextAd = useCallback(() => {
    setCurrentAdIndex((prev) => (prev + 1) % weddingAdvertisements.length);
    setIsCarouselPlaying(false); // Pause on manual navigation
  }, [weddingAdvertisements.length]);

  const handlePrevAd = useCallback(() => {
    setCurrentAdIndex((prev) => (prev - 1 + weddingAdvertisements.length) % weddingAdvertisements.length);
    setIsCarouselPlaying(false); // Pause on manual navigation
  }, [weddingAdvertisements.length]);

  const handleAwaitingMatchClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Animation variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.03,
      y: -5,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto bg-gradient-to-b from-white to-pink-50/10">
          {/* Note: Consider using an image optimization library (e.g., next/image or a CDN) for production */}
          <style>
            {`
              .hero-gradient {
                background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(236,72,153,0.3) 100%);
              }
              .text-glow {
                text-shadow: 0 0 10px rgba(255,255,255,0.3);
              }
              .soft-glow {
                box-shadow: 0 0 20px rgba(236,72,153,0.2);
              }
              .card-hover {
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
              }
              .card-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
              }
              .pulse-animation {
                animation: pulse 2s infinite;
              }
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
              .floating {
                animation: floating 6s ease-in-out infinite;
              }
              @keyframes floating {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
              }
            `}
            {/* Note: Move styles to a separate .css file or use styled-components for better scoping */}
          </style>

          {/* Hero Section */}
          <section
            className="relative h-screen min-h-[700px] overflow-hidden"
            onMouseEnter={() => setIsHoveringHero(true)}
            onMouseLeave={() => setIsHoveringHero(false)}
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroContent.bgImage})` }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: isHoveringHero ? 1.03 : 1 }}
              transition={{ duration: 0.7, scale: { duration: 10, ease: 'linear' } }}
            >
              <div className="absolute inset-0 hero-gradient" />
              <div className="container mx-auto px-6 h-full flex items-center">
                <motion.div
                  className="text-white max-w-3xl z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-glow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-100">
                      {heroContent.title}
                    </span>
                  </motion.h1>
                  <motion.p
                    className="text-xl md:text-2xl mb-8 opacity-90 font-light text-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {heroContent.subtitle}
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {loading ? (
                      <motion.div
                        className="bg-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Loading...
                      </motion.div>
                    ) : matchCard && matchCard.status === 'active' ? (
                      <motion.button
                        aria-label="Track awaiting match"
                        className="relative overflow-hidden bg-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 soft-glow pulse-animation"
                        onClick={handleAwaitingMatchClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Awaiting Match</span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label="Start matching"
                        className="relative overflow-hidden bg-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 soft-glow"
                        onClick={() => navigate('/getting-started', { state: { userData: authUser } })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Start Matching</span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      </motion.button>
                    )}
                    <motion.button
                      aria-label="Learn more about miamour"
                      className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                      onClick={() => handleNavigate('/learn-more')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-pink-400/20 blur-xl"
                animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/4 right-20 w-24 h-24 rounded-full bg-white/10 blur-xl"
                animate={{ y: [0, -30, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </section>

          {/* Popup */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
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
                  className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl border border-pink-100 relative overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-pink-100/30 blur-xl"></div>
                  <div className="relative z-10 text-center">
                    <motion.h2
                      className="text-3xl font-bold text-pink-600 mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Ready to Find Your Match?
                    </motion.h2>
                    <motion.p
                      className="text-gray-600 mb-8 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Our advanced algorithm is working to find your perfect partner. Track your match progress in real-time!
                    </motion.p>
                    <motion.div
                      className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.button
                        aria-label="Track my match"
                        className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors shadow-lg"
                        onClick={() => {
                          handleClosePopup();
                          handleNavigate('/match-track');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Track My Match
                      </motion.button>
                      <motion.button
                        aria-label="Close popup"
                        className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
                        onClick={handleClosePopup}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Maybe Later
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Our Services Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-center mb-16"
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-pink-600 mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Our Services
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Discover all the ways we help you find and nurture love
                </motion.p>
              </motion.div>

              {Object.entries(categories).map(([category, items]) => (
                <div key={category} className="mb-12">
                  <motion.h3
                    className="text-2xl font-semibold text-gray-800 mb-6 capitalize"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {category}
                  </motion.h3>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {items.map((item) => (
                      <motion.div
                        key={`${category}-${item.text}`}
                        variants={cardVariants}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 card-hover"
                      >
                        <motion.button
                          aria-label={`Navigate to ${item.text}`}
                          className="w-full p-6 flex flex-col items-center text-center h-full"
                          onClick={() => handleNavigate(item.to)}
                          whileHover="hover"
                        >
                          <motion.div
                            className="mb-4 p-4 rounded-full bg-pink-50"
                            whileHover={{ rotate: 10 }}
                          >
                            {item.icon}
                          </motion.div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.text}</h3>
                          <p className="text-gray-500 text-sm">{item.description}</p>
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Partners Section */}
          <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-center mb-16"
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-pink-600 mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Featured Wedding Partners
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Weve partnered with the best to make your special day perfect
                </motion.p>
              </motion.div>

              <motion.div
                className="relative rounded-2xl overflow-hidden h-[32rem] shadow-xl border border-white/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={weddingAdvertisements[currentAdIndex].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
                      style={{ backgroundImage: `url(${weddingAdvertisements[currentAdIndex].imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-pink-600/20" />
                      <div className="relative h-full flex flex-col items-center justify-end pb-12 px-6">
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {weddingAdvertisements[currentAdIndex].title}
                        </motion.h3>
                        <motion.p
                          className="text-white text-lg md:text-xl mb-6 text-center max-w-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {weddingAdvertisements[currentAdIndex].description}
                        </motion.p>
                        <motion.button
                          aria-label={`Explore ${weddingAdvertisements[currentAdIndex].title}`}
                          className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-pink-50 transition-colors"
                          onClick={() => handleNavigate(weddingAdvertisements[currentAdIndex].to)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {weddingAdvertisements[currentAdIndex].cta}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute bottom-6 right-6 flex items-center space-x-4 z-10">
                  <motion.button
                    aria-label={isCarouselPlaying ? 'Pause carousel' : 'Play carousel'}
                    onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
                    className="bg-white/30 hover:bg-white/40 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isCarouselPlaying ? (
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
                    {weddingAdvertisements.map((ad) => (
                      <motion.button
                        key={ad.id}
                        aria-label={`Go to slide ${ad.title}`}
                        onClick={() => {
                          setCurrentAdIndex(weddingAdvertisements.findIndex((item) => item.id === ad.id));
                          setIsCarouselPlaying(false);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${currentAdIndex === weddingAdvertisements.findIndex((item) => item.id === ad.id) ? 'bg-white w-6' : 'bg-white/50'}`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Previous/Next Arrows */}
                <motion.button
                  aria-label="Previous slide"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm z-10"
                  onClick={handlePrevAd}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  aria-label="Next slide"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm z-10"
                  onClick={handleNextAd}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Homepage;