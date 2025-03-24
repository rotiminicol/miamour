import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Users, Award, Sparkles } from 'lucide-react';
import { Header } from "../components/Header";

const RelationshipTherapy = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation trigger for hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah & Mike",
      text: "The therapy sessions helped us communicate better. We're stronger than ever!",
      years: "Together 5 years"
    },
    {
      name: "Priya & James",
      text: "We were on the brink of separation, but the exercises helped us reconnect.",
      years: "Together 3 years"
    },
    {
      name: "David & Chris",
      text: "Learning about our love languages transformed our relationship completely.",
      years: "Together 7 years"
    }
  ];

  // Services offered
  const services = [
    {
      title: "Communication Coaching",
      description: "Learn effective ways to express needs and listen actively.",
      icon: <MessageCircle className="h-8 w-8 text-pink-500" />
    },
    {
      title: "Conflict Resolution",
      description: "Develop healthy strategies for resolving disagreements.",
      icon: <Users className="h-8 w-8 text-pink-500" />
    },
    {
      title: "Intimacy Building",
      description: "Reconnect emotionally and physically with your partner.",
      icon: <Heart className="h-8 w-8 text-pink-500" />
    },
    {
      title: "Relationship Assessment",
      description: "Identify strengths and growth areas in your relationship.",
      icon: <Award className="h-8 w-8 text-pink-500" />
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating hearts animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {isAnimating && Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-pink-400 opacity-70 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 relative inline-block">
            Relationship Therapy
            <span className="absolute -top-4 -right-8">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strengthen your bond, reignite your passion, and build a lasting partnership with our expert guidance
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none">
              Book a Free Consultation
            </button>
            <button className="bg-white hover:bg-gray-100 text-pink-500 font-medium py-3 px-6 rounded-full shadow-lg border border-pink-200 transform transition hover:scale-105 focus:outline-none">
              View Therapy Plans
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {['about', 'services', 'testimonials', 'quiz'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium rounded-md transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-pink-500 text-white shadow-md' 
                    : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-500 transform hover:shadow-2xl">
          {/* About Section */}
          {activeTab === 'about' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Approach to Relationship Healing</h2>
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
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✓</span>
                        <span className="text-gray-700">Personalized approach for your unique relationship</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✓</span>
                        <span className="text-gray-700">Flexible scheduling with virtual and in-person options</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✓</span>
                        <span className="text-gray-700">Practical exercises you can implement immediately</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">✓</span>
                        <span className="text-gray-700">Ongoing support between sessions</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-pink-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-pink-200 rounded-full opacity-50"></div>
                  <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
                  <h3 className="text-xl font-semibold text-pink-600 mb-4 relative z-10">Get Started Today</h3>
                  <p className="text-gray-700 mb-6 relative z-10">
                    Begin your journey toward a healthier, happier relationship with our simple process:
                  </p>
                  <ol className="space-y-4 relative z-10">
                    <li className="flex">
                      <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <p className="text-gray-700">Complete our relationship assessment questionnaire</p>
                    </li>
                    <li className="flex">
                      <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <p className="text-gray-700">Schedule your complimentary 30-minute consultation</p>
                    </li>
                    <li className="flex">
                      <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <p className="text-gray-700">Receive your personalized therapy plan</p>
                    </li>
                    <li className="flex">
                      <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                      <p className="text-gray-700">Begin your sessions with your matched therapist</p>
                    </li>
                  </ol>
                  <button className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition transform hover:scale-105 focus:outline-none relative z-10">
                    Start Assessment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Services Section */}
          {activeTab === 'services' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Therapy Services</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl border border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start">
                      <div className="bg-pink-50 p-3 rounded-lg mr-4">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Customized Therapy Packages</h3>
                <p className="mb-6">
                  We offer tailored therapy packages to meet your specific needs and goals. From short-term intervention to ongoing support.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                    <h4 className="font-bold text-lg mb-2">Starter</h4>
                    <p className="text-sm mb-3">4 sessions</p>
                    <p className="font-bold text-2xl mb-1">$349</p>
                    <p className="text-xs mb-4">Save 15%</p>
                    <button className="bg-white text-pink-500 py-1 px-4 rounded-full text-sm font-medium hover:bg-pink-100 transition">
                      Learn More
                    </button>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm transform scale-105">
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <span className="bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Essential</h4>
                    <p className="text-sm mb-3">8 sessions</p>
                    <p className="font-bold text-2xl mb-1">$649</p>
                    <p className="text-xs mb-4">Save 25%</p>
                    <button className="bg-white text-pink-500 py-1 px-4 rounded-full text-sm font-medium hover:bg-pink-100 transition">
                      Select Plan
                    </button>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                    <h4 className="font-bold text-lg mb-2">Premium</h4>
                    <p className="text-sm mb-3">12 sessions</p>
                    <p className="font-bold text-2xl mb-1">$899</p>
                    <p className="text-xs mb-4">Save 35%</p>
                    <button className="bg-white text-pink-500 py-1 px-4 rounded-full text-sm font-medium hover:bg-pink-100 transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Section */}
          {activeTab === 'testimonials' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-bl-full opacity-50"></div>
                    <div className="text-pink-500 mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.years}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-8 bg-pink-50 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Transform Your Relationship?</h3>
                <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                  Join hundreds of couples who have rekindled their love and built stronger connections through our therapy programs.
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none">
                  Book Your Free Consultation
                </button>
              </div>
            </div>
          )}

          {/* Quiz Section */}
          {activeTab === 'quiz' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Relationship Health Quiz</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Discover insights about your relationship dynamics with our quick assessment. Answer honestly for the most accurate results.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="space-y-8">
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-4">1. How often do you and your partner have meaningful conversations?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Daily</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Several times a week</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">About once a week</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Rarely</button>
                    </div>
                  </div>
                  
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-4">2. How do you typically resolve disagreements?</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">We discuss calmly until we reach a compromise</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">One of us usually gives in to keep the peace</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">We argue and then move on without resolution</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">We avoid disagreements altogether</button>
                    </div>
                  </div>
                  
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-4">3. When was the last time you tried something new together?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Within the last month</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Within the last 3 months</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Within the last year</button>
                      <button className="bg-white hover:bg-pink-100 text-gray-700 py-2 px-4 rounded-md text-left transition">Cant remember</button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 flex justify-center">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none">
                    Complete Quiz & Get Results
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Call-to-action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to take the first step?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our relationship experts are ready to help you build the connection you deserve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group relative bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-full shadow-lg overflow-hidden">
              <span className="relative z-10">Schedule a Session</span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out opacity-20"></span>
            </button>
            <button className="group relative bg-transparent hover:bg-pink-50 text-pink-500 font-medium py-3 px-6 rounded-full shadow-lg border border-pink-300 overflow-hidden">
              <span className="relative z-10">Learn More About Our Approach</span>
              <span className="absolute inset-0 bg-pink-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out opacity-50"></span>
            </button>
          </div>
        </div>
      </div>

   
    </div>

    </>
    
  );
};

export default RelationshipTherapy;