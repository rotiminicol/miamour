import { useState } from 'react';
import { Heart, Search, User, MapPin, Sparkles, Crown, Star, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Header } from "../components/Header";
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const PersonalizedMatchmaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    interests: [],
    lookingFor: '',
    priorities: []
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');

  // Currency conversion rates (example rates)
  const priceInNGN = 525000;
  const currencyRates = {
    NGN: priceInNGN,
    USD: priceInNGN / 1300, // Example rate
    GBP: priceInNGN / 1650  // Example rate
  };

  const formatPrice = (currency) => {
    const amount = currencyRates[currency];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const interests = [
    'Travel', 'Cooking', 'Reading', 'Fitness', 'Music', 
    'Movies', 'Art', 'Hiking', 'Photography', 'Dancing'
  ];

  const priorities = [
    'Family Values', 'Career', 'Spirituality', 'Education', 
    'Lifestyle', 'Personal Growth', 'Financial Stability'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handlePriorityToggle = (priority) => {
    setFormData(prev => {
      if (prev.priorities.includes(priority)) {
        return { ...prev, priorities: prev.priorities.filter(p => p !== priority) };
      } else {
        return { ...prev, priorities: [...prev.priorities, priority] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center">
              <User className="mr-2" size={20} />
              About You
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  placeholder="Your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center">
              <Heart className="mr-2" size={20} />
              Your Interests
            </h3>
            <p className="text-sm text-gray-600">Select all that apply to you</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 rounded-full text-sm transition-all duration-300 ease-in-out ${
                    formData.interests.includes(interest)
                      ? 'bg-pink-500 text-white hover:bg-pink-600 transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center">
              <MapPin className="mr-2" size={20} />
              What Matters Most
            </h3>
            <p className="text-sm text-gray-600">Select your relationship priorities</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handlePriorityToggle(priority)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    formData.priorities.includes(priority)
                      ? 'bg-purple-500 text-white hover:bg-purple-600 transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center">
              <Search className="mr-2" size={20} />
              Looking For
            </h3>
            <p className="text-sm text-gray-600">Tell us about your ideal match</p>
            <textarea
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent h-32"
              placeholder="Describe qualities you're looking for in a partner..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  const premiumFeatures = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: "VIP Treatment",
      description: "Exclusive access to our elite matchmaking service"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Premium Matches",
      description: "Hand-picked matches from our most compatible database"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Profiles",
      description: "All matches are thoroughly vetted and verified"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Guaranteed Success",
      description: "Our success rate speaks for itself"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
          <BackButton />
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Premium Header */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <motion.div 
                  className="inline-block"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="h-16 w-16 text-amber-500 mx-auto" />
                </motion.div>
                <h1 className="mt-4 text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent sm:text-5xl">
                  VIP Personalized Matchmaking
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  Experience our premium matchmaking service designed for discerning individuals
                </p>
                
                {/* Currency Selector */}
                <div className="mt-6 flex justify-center space-x-4">
                  {Object.keys(currencyRates).map((currency) => (
                    <motion.button
                      key={currency}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCurrency(currency)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all ${
                        selectedCurrency === currency
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      {formatPrice(currency)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Premium Features Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="text-pink-500 mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Main Form Section */}
              {showSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-xl p-8 text-center"
                >
                  <motion.div 
                    className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-6"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Welcome to VIP Matchmaking!
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Our elite matchmakers are now crafting your perfect matches. 
                    Youll receive your exclusive matches within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowSuccess(false);
                      setCurrentStep(0);
                      setFormData({
                        name: '',
                        age: '',
                        location: '',
                        interests: [],
                        lookingFor: '',
                        priorities: []
                      });
                    }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Start New Profile
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map((step) => (
                          <motion.div
                            key={step}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: step * 0.1 }}
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentStep >= step - 1 
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                                : 'bg-gray-200'
                            }`}>
                              {step}
                            </div>
                            {step < 4 && (
                              <div className={`w-16 h-1 ${
                                currentStep >= step 
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                                  : 'bg-gray-200'
                              }`}></div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {renderStep()}
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-8 flex justify-between">
                        {currentStep > 0 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={prevStep}
                            className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            Back
                          </motion.button>
                        )}
                        {currentStep < 3 ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={nextStep}
                            className="ml-auto px-6 py-3 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center"
                          >
                            Next Step
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="ml-auto px-6 py-3 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center"
                          >
                            {isLoading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                Begin VIP Matchmaking
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Premium Info Footer */}
                  <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-8 text-white">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <Crown className="h-8 w-8 text-amber-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Why Choose VIP Matchmaking?</h3>
                        <p className="text-white/90 leading-relaxed">
                          Our premium service combines advanced AI algorithms with expert matchmakers to create meaningful connections. 
                          With a success rate of over 85%, we ensure you meet someone who truly complements your lifestyle and values.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* How It Works Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-white rounded-xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
                  The VIP Matchmaking Process
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Elite Profile Creation</h3>
                    <p className="text-gray-600">Our experts craft your premium profile to attract the perfect matches</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Exclusive Matching</h3>
                    <p className="text-gray-600">Access to our elite database of verified, high-quality matches</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Guaranteed Connections</h3>
                    <p className="text-gray-600">Personal introductions to your most compatible matches</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalizedMatchmaking;