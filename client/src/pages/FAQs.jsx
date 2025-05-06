import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SearchIcon, XIcon, ChevronDownIcon, MessageSquareIcon, Mail, Phone } from "lucide-react";
import { Header } from "../components/Header";
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const FAQs = () => {
  const [open, setOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Parallax scrolling effects
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const searchOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const faqsScale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

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
      answer: "Our dedicated support team is available through multiple channels: email at support@miamour.com, live chat on our website, or by phone at +234 9044130171 during business hours (Monday-Friday, 9am-5pm WAT). We also offer personalized matchmaking consultations to help guide your journey to finding love.",
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
    setSearchFocused(false);
  };

  const filteredFaqs = faqs.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
          <BackButton />
          {/* Parallax background layers */}
          <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white"
              style={{ y: bgY }}
            />
            <motion.div 
              className="absolute inset-0 opacity-5"
              style={{ 
                backgroundImage: "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff69b4' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')",
                y: useTransform(scrollY, [0, 500], [0, 150]) 
              }}
            />
          </div>

          <div className="min-h-screen py-12 px-4 relative z-10"> 
          <div className="w-full max-w-4xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: headerY }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4 text-pink-600">Frequently Asked Questions</h1>
              <p className="text-xl text-pink-500 max-w-3xl mx-auto">
                Find answers to common questions about our matchmaking services and your journey to finding love
              </p>
            </motion.div>
            
            {/* Search Bar with Suggestions */}
            <motion.div 
              className="max-w-2xl mx-auto mb-12 relative"
              style={{ opacity: searchOpacity }}
            >
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md border border-pink-200">
                <div className="pl-5 text-pink-400">
                  <SearchIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full p-4 focus:outline-none text-pink-700"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
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
              <AnimatePresence>
                {searchFocused && searchSuggestions.length > 0 && (
                  <motion.div 
                    className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-pink-200 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ul>
                      {searchSuggestions.map((suggestion, idx) => (
                        <li 
                          key={idx} 
                          className="px-5 py-3 hover:bg-pink-50 cursor-pointer text-pink-700"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Main FAQ Content */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-pink-100"
              style={{ scale: faqsScale }}
            >
              {searchQuery && filteredFaqs.length === 0 && (
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-8 text-center mb-6">
                  <p className="text-pink-700 mb-3 text-lg">No results found for {searchQuery}</p>
                  <p className="text-pink-600">Try a different search term or check out our popular topics below.</p>
                  <div className="flex flex-wrap gap-3 justify-center mt-6">
                    {["returns", "shipping", "payment", "support", "warranty"].map(tag => (
                      <button 
                        key={tag}
                        className="px-4 py-2 bg-white border border-pink-300 rounded-full text-sm hover:bg-pink-100 text-pink-600"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div 
                    key={faq.id}
                    className={`border rounded-lg overflow-hidden ${
                      open === index ? 'border-pink-300 shadow-md' : 'border-pink-200'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -2 }} // Subtle hover effect
                  >
                    <div 
                      className={`flex justify-between items-center p-5 cursor-pointer 
                        ${open === index ? 'bg-pink-50' : 'hover:bg-pink-50'}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-medium text-pink-800">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: open === index ? 180 : 0 }}
                      >
                        <ChevronDownIcon className={`w-5 h-5 ${
                          open === index ? 'text-pink-600' : 'text-pink-500'
                        }`} />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {open === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 border-t border-pink-200">
                            <p className="text-pink-800 text-lg">{faq.answer}</p>
                            
                            <div className="mt-6 flex flex-wrap gap-2">
                              {faq.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="px-3 py-1 bg-pink-100 text-pink-600 text-sm rounded-full cursor-pointer hover:bg-pink-200"
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
                                <button className="p-2 mx-1 rounded hover:bg-pink-100 text-lg">
                                  👍
                                </button>
                                <button className="p-2 mx-1 rounded hover:bg-pink-100 text-lg">
                                  👎
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Support Section */}
            <motion.div 
              className="mt-12 p-8 bg-pink-50 border border-pink-200 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileInView={{ scale: [0.98, 1] }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h3 className="text-xl font-medium text-pink-800 mb-3">Ready to start your journey to love?</h3>
              <p className="text-pink-600 mb-6">Our matchmaking experts are here to guide you every step of the way.</p>
              <motion.button 
                className="bg-pink-600 text-white py-3 px-8 rounded-md hover:bg-pink-700 transition-colors font-medium flex items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactModal(true)}
              >
                <MessageSquareIcon className="w-5 h-5 mr-2" />
                Contact Our Matchmakers
              </motion.button>
            </motion.div>

            {/* Contact Modal */}
            <AnimatePresence>
              {showContactModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowContactModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl p-8 max-w-md w-full relative"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <XIcon className="w-6 h-6" />
                    </button>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-pink-600 mb-2">Contact Our Matchmakers</h3>
                      <p className="text-gray-600">Get in touch with our expert matchmakers</p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center p-4 bg-pink-50 rounded-lg">
                        <Mail className="w-6 h-6 text-pink-600 mr-4" />
                        <div>
                          <p className="text-sm text-gray-600">Email us at</p>
                          <a href="mailto:info@miamour.me" className="text-pink-600 font-medium hover:text-pink-700">
                            info@miamour.me
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-pink-50 rounded-lg">
                        <Phone className="w-6 h-6 text-pink-600 mr-4" />
                        <div>
                          <p className="text-sm text-gray-600">Call us at</p>
                          <a href="tel:+2345551234567" className="text-pink-600 font-medium hover:text-pink-700">
                            +234 9044130171
                          </a>
                        </div>
                      </div>

                      <div className="text-center text-sm text-gray-500 mt-4">
                        <p>Available Monday - Friday</p>
                        <p>9:00 AM - 5:00 PM WAT</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Footer */}
            <motion.div 
              className="mt-16 text-center text-pink-500 text-sm"
              style={{ y: useTransform(scrollY, [0, 500], [0, -30]) }}
            >
              <p>© 2025 miamour. All rights reserved.</p>
            </motion.div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default FAQs;