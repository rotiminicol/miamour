import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import Sidebar from "../components/Sidebar";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  
  // Hero content for the main carousel
  const heroContent = [
    {
      title: "Find Your Perfect Match",
      subtitle: "Our advanced compatibility system connects you with people who truly align with your values and lifestyle",
      bgColor: "from-purple-600 to-indigo-700"
    },
    {
      title: "Meaningful Connections",
      subtitle: "Build relationships based on shared interests and genuine compatibility",
      bgColor: "from-rose-600 to-pink-700"
    },
    {
      title: "Love Starts Here",
      subtitle: "Join thousands of successful couples who found love through our platform",
      bgColor: "from-blue-600 to-cyan-600"
    }
  ];
  
  // Video advertisements data
  const videoAdvertisements = [
    {
      id: 1,
      title: "Romantic Getaways",
      description: "Exclusive deals for couples planning their perfect honeymoon",
      videoUrl: "https://example.com/videos/honeymoon.mp4",
      thumbnail: "🌴"
    },
    {
      id: 2,
      title: "Diamond Rings",
      description: "Curated selection from top jewelers when you're ready to propose",
      videoUrl: "https://example.com/videos/jewelry.mp4",
      thumbnail: "💍"
    },
    {
      id: 3,
      title: "Date Night Ideas",
      description: "100+ romantic restaurant suggestions for every occasion",
      videoUrl: "https://example.com/videos/dining.mp4",
      thumbnail: "🍷"
    }
  ];
  
  // Auto-advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Auto-advance video advertisements
  useEffect(() => {
    let interval;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % videoAdvertisements.length);
      }, 10000); // 10 seconds per ad
    }
    
    return () => clearInterval(interval);
  }, [isVideoPlaying]);
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        
        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          {/* Hero Section */}
          <section className="relative h-[32rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroImage}
                className={`absolute inset-0 bg-gradient-to-br ${heroContent[currentHeroImage].bgColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="container mx-auto px-4 h-full flex items-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white max-w-2xl"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      {heroContent[currentHeroImage].title}
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                      {heroContent[currentHeroImage].subtitle}
                    </p>
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-rose-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                        onClick={() => navigate('/getting-started')}
                      >
                        Start Matching
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
          
          {/* Video Advertisement Display */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Featured Partners
              </h2>
              
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-96">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={videoAdvertisements[currentAdIndex].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col items-center justify-center"
                  >
                    {/* Video Player Placeholder - Replace with actual video element */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-8xl">
                          {videoAdvertisements[currentAdIndex].thumbnail}
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {videoAdvertisements[currentAdIndex].title}
                        </h3>
                        <p className="text-gray-300">
                          {videoAdvertisements[currentAdIndex].description}
                        </p>
                      </div>
                      
                      {/* Video controls */}
                      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                        <button 
                          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
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
                        </button>
                        
                        <div className="flex space-x-1">
                          {videoAdvertisements.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentAdIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${currentAdIndex === index ? 'bg-white w-4' : 'bg-white/30'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* In a real implementation, you would use an actual video element:
                    <video 
                      autoPlay
                      muted
                      loop={false}
                      onEnded={() => setCurrentAdIndex((prev) => (prev + 1) % videoAdvertisements.length)}
                      className="w-full h-full object-cover"
                    >
                      <source src={videoAdvertisements[currentAdIndex].videoUrl} type="video/mp4" />
                    </video>
                    */}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Our Matching Process
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-2xl font-bold mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Detailed Profile</h3>
                  <p className="text-gray-600">
                    Create a comprehensive profile that highlights your personality, interests, and relationship goals.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Smart Compatibility</h3>
                  <p className="text-gray-600">
                    Our algorithm analyzes 32 dimensions of compatibility to suggest your best matches.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Quality Connections</h3>
                  <p className="text-gray-600">
                    Engage in meaningful conversations with matches that truly align with you.
                  </p>
                </motion.div>
              </div>
              
              <div className="mt-16 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md"
                  onClick={() => navigate('/getting-started')}
                >
                  Begin Your Journey
                </motion.button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Homepage;