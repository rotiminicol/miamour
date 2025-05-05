import { useState, useEffect, useRef } from 'react';
import { Header } from "../components/Header";
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Users, Calendar, Clock, ChevronRight, Phone, Mail, Sparkles, X } from 'lucide-react';

const CeremonyPlanningPage = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // References for parallax effects
  const heroRef = useRef(null);
  const venuesRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Scroll progress tracking for parallax
  const { scrollYProgress } = useScroll();
  
  // Hero section parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  
  // Venues section parallax effects
  const venuesY = useTransform(scrollYProgress, [0.2, 0.6], [100, -50]);
  
  // CTA section parallax effects
  const ctaScale = useTransform(scrollYProgress, [0.5, 0.8], [0.9, 1.05]);

  // Animation trigger for hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const venues = [
    {
      id: 1,
      name: "Grand Ballroom",
      location: "New York, NY",
      capacity: 300,
      price: 5000,
      image: "/assets/ceremony.png",
      description: "A luxurious ballroom with stunning chandeliers and a spacious dance floor.",
      features: ["Indoor", "Outdoor Garden", "Catering Included", "Parking Available"],
      category: "indoor",
      rating: 4.9,
      reviews: 127,
      images: [
        "/assets/ceremony.png",
        "/assets/ceremony1.png",
        "/assets/ceremony1.png"
      ]
    },
    {
      id: 2,
      name: "Beachfront Resort",
      location: "Miami, FL",
      capacity: 200,
      price: 7000,
      image: "/assets/ceremony1.png",
      description: "A beautiful beachfront venue with ocean views and a tropical vibe.",
      features: ["Beach Access", "Outdoor Ceremony", "Catering Options", "Accommodations"],
      category: "outdoor",
      rating: 4.8,
      reviews: 98,
      images: [
        "/assets/ceremony1.png",
        "/assets/ceremony.png",
        "/assets/ceremony.png"
      ]
    },
    {
      id: 3,
      name: "Rustic Barn",
      location: "Austin, TX",
      capacity: 150,
      price: 4000,
      image: "/assets/ceremony.png",
      description: "A charming barn venue with a rustic feel, perfect for a country-style wedding.",
      features: ["Indoor/Outdoor", "Catering Options", "Parking Available", "Photography Spots"],
      category: "rustic",
      rating: 4.7,
      reviews: 85,
      images: [
        "/assets/ceremony.png",
        "/assets/ceremony.png",
        "/assets/ceremony1.png"
      ]
    },
    {
      id: 4,
      name: "Modern Loft",
      location: "Chicago, IL",
      capacity: 180,
      price: 4500,
      image: "/assets/ceremony.png",
      description: "A contemporary loft space with industrial charm and city views.",
      features: ["Indoor", "City Views", "Modern Amenities", "Flexible Layout"],
      category: "modern",
      rating: 4.8,
      reviews: 92,
      images: [
        "/assets/ceremony.png",
        "/assets/ceremony1.png",
        "/assets/ceremony1.png"
      ]
    },
    {
      id: 5,
      name: "Garden Estate",
      location: "Los Angeles, CA",
      capacity: 250,
      price: 6000,
      image: "/assets/ceremony1.png",
      description: "An elegant estate with manicured gardens and classic architecture.",
      features: ["Garden Ceremony", "Indoor Reception", "Historic Setting", "Full Service"],
      category: "outdoor",
      rating: 4.9,
      reviews: 156,
      images: [
        "/assets/ceremony1.png",
        "/assets/ceremony.png",
        "/assets/ceremony.png"
      ]
    },
    {
      id: 6,
      name: "Mountain Lodge",
      location: "Denver, CO",
      capacity: 120,
      price: 5500,
      image: "/assets/ceremony1.png",
      description: "A cozy mountain lodge with breathtaking views and natural surroundings.",
      features: ["Mountain Views", "Indoor/Outdoor", "Lodging Available", "Scenic Location"],
      category: "rustic",
      rating: 4.7,
      reviews: 78,
      images: [
        "/assets/ceremony1.png",
        "/assets/ceremony.png",
        "/assets/ceremony1.png"
      ]
    }
  ];

  const filteredVenues = activeFilter === 'all' 
    ? venues 
    : venues.filter(venue => venue.category === activeFilter);

  const closeModal = () => {
    setSelectedVenue(null);
  };

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50">
      <Header />
      
      {/* Hero Section with Parallax */}
      <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white">
        {/* Floating hearts animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {isAnimating && Array.from({ length: 15 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute text-pink-400 opacity-70"
              initial={{ y: "100vh", x: `${Math.random() * 100}%` }}
              animate={{ 
                y: "-10vh",
                x: `${Math.random() * 100}%`,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                delay: Math.random() * 2
              }}
              style={{
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            ease: "linear", 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
          }}
        />
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 py-16 md:py-28 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Plan Your Dream Ceremony
              <motion.span 
                className="inline-block ml-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Find the perfect venue and vendors for your special day.
            </p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-pink-50 transition duration-300"
              >
                Explore Venues
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openContactModal}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition duration-300"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-lg bg-white/80 backdrop-blur-sm p-1 shadow-lg">
            {['all', 'indoor', 'outdoor', 'rustic', 'modern'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-medium rounded-md transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' 
                    : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Venues Section with Parallax */}
        <motion.div 
          ref={venuesRef}
          style={{ y: venuesY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Featured Venues
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our top-rated venues for your ceremony.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="relative">
                  <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm">View Details</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{venue.name}</h3>
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      ${venue.price}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400 mr-2">
                      {Array(Math.floor(venue.rating)).fill('★').join('')}
                    </div>
                    <span className="text-gray-600 text-sm">({venue.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.features.map((feature, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">Up to {venue.capacity} guests</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-pink-500 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action with Parallax */}
        <motion.div 
          ref={ctaRef}
          style={{ scale: ctaScale }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto mb-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Need Help Planning?</h2>
            <p className="text-pink-100 mb-8 text-lg">Our team is here to make your dream ceremony a reality.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-pink-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-pink-50 transition duration-300"
              onClick={openContactModal}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Venue Detail Modal */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 md:p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedVenue.name}</h2>
                <button 
                  onClick={closeModal} 
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {selectedVenue.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${selectedVenue.name} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-400 mr-2">
                        {Array(Math.floor(selectedVenue.rating)).fill('★').join('')}
                      </div>
                      <span className="text-gray-600">({selectedVenue.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedVenue.location}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      ${selectedVenue.price}
                    </div>
                    <div className="text-gray-600">per day</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">{selectedVenue.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                  <ul className="space-y-2">
                    {selectedVenue.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-600"
                      >
                        <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-pink-500" />
                      <span>Capacity: {selectedVenue.capacity} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                      <span>Available year-round</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-pink-500" />
                      <span>Flexible booking times</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-300 text-center"
                >
                  Book Venue
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openContactModal}
                  className="flex-1 bg-white border-2 border-pink-500 text-pink-500 py-3 px-6 rounded-lg font-semibold hover:bg-pink-50 transition duration-300 text-center"
                >
                  Contact
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeContactModal}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 border border-pink-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h2>
                  <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
                </div>
                <motion.button 
                  onClick={closeContactModal} 
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="h-6 w-6 text-pink-500" />,
                    title: "Address",
                    content: "123 Wedding Lane, Suite 101\nLovetown, CA 90210"
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-pink-500" />,
                    title: "Phone",
                    content: "+1 (800) 555-LOVE"
                  },
                  {
                    icon: <Mail className="h-6 w-6 text-pink-500" />,
                    title: "Email",
                    content: "wedding@miamour.com"
                  },
                  {
                    icon: <Clock className="h-6 w-6 text-pink-500" />,
                    title: "Office Hours",
                    content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100 hover:border-pink-200 transition-colors"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)" }}
                  >
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-pink-100">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://instagram.com/miamour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://x.com/miamour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Floating Action Button */}
      {screenSize === 'mobile' && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-colors"
            aria-label="Book Consultation"
            onClick={openContactModal}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default CeremonyPlanningPage;