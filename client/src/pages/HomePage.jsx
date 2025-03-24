import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from "../components/Sidebar";
import { useNavigate } from 'react-router-dom';

import heroImage1 from '../assets/bghe.png';
import heroImage2 from '../assets/myguy.png';
import heroImage3 from '../assets/jibo.png';
import Advert1 from '../assets/consel.png'; 
import Advert2 from '../assets/jibo2.png';
import Advert3 from '../assets/wedding1.png'; 
import profileimg1 from '../assets/Girl1.png';
import profileimg2 from '../assets/boy1.png'; 
import profileimg3 from '../assets/girl2.png';
import profileimg4 from '../assets/boy2.png'; 
import profileimg5 from '../assets/girl3.png';
import profileimg6 from '../assets/boy3.png'; 
import profileimg7 from '../assets/girl4.png';




const Homepage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('featured');
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAdPaused, setIsAdPaused] = useState(false);
  
  // Hero images for the main carousel
  const heroImages = [
    {
      url: heroImage1,
      title: "Find Your Perfect Match",
      subtitle: "Compatibility matching that really works"
    },
    {
      url: heroImage2,
      title: "Meaningful Connections",
      subtitle: "Meet people who share your values"
    },
    {
      url: heroImage3,
      title: "Love Starts Here",
      subtitle: "Join thousands of successful couples"
    }
  ];
  
  // Advertisement data
  const advertisements = [
    {
      id: 1,
      brand: "Romantic Getaways",
      slogan: "Plan your perfect honeymoon",
      image: Advert1,
      url: ""
    },
    {
      id: 2,
      brand: "Diamond Rings",
      slogan: "When you're ready to propose",
      image: Advert2,
      url: ""
    },
    {
      id: 3,
      brand: "Date Night Ideas",
      slogan: "100+ romantic restaurant suggestions",
      image: Advert3,
      url: ""
    }
  ];
  
  // Profile categories
  const categories = [
    { id: 'featured', name: 'Featured Profiles' },
    { id: 'new', name: 'New Members' },
    { id: 'premium', name: 'Premium Members' },
    { id: 'local', name: 'Near You' }
  ];
  
  // Sample profile data
  const profileData = {
    featured: [
      {
        id: 1,
        name: "Sarah Johnson",
        age: 28,
        location: "New York, NY",
        compatibility: 87,
        bio: "Doctor who loves hiking and cooking",
        image: profileimg1
      },
      {
        id: 2,
        name: "Michael Chen",
        age: 32,
        location: "Los Angeles, CA",
        compatibility: 92,
        bio: "Software engineer, passionate about music",
        image: profileimg2
      },
      {
        id: 3,
        name: "Priya Patel",
        age: 30,
        location: "Chicago, IL",
        compatibility: 85,
        bio: "Architect and amateur photographer",
        image: profileimg3
      }
    ],
    new: [
      {
        id: 4,
        name: "David Wilson",
        age: 29,
        location: "Austin, TX",
        compatibility: 78,
        bio: "Teacher and nature enthusiast",
        image: profileimg4
      },
      {
        id: 5,
        name: "Emma Garcia",
        age: 31,
        location: "Miami, FL",
        compatibility: 91,
        bio: "Marketing director who loves dancing",
        image:profileimg5
      }
    ],
    premium: [
      {
        id: 6,
        name: "James Miller",
        age: 35,
        location: "San Francisco, CA",
        compatibility: 89,
        bio: "Entrepreneur and world traveler",
        image: profileimg6
      }
    ],
    local: [
      {
        id: 7,
        name: "Olivia Brown",
        age: 27,
        location: "Your City, ST",
        compatibility: 95,
        bio: "Artist looking for creative partner",
        image: profileimg7
      }
    ]
  };
  
  // Auto-advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAdPaused) {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAdPaused]);
  
  // Auto-advance advertisements
  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
    }, 8000);
    
    return () => clearInterval(adInterval);
  }, []);
  
  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };
  
  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        
        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          {/* Hero Section with Call-to-Action */}
          <section className="relative h-96 md:h-[32rem] overflow-hidden">
            <AnimatePresence initial={false} custom={currentHeroImage}>
              <motion.div
                key={currentHeroImage}
                className="absolute inset-0 bg-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <img 
                  src={heroImages[currentHeroImage].url} 
                  alt="Romantic couple" 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white max-w-2xl"
                    >
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {heroImages[currentHeroImage].title}
                      </h1>
                      <p className="text-xl mb-8">
                        {heroImages[currentHeroImage].subtitle}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                        onClick={() => navigate('/getting-started')}
                      >
                        Start Your Match Process
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Hero Carousel Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentHeroImage === index ? 'bg-white w-6' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={prevHeroImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextHeroImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </section>
          
          {/* Advertisement Board */}
          <section className="bg-white py-8 px-4 shadow-sm">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Our Partners</h2>
              
              <div className="relative bg-gray-100 rounded-xl overflow-hidden h-48 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={advertisements[currentAdIndex].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex"
                  >
                    <div className="w-1/3 h-full bg-gray-300">
                      <img 
                        src={advertisements[currentAdIndex].image} 
                        alt={advertisements[currentAdIndex].brand} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {advertisements[currentAdIndex].brand}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {advertisements[currentAdIndex].slogan}
                      </p>
                      <a 
                        href={advertisements[currentAdIndex].url} 
                        className="text-rose-600 hover:text-rose-800 font-medium inline-flex items-center"
                      >
                        Learn more <ChevronRight className="ml-1" size={18} />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <button 
                  onClick={() => setIsAdPaused(!isAdPaused)}
                  className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                  aria-label={isAdPaused ? "Play ads" : "Pause ads"}
                >
                  {isAdPaused ? <Play size={16} /> : <Pause size={16} />}
                </button>
              </div>
            </div>
          </section>
          
          {/* Profile Categories Section */}
          <section className="py-12 bg-gradient-to-b from-white to-pink-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                  Discover Potential Matches
                </h2>
                
                <div className="flex space-x-1 bg-white p-1 rounded-full shadow-sm">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeCategory === category.id ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {profileData[activeCategory].map((profile) => (
                  <motion.div
                    key={profile.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-60">
                      <img 
                        src={profile.image} 
                        alt={profile.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-rose-600 shadow-sm">
                        {profile.compatibility}% Match
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {profile.name}, {profile.age}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {profile.location}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-rose-600 transition-colors">
                          <Heart size={20} />
                        </button>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {profile.bio}
                      </p>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="bg-rose-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-rose-700 transition-colors flex-1"
                        >
                          Connect
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="border border-gray-300 text-gray-600 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          View
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-rose-600 text-rose-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-rose-50 transition-colors"
                >
                  View More Profiles
                </motion.button>
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                How Our Matching Works
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-pink-50 p-6 rounded-xl"
                >
                  <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Create Your Profile</h3>
                  <p className="text-gray-600">
                    Tell us about yourself and what youre looking for in a partner.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-purple-50 p-6 rounded-xl"
                >
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Matching</h3>
                  <p className="text-gray-600">
                    Our algorithm finds compatible matches based on your preferences.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 p-6 rounded-xl"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Start Connecting</h3>
                  <p className="text-gray-600">
                    Message your matches and build meaningful connections.
                  </p>
                </motion.div>
              </div>
              
              <div className="mt-12 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                  onClick={() => window.location.href = '/gettingstarted'}
                >
                  Get Started Now
                </motion.button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Homepage