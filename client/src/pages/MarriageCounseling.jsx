import { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { AnimatePresence, motion } from 'framer-motion';

const MarriageCounseling = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [filter, setFilter] = useState('all');
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialties: ["Communication", "Conflict Resolution", "Intimacy"],
      rating: 4.9,
      reviews: 127,
      price: 150,
      availability: "Mon, Wed, Fri",
      education: "Ph.D. in Clinical Psychology",
      experience: "15+ years",
      bio: "Dr. Johnson specializes in helping couples rebuild trust and improve communication patterns. Her approach combines cognitive-behavioral techniques with emotional focus therapy.",
      category: "clinical"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialties: ["Emotional Connection", "Trust Building", "Family Dynamics"],
      rating: 4.8,
      reviews: 98,
      price: 135,
      availability: "Tue, Thu, Sat",
      education: "Psy.D. in Marriage & Family Therapy",
      experience: "12+ years",
      bio: "With a focus on cultural dynamics in relationships, Dr. Chen helps couples navigate family expectations and build strong foundations based on mutual understanding.",
      category: "family"
    },
    {
      id: 3,
      name: "Lisa Rodriguez, LMFT",
      specialties: ["Premarital Counseling", "Cultural Differences", "Relationship Renewal"],
      rating: 4.7,
      reviews: 85,
      price: 120,
      availability: "Mon-Fri",
      education: "M.S. in Clinical Psychology",
      experience: "8+ years",
      bio: "Lisa specializes in premarital counseling and helps couples from diverse backgrounds build strong foundations before marriage.",
      category: "premarital"
    },
    {
      id: 4,
      name: "Mark Wilson, LCSW",
      specialties: ["Blended Families", "Trauma Recovery", "Effective Communication"],
      rating: 4.8,
      reviews: 72,
      price: 125,
      availability: "Wed-Sun",
      education: "M.S.W. in Social Work",
      experience: "10+ years",
      bio: "Mark's approach focuses on helping blended families and couples affected by trauma develop healthier relationship patterns.",
      category: "trauma"
    },
    {
      id: 5,
      name: "Dr. Priya Patel",
      specialties: ["Intimacy Building", "Conflict Resolution", "Relationship Transitions"],
      rating: 4.9,
      reviews: 103,
      price: 145,
      availability: "Mon-Thu",
      education: "Ph.D. in Psychology",
      experience: "11+ years",
      bio: "Dr. Patel helps couples navigate major life transitions while strengthening their emotional and physical intimacy.",
      category: "clinical"
    },
    {
      id: 6,
      name: "James Washington, LMFT",
      specialties: ["LGBTQ+ Relationships", "Communication Skills", "Couples Therapy"],
      rating: 4.7,
      reviews: 89,
      price: 130,
      availability: "Tue-Sat",
      education: "M.A. in Counseling Psychology",
      experience: "9+ years",
      bio: "James specializes in helping LGBTQ+ couples build strong, affirming relationships while navigating unique challenges.",
      category: "family"
    },
  ];

  const filteredCounselors = filter === 'all' 
    ? counselors 
    : counselors.filter(c => c.category === filter);

  const closeModal = () => {
    setSelectedCounselor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
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
        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Rediscover Your Connection</h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">Expert counseling to help you build a stronger, more fulfilling relationship</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-50 transition duration-300"
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Services Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Our Approach</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">We offer specialized expertise to help you navigate challenges and build a stronger relationship.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                ),
                title: "Communication Coaching",
                description: "Learn evidence-based techniques to express needs clearly and listen effectively."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                ),
                title: "Relationship Rebuilding",
                description: "Restore trust and emotional intimacy through structured therapeutic approaches."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                ),
                title: "Premarital Preparation",
                description: "Build a strong foundation before marriage by addressing key relationship areas."
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter Tab Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {['all', 'clinical', 'family', 'premarital', 'trauma'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Counselors Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Meet Our Experts</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Our counselors are highly qualified professionals with extensive experience in couples therapy.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor, index) => (
              <motion.div
                key={counselor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCounselor(counselor)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{counselor.name}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                      ${counselor.price}/hr
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-gray-700 font-medium">{counselor.rating}</span>
                      <span className="text-gray-500 ml-1">({counselor.reviews})</span>
                    </div>
                    <span className="ml-4 text-gray-500 text-sm">{counselor.experience}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {counselor.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Available: {counselor.availability}</span>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Simple Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Transparent pricing options to fit your needs and budget.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Individual Session",
                price: "120",
                description: "Single counseling session",
                features: [
                  "50-minute session",
                  "Personalized approach",
                  "Session notes provided",
                  "Flexible scheduling"
                ],
                highlight: false
              },
              {
                name: "Monthly Package",
                price: "420",
                description: "4 sessions per month",
                features: [
                  "50-minute sessions",
                  "10% discount on regular price",
                  "Priority scheduling",
                  "Email support between sessions",
                  "Customized resources"
                ],
                highlight: true
              },
              {
                name: "Quarterly Package",
                price: "1,140",
                description: "12 sessions over 3 months",
                features: [
                  "50-minute sessions",
                  "15% discount on regular price",
                  "Premium scheduling priority",
                  "Unlimited email support",
                  "Personalized development plan"
                ],
                highlight: false
              }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  plan.highlight 
                    ? 'bg-gradient-to-b from-indigo-600 to-purple-700 text-white ring-4 ring-indigo-300' 
                    : 'bg-white'
                }`}
              >
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>
                      ${plan.price}
                    </span>
                    <span className={`ml-2 ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>
                      {plan.description}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg 
                          className={`w-5 h-5 mr-2 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-500'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className={plan.highlight ? 'text-indigo-100' : 'text-gray-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      plan.highlight 
                        ? 'bg-white text-indigo-700 hover:bg-indigo-50' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {plan.highlight ? 'Get Started' : 'Choose Plan'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Success Stories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Read how our approach has helped couples transform their relationships.</p>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <div className="text-5xl font-serif text-indigo-300"></div>
                <div className="mt-8">
                  <div className="flex mb-2">
                    {'★★★★★'.split('').map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-indigo-800 font-semibold">Michael & Sarah</p>
                  <p className="text-gray-500">Together for 8 years</p>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-700 mb-4">
                  After 8 years together, we had fallen into negative patterns that were driving us apart. Working with our counselor helped us identify these patterns and develop new ways of communicating that actually brought us closer. Were now more connected than ever before
                </p>
                <p className="text-gray-700">
                  The structured approach and expert guidance made all the difference. We learned practical tools that we still use daily to maintain our relationship health
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to transform your relationship?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Schedule a free 20-minute consultation to discuss your needs and find the right counselor.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-50 transition duration-300"
          >
            Book Your Free Consultation
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Relationship Renewal</h3>
              <p className="mb-4">Professional counseling services to help couples build stronger, healthier relationships.</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram'].map(social => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                {['Communication Coaching', 'Conflict Resolution', 'Intimacy Building', 'Premarital Counseling', 'Relationship Rebuilding'].map(service => (
                  <li key={service}>
                    <a href="#" className="hover:text-white transition duration-300">{service}</a>
                    <a href="#" className="hover:text-white transition duration-300">{service}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                {['Relationship Articles', 'Communication Tools', 'Self-Assessment Quizzes', 'Recommended Books', 'FAQ'].map(resource => (
                  <li key={resource}>
                    <a href="#" className="hover:text-white transition duration-300">{resource}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>123 Healing Street, Suite 456<br />New York, NY 10001</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>help@relationshiprenewal.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 Relationship Renewal. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Counselor Detail Modal */}
      <AnimatePresence>
        {selectedCounselor && (
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
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCounselor.name}</h2>
                <button 
                  onClick={closeModal} 
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-400 mr-2">
                        {'★'.repeat(Math.floor(selectedCounselor.rating))}
                        {selectedCounselor.rating % 1 !== 0 && '½'}
                      </div>
                      <span className="text-gray-600">({selectedCounselor.reviews} reviews)</span>
                    </div>
                    <p className="text-gray-600">{selectedCounselor.experience} experience</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-700">${selectedCounselor.price}</div>
                    <div className="text-gray-600">per session</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">{selectedCounselor.bio}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Specialties</h3>
                  <ul className="space-y-1">
                    {selectedCounselor.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Credentials</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium">Education:</span> {selectedCounselor.education}</p>
                    <p><span className="font-medium">Experience:</span> {selectedCounselor.experience}</p>
                    <p><span className="font-medium">Availability:</span> {selectedCounselor.availability}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-center">
                  Book Appointment
                </button>
                <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300 text-center">
                  Contact
                </button>
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
          <button 
            className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
            aria-label="Book Consultation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MarriageCounseling;