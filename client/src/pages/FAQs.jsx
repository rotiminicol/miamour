import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { SearchIcon, XIcon, ChevronDownIcon, MessageSquareIcon, Mail, Phone } from "lucide-react";

const FAQs = () => {
  const [open, setOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const containerRef = useRef(null);
  
  // Parallax scrolling effects
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);
  const headerParallax = useTransform(scrollY, [0, 300], [0, -30]);
  const contentParallax = useTransform(scrollY, [100, 400], [0, -15]);
  const footerParallax = useTransform(scrollY, [300, 600], [0, -30]);

  const faqs = [
    { 
      id: 1,
      question: "How does miamour's matchmaking process work?", 
      answer: "Our matchmaking process is personalized and thorough. We begin with a detailed profile creation where you share your preferences, values, and relationship goals. Our advanced algorithm then matches you with compatible partners based on multiple factors including personality, interests, and life goals. You'll receive curated matches and can choose to connect with those who interest you.",
      tags: ["matchmaking", "process", "how it works"]
    },
    { 
      id: 2,
      question: "What areas does miamour cover for matchmaking?", 
      answer: "miamour offers matchmaking services both within Nigeria and internationally. Our platform connects singles across different regions, allowing you to find your perfect match regardless of location. We have a strong presence in major Nigerian cities and expanding global reach to help you find love wherever it may be.",
      tags: ["locations", "international", "coverage"]
    },
    { 
      id: 3,
      question: "How can I get support with my matchmaking journey?", 
      answer: "Our dedicated support team is available through multiple channels: email at support@miamour.com, live chat on our website, or by phone at +234 9112568963 during business hours (Monday-Friday, 9am-5pm WAT). We also offer personalized matchmaking consultations to help guide your journey to finding love.",
      tags: ["support", "contact", "help"]
    },
    { 
      id: 4,
      question: "What subscription plans does miamour offer?", 
      answer: "We offer four main subscription plans: Blossom (1 month), Harmony (3 months), My Forever (6 months), and Personalized Matching (1 year). Each plan comes with different features and benefits, from basic matchmaking to personalized matchmaking services with a dedicated matchmaker. You can upgrade, downgrade, or cancel your subscription at any time.",
      tags: ["subscription", "plans", "pricing"]
    },
    { 
      id: 5,
      question: "How do I know if my matches are verified?", 
      answer: "All profiles on miamour go through a thorough verification process. This includes identity verification, background checks, and profile validation. You can identify verified profiles by the verification badge displayed on their profile. We take your safety seriously and ensure all members are genuine in their search for love.",
      tags: ["verification", "safety", "trust"]
    },
    { 
      id: 6,
      question: "What makes miamour different from other matchmaking services?", 
      answer: "miamour stands out through our personalized approach to matchmaking, combining traditional matchmaking values with modern technology. We offer a unique blend of AI-powered matching algorithms and human matchmakers, ensuring both efficiency and personal touch. Our focus on meaningful connections, comprehensive verification process, and dedicated support team makes us the preferred choice for serious singles seeking long-term relationships.",
      tags: ["unique", "features", "benefits"]
    },
  ];

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  // Generate search suggestions based on query
  useEffect(() => {
    if (searchQuery.length > 2) {
      const allTags = faqs.flatMap(item => item.tags);
      const uniqueTags = [...new Set(allTags)];
      const matchingTags = uniqueTags.filter(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const questionMatches = faqs
        .filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(item => item.question);
      
      setSearchSuggestions([...matchingTags.slice(0, 3), ...questionMatches.slice(0, 2)]);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
  };

  const filteredFaqs = faqs.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Subtle Background Patterns */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white to-pink-50"
          style={{ transform: `translateY(${bgY.get()}px)` }}
        />
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ff69b4' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E')",
            transform: `translateY(${bgY.get() * 0.5}px)` 
          }}
        />
      </div>

      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          <span className="text-pink-800 font-medium">Back</span>
        </button>
      </div>

      <div className="min-h-screen py-12 px-6 max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div
          className="text-center mb-16 pt-10"
          style={{ transform: `translateY(${headerParallax.get()}px)` }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-800 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-pink-600 max-w-2xl mx-auto font-light">
            Find answers to common questions about our matchmaking services and your journey to finding love
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg border border-pink-100">
            <div className="pl-5 text-pink-400">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full p-4 focus:outline-none text-pink-800 font-medium"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button 
                className="pr-5 text-pink-400 hover:text-pink-600" 
                onClick={() => setSearchQuery('')}
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Search suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden">
              <ul>
                {searchSuggestions.map((suggestion, idx) => (
                  <li 
                    key={idx} 
                    className="px-5 py-3 hover:bg-pink-50 cursor-pointer text-pink-700 border-b border-pink-50 last:border-none"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main FAQ Content */}
        <div
          className="max-w-3xl mx-auto"
          style={{ transform: `translateY(${contentParallax.get()}px)` }}
        >
          {searchQuery && filteredFaqs.length === 0 && (
            <div className="bg-pink-50 border border-pink-100 rounded-xl p-8 text-center mb-10">
              <p className="text-pink-800 mb-3 text-xl">No results found for {searchQuery}</p>
              <p className="text-pink-600">Try a different search term or check out our popular topics below.</p>
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {["matchmaking", "subscription", "verification", "support", "coverage"].map(tag => (
                  <button 
                    key={tag}
                    className="px-4 py-2 bg-white border border-pink-200 rounded-full text-sm hover:bg-pink-100 text-pink-600"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id}
                className={`bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                  open === index ? 'shadow-lg border border-pink-200' : 'border border-gray-100 hover:border-pink-100'
                }`}
              >
                <div 
                  className={`flex justify-between items-center p-6 cursor-pointer ${
                    open === index ? 'bg-pink-50/70' : 'hover:bg-pink-50/30'
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-medium text-pink-900">{faq.question}</h3>
                  <div className={`transition-transform duration-300 ${open === index ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon className={`w-5 h-5 ${
                      open === index ? 'text-pink-600' : 'text-pink-400'
                    }`} />
                  </div>
                </div>
                
                {open === index && (
                  <div className="p-6 pt-0 border-t border-pink-100">
                    <p className="text-pink-800 leading-relaxed">
                      {faq.answer}
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {faq.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-pink-50 text-pink-600 text-sm rounded-full cursor-pointer hover:bg-pink-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tag);
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-right">
                      <span className="text-sm text-pink-500">Was this helpful?</span>
                      <div className="inline-flex ml-2">
                        <button className="p-2 mx-1 rounded hover:bg-pink-50 text-lg">
                          👍
                        </button>
                        <button className="p-2 mx-1 rounded hover:bg-pink-50 text-lg">
                          👎
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div 
          className="max-w-3xl mx-auto mt-16 p-10 bg-gradient-to-r from-pink-50 to-white border border-pink-100 rounded-xl text-center shadow-sm"
          style={{ transform: `translateY(${footerParallax.get()}px)` }}
        >
          <h3 className="text-2xl font-medium text-pink-800 mb-3">Ready to start your journey to love?</h3>
          <p className="text-pink-600 mb-8">Our matchmaking experts are here to guide you every step of the way.</p>
          <button 
            className="bg-pink-600 text-white py-3 px-8 rounded-xl hover:bg-pink-700 transition-colors font-medium flex items-center mx-auto shadow-md hover:shadow-lg"
            onClick={() => setShowContactModal(true)}
          >
            <MessageSquareIcon className="w-5 h-5 mr-2" />
            Contact Our Matchmakers
          </button>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center text-pink-400 text-sm">
          <p>© 2025 miamour. All rights reserved.</p>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl border border-pink-100"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XIcon className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-pink-800 mb-2">Contact Our Matchmakers</h3>
              <p className="text-gray-600">Get in touch with our expert matchmakers</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-5 bg-pink-50 rounded-xl">
                <Mail className="w-6 h-6 text-pink-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Email us at</p>
                  <a href="mailto:info@miamour.me" className="text-pink-600 font-medium hover:text-pink-700">
                    info@miamour.me
                  </a>
                </div>
              </div>

              <div className="flex items-center p-5 bg-pink-50 rounded-xl">
                <Phone className="w-6 h-6 text-pink-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Call us at</p>
                  <a href="tel:+234 9112568963" className="text-pink-600 font-medium hover:text-pink-700">
                    +234 9112568963
                  </a>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Available Monday - Friday</p>
                <p>9:00 AM - 5:00 PM WAT</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;