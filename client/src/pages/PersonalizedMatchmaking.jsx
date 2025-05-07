import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Heart, Search, User, MapPin, Crown, Star, Shield, CheckCircle2, ArrowRight, ChevronLeft } from 'lucide-react';

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
  const [screenSize, setScreenSize] = useState('desktop');

  const priceInNGN = 525000;
  const currencyRates = {
    NGN: priceInNGN,
    USD: priceInNGN / 1300,
    GBP: priceInNGN / 1650
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
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePriorityToggle = (priority) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const featuresParallax = useTransform(scrollY, [300, 600], [0, 50]);
  const formParallax = useTransform(scrollY, [600, 900], [0, 50]);
  const processParallax = useTransform(scrollY, [900, 1200], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <User className="mr-2 h-5 w-5 text-pink-600" />
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
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-pink-600" />
              Your Interests
            </h3>
            <p className="text-sm text-gray-600">Select all that apply to you</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 rounded-full text-sm transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
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
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-pink-600" />
              What Matters Most
            </h3>
            <p className="text-sm text-gray-600">Select your relationship priorities</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handlePriorityToggle(priority)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    formData.priorities.includes(priority)
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
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
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Search className="mr-2 h-5 w-5 text-pink-600" />
              Looking For
            </h3>
            <p className="text-sm text-gray-600">Tell us about your ideal match</p>
            <textarea
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent h-32"
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
      icon: <Crown className="h-6 w-6 text-pink-600" />,
      title: "VIP Treatment",
      description: "Exclusive access to our elite matchmaking service"
    },
    {
      icon: <Star className="h-6 w-6 text-pink-600" />,
      title: "Premium Matches",
      description: "Hand-picked matches from our most compatible database"
    },
    {
      icon: <Shield className="h-6 w-6 text-pink-600" />,
      title: "Verified Profiles",
      description: "All matches are thoroughly vetted and verified"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-pink-600" />,
      title: "Guaranteed Success",
      description: "Our success rate speaks for itself"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-100 hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
          <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-pink-50 to-white text-gray-800 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 0C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0zm0 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24zm0-48C14.327 6 6 14.327 6 30s8.327 24 24 24 24-8.327 24-24S45.673 6 30 6z' fill='%23EC4899' fill-opacity='0.3' fill-rule='evenodd'/></svg>")`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div style={{ transform: `translateY(${heroParallax.get()}px)` }} className="max-w-4xl mx-auto">
            <Crown className="h-16 w-16 text-pink-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
              VIP <span className="text-pink-600">Personalized Matchmaking</span>
            </h1>
            <p className="text-lg md:text-xl mt-4 mb-12 text-gray-600 max-w-2xl mx-auto">
              Discover meaningful connections with our elite matchmaking service tailored to you.
            </p>
            <div className="flex justify-center space-x-4">
              {Object.keys(currencyRates).map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    selectedCurrency === currency
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-100'
                  }`}
                >
                  {formatPrice(currency)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div style={{ transform: `translateY(${featuresParallax.get()}px)` }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {showSuccess ? (
          <div style={{ transform: `translateY(${formParallax.get()}px)` }} className="bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center mb-20 border border-pink-100">
            <div className="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-pink-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Welcome to <span className="text-pink-600">VIP Matchmaking</span>!
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our elite matchmakers are now crafting your perfect matches. You will receive your exclusive matches within 24 hours.
            </p>
            <button
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
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Start New Profile
            </button>
          </div>
        ) : (
          <div style={{ transform: `translateY(${formParallax.get()}px)` }} className="bg-white/90 backdrop-blur-sm rounded-xl border border-pink-100 mb-20">
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step - 1 ? 'bg-pink-600 text-white' : 'bg-pink-100 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-16 h-1 ${currentStep >= step ? 'bg-pink-600' : 'bg-pink-100'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">{renderStep()}</div>
                <div className="flex justify-between">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-pink-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-6 py-3 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 flex items-center"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="ml-auto px-6 py-3 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 flex items-center"
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
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="bg-pink-50 p-8">
              <div className="flex items-start space-x-6">
                <Crown className="h-8 w-8 text-pink-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Choose VIP Matchmaking?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our premium service combines advanced AI algorithms with expert matchmakers to create meaningful connections. 
                    With a success rate of over 85%, we ensure you meet someone who truly complements your lifestyle and values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ transform: `translateY(${processParallax.get()}px)` }} className="bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-pink-100">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            The VIP Matchmaking Process
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Elite Profile Creation</h3>
              <p className="text-gray-600">Our experts craft your premium profile to attract the perfect matches</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Exclusive Matching</h3>
              <p className="text-gray-600">Access to our elite database of verified, high-quality matches</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Guaranteed Connections</h3>
              <p className="text-gray-600">Personal introductions to your most compatible matches</p>
            </div>
          </div>
        </div>
      </div>

      {screenSize === 'mobile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
            aria-label="Begin Matchmaking"
            onClick={() => setCurrentStep(0)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedMatchmaking;