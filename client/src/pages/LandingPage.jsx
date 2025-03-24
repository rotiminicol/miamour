import { useState, useEffect } from 'react';
import { Heart, Users, Calendar, MessageCircle, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import your images
import heroImage from '../assets/wedding1.png';
import sarahJamesImage from '../assets/wedding1.png';
import emilyDanielImage from '../assets/wedding4.png';
import jessicaMichaelImage from '../assets/wedding19.png';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStartedClick = () => {
    navigate('/auth');
  };

  const testimonials = [
    {
      name: "Sarah & James",
      image: sarahJamesImage,
      text: "MiAmour helped us find each other and plan our perfect wedding. We couldn't be happier!",
    },
    {
      name: "Emily & Daniel",
      image: emilyDanielImage,
      text: "From our first match to our wedding day, MiAmour was there every step of the way.",
    },
    {
      name: "Jessica & Michael",
      image: jessicaMichaelImage,
      text: "The personalized matching algorithm really works! We're celebrating our 1st anniversary thanks to MiAmour.",
    }
  ];

  const features = [
    { 
      icon: <Users size={24} />, 
      title: "Personalized Matching", 
      description: "Our algorithm find your perfect match based on compactibilty and wedding prefernces" 
    },
    { 
      icon: <Heart size={24} />, 
      title: "Verified Profiles", 
      description: "Connect with genuine individuals who share your commitment to finding true love." 
    },
    { 
      icon: <Calendar size={24} />, 
      title: "Wedding Planning", 
      description: "From engagement to 'I do', access our suite of tools to plan your perfect day together." 
    },
    { 
      icon: <MessageCircle size={24} />, 
      title: "Marriage Counseling", 
      description: "Our certified counselors are here to help you build a strong and lasting relationship." 
    },
    { 
      icon: <Gift size={24} />, 
      title: "Wedding Services", 
      description: "From venue selection to catering, we provide comprehensive wedding planning services." 
    }
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Hearts Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <Heart 
              key={i}
              size={20 + Math.random() * 30}
              className={`absolute text-pink-100 animate-float opacity-70`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-32 sm:pb-20 relative z-10">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
              Find Your Perfect Match with MiAmour
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-600">
              Where true love meets wedding dreams. Start your forever journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleGetStartedClick}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full transform transition-transform hover:scale-105 shadow-lg"
              >
                Find Your Match
              </button>
              <button 
                onClick={handleLearnMoreClick}
                className="bg-white hover:bg-gray-100 text-pink-500 font-bold py-3 px-6 sm:px-8 rounded-full border-2 border-pink-500 transform transition-transform hover:scale-105 shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
          
          {/* Floating Hero Image */}
          <div className={`mt-12 sm:mt-16 mx-auto max-w-2xl relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Happy couple" 
                className="w-full object-cover mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-transparent"></div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-4/5 flex justify-around">
              <div className="text-center">
                <p className="text-pink-500 font-bold text-2xl">15K+</p>
                <p className="text-sm text-gray-600">Matches</p>
              </div>
              <div className="text-center">
                <p className="text-pink-500 font-bold text-2xl">8K+</p>
                <p className="text-sm text-gray-600">Weddings</p>
              </div>
              <div className="text-center">
                <p className="text-pink-500 font-bold text-2xl">98%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">
          What Our Users Say
        </h2>
        <div className="flex justify-center">
          <div className="w-full sm:w-3/4 lg:w-2/3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`mx-auto p-6 bg-white rounded-lg shadow-lg transition-opacity duration-1000 ${
                  activeTestimonial === index ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 mb-4 text-center">{testimonial.text}</p>
                <p className="text-pink-500 font-bold text-center">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features-section" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Why Choose <span className="text-pink-500">MiAmour</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 delay-${600 + index * 100} ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
            >
              <div className="p-4 bg-pink-100 rounded-full inline-block mb-4 text-pink-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;