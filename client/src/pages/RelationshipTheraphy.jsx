import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Users, Award, Sparkles, X, Star, ChevronRight, ArrowLeft } from 'lucide-react';
import { Header } from "../components/Header";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RelationshipTherapy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Animation trigger for hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle all button clicks
  const handleButtonClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah & Mike",
      text: "The therapy sessions helped us communicate better. We're stronger than ever!",
      years: "Together 5 years",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Priya & James",
      text: "We were on the brink of separation, but the exercises helped us reconnect.",
      years: "Together 3 years",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b3ce551?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David & Chris",
      text: "Learning about our love languages transformed our relationship completely.",
      years: "Together 7 years",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Services offered
  const services = [
    {
      title: "Communication Coaching",
      description: "Learn effective ways to express needs and listen actively.",
      icon: <MessageCircle className="h-8 w-8 text-pink-500" />,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Conflict Resolution",
      description: "Develop healthy strategies for resolving disagreements.",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Intimacy Building",
      description: "Reconnect emotionally and physically with your partner.",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Relationship Assessment",
      description: "Identify strengths and growth areas in your relationship.",
      icon: <Award className="h-8 w-8 text-blue-500" />,
      gradient: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-pink-500 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back</span>
        </motion.button>

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

        {/* Popup Modal */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="text-center py-4">
                  <motion.div 
                    className="mb-6 text-pink-500"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Experience Only Available in App
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Download our app to access all relationship therapy features and services.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-white px-5 py-2 rounded-lg flex items-center"
                    >
                      <span className="mr-2">App Store</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-white px-5 py-2 rounded-lg flex items-center"
                    >
                      <span className="mr-2">Google Play</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Relationship Therapy
                <motion.span 
                  className="absolute -top-4 -right-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strengthen your bond, reignite your passion, and build a lasting partnership with our expert guidance
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleButtonClick}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium py-3 px-6 rounded-full shadow-lg transform transition focus:outline-none"
              >
                Book a Free Consultation
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleButtonClick}
                className="bg-white hover:bg-gray-100 text-pink-500 font-medium py-3 px-6 rounded-full shadow-lg border border-pink-200 transform transition focus:outline-none"
              >
                View Therapy Plans
              </motion.button>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex rounded-lg bg-white/50 backdrop-blur-sm p-1 shadow-lg">
              {['about', 'services', 'testimonials', 'quiz'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 font-medium rounded-md transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' 
                      : 'text-gray-700 hover:text-pink-500'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-500 transform hover:shadow-2xl"
          >
            {/* About Section */}
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="animate-fadeIn"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Our Approach to Relationship Healing
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Our relationship therapy program is designed to help couples at any stage of their relationship journey. 
                      Whether youre newly dating, engaged, married for decades, or somewhere in between, our personalized approach 
                      addresses your specific needs.
                    </p>
                    <p className="text-gray-600 mb-4">
                      We focus on evidence-based techniques that foster healthy communication, emotional intimacy, and mutual understanding. 
                      Our certified therapists create a safe, judgment-free space for you and your partner to explore challenges and rediscover connection.
                    </p>
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-pink-600 mb-3">Why Choose Our Therapy?</h3>
                      <ul className="space-y-2">
                        {[
                          "Personalized approach for your unique relationship",
                          "Flexible scheduling with virtual and in-person options",
                          "Practical exercises you can implement immediately",
                          "Ongoing support between sessions"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="text-pink-500 mr-2">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-pink-200 rounded-full opacity-50"></div>
                    <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
                    <h3 className="text-xl font-semibold text-pink-600 mb-4 relative z-10">Get Started Today</h3>
                    <p className="text-gray-700 mb-6 relative z-10">
                      Begin your journey toward a healthier, happier relationship with our simple process:
                    </p>
                    <ol className="space-y-4 relative z-10">
                      {[
                        "Complete our relationship assessment questionnaire",
                        "Schedule your complimentary 30-minute consultation",
                        "Receive your personalized therapy plan",
                        "Begin your sessions with your matched therapist"
                      ].map((step, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex"
                        >
                          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-gray-700">{step}</p>
                        </motion.li>
                      ))}
                    </ol>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleButtonClick}
                      className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-2 px-4 rounded-lg transition transform focus:outline-none relative z-10"
                    >
                      Start Assessment
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Services Section */}
            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="animate-fadeIn"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-10 text-center">
                  Our Therapy Services
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {services.map((service, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      onHoverStart={() => setHoveredService(index)}
                      onHoverEnd={() => setHoveredService(null)}
                      className={`bg-white p-6 rounded-xl border border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                           style={{ backgroundImage: `linear-gradient(to right, ${service.gradient})` }}></div>
                      <div className="flex items-start relative z-10">
                        <div className={`bg-gradient-to-r ${service.gradient} p-3 rounded-lg mr-4 text-white`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredService === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-10"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Customized Therapy Packages</h3>
                    <p className="mb-6">
                      We offer tailored therapy packages to meet your specific needs and goals. From short-term intervention to ongoing support.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      {[
                        { name: "Starter", sessions: "4", price: "349", save: "15%" },
                        { name: "Essential", sessions: "8", price: "649", save: "25%", popular: true },
                        { name: "Premium", sessions: "12", price: "899", save: "35%" }
                      ].map((plan, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-white/20 p-4 rounded-lg backdrop-filter backdrop-blur-sm ${plan.popular ? 'transform scale-105' : ''}`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-3 left-0 right-0 flex justify-center">
                              <span className="bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                                MOST POPULAR
                              </span>
                            </div>
                          )}
                          <h4 className="font-bold text-lg mb-2">{plan.name}</h4>
                          <p className="text-sm mb-3">{plan.sessions} sessions</p>
                          <p className="font-bold text-2xl mb-1">${plan.price}</p>
                          <p className="text-xs mb-4">Save {plan.save}</p>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleButtonClick}
                            className="bg-white text-pink-500 py-1 px-4 rounded-full text-sm font-medium hover:bg-pink-100 transition"
                          >
                            {plan.popular ? 'Select Plan' : 'Learn More'}
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Testimonials Section */}
            {activeTab === 'testimonials' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="animate-fadeIn"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-10 text-center">
                  Success Stories
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-bl-full opacity-50"></div>
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.years}</p>
                        </div>
                      </div>
                      <div className="text-pink-500 mb-4">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className="inline-block w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 p-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Transform Your Relationship?</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                      Join hundreds of couples who have rekindled their love and built stronger connections through our therapy programs.
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleButtonClick}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition focus:outline-none"
                    >
                      Book Your Free Consultation
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Quiz Section */}
            {activeTab === 'quiz' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="animate-fadeIn"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
                  Relationship Health Quiz
                </h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
                  Discover insights about your relationship dynamics with our quick assessment. Answer honestly for the most accurate results.
                </p>
                
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-8">
                    {[
                      {
                        question: "How often do you and your partner have meaningful conversations?",
                        options: ["Daily", "Several times a week", "About once a week", "Rarely"]
                      },
                      {
                        question: "How do you typically resolve disagreements?",
                        options: [
                          "We discuss calmly until we reach a compromise",
                          "One of us usually gives in to keep the peace",
                          "We argue and then move on without resolution",
                          "We avoid disagreements altogether"
                        ]
                      },
                      {
                        question: "When was the last time you tried something new together?",
                        options: [
                          "Within the last month",
                          "Within the last 3 months",
                          "Within the last year",
                          "Can't remember"
                        ]
                      }
                    ].map((question, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg"
                      >
                        <h3 className="font-semibold text-gray-800 mb-4">{index + 1}. {question.question}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {question.options.map((option, optionIndex) => (
                            <motion.button 
                              key={optionIndex}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleButtonClick}
                              className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition group"
                            >
                              <span className="flex items-center">
                                {option}
                                <ChevronRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex justify-center"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleButtonClick}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition focus:outline-none"
                    >
                      Complete Quiz & Get Results
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Call-to-action Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Ready to take the first step?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our relationship experts are ready to help you build the connection you deserve.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleButtonClick}
                className="group relative bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-3 px-6 rounded-full shadow-lg overflow-hidden"
              >
                <span className="relative z-10">Schedule a Session</span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out opacity-20"></span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleButtonClick}
                className="group relative bg-transparent hover:bg-pink-50 text-pink-500 font-medium py-3 px-6 rounded-full shadow-lg border border-pink-300 overflow-hidden"
              >
                <span className="relative z-10">Learn More About Our Approach</span>
                <span className="absolute inset-0 bg-pink-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out opacity-50"></span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RelationshipTherapy;