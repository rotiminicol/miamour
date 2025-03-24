import  { useState } from 'react';
import { Heart, Search, User,  MapPin, Sparkles } from 'lucide-react';
import { Header } from "../components/Header";

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

  
  return (
   <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block animate-float">
            <Heart className="h-12 w-12 text-pink-500 mx-auto" />
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Personalized Matchmaking
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Find your perfect match with our personalized approach
          </p>
        </div>

        {showSuccess ? (
          <div className="bg-white rounded-xl shadow-xl p-8 text-center animate-fadeIn">
            <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Sparkles className="h-8 w-8 text-pink-500 animate-sparkle" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Profile Is Ready!
            </h2>
            <p className="text-gray-600 mb-6">
              Our experts are now crafting personalized matches just for you. 
              Well notify you soon with your perfect matches!
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Start Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 0 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>1</div>
                    <div className={`w-16 h-1 ${currentStep >= 1 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>2</div>
                    <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>3</div>
                    <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>4</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {renderStep()}

                <div className="mt-8 flex justify-between">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center"
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
                        'Find My Matches'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 text-white">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Why our matchmaking works</h3>
                  <p className="text-sm opacity-90 mt-1">
                    Our algorithm combines your preferences, values, and relationship goals to find truly compatible partners for lasting connections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-md p-6 animate-fadeIn">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How Personalized Matchmaking Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <User className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="font-medium text-gray-900">Share Your Profile</h3>
              <p className="mt-1 text-sm text-gray-500">Tell us about yourself and what youre looking for</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-medium text-gray-900">Expert Matching</h3>
              <p className="mt-1 text-sm text-gray-500">Our algorithms find your most compatible matches</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="font-medium text-gray-900">Meet Your Match</h3>
              <p className="mt-1 text-sm text-gray-500">Connect with carefully selected potential partners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
   
  );
};

export default PersonalizedMatchmaking;