import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SearchIcon, XIcon, ChevronDownIcon, MessageSquareIcon } from "lucide-react";
import { Header } from "../components/Header";

const FAQs = () => {
  const [open, setOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  // Parallax scrolling effects
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const searchOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const faqsScale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

  const faqs = [
    { 
      id: 1,
      question: "What is your return policy?", 
      answer: "We accept returns within 30 days of delivery. Items must be in their original condition with tags attached. To initiate a return, please go to your order history and select the item you wish to return. You'll receive a prepaid shipping label via email.",
      tags: ["returns", "shipping", "policy"]
    },
    { 
      id: 2,
      question: "Do you ship internationally?", 
      answer: "Yes, we ship worldwide to over 150 countries. International shipping rates vary by location and are calculated at checkout. Please note that customs fees and import duties may apply depending on your country's regulations and are the responsibility of the customer.",
      tags: ["shipping", "international", "delivery"]
    },
    { 
      id: 3,
      question: "How can I contact support?", 
      answer: "You can reach our customer support team through multiple channels: via email at support@example.com, through our live chat available 24/7 on our website, or by phone at +1 (555) 123-4567 during business hours (Monday-Friday, 9am-5pm EST).",
      tags: ["support", "contact", "help"]
    },
    { 
      id: 4,
      question: "What payment methods do you accept?", 
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For orders over $1000, we also offer financing options through Affirm.",
      tags: ["payment", "checkout", "billing"]
    },
    { 
      id: 5,
      question: "How do I track my order?", 
      answer: "Once your order ships, you'll receive a tracking number via email and text (if opted in). You can also view your order status and tracking information in your account under 'Order History'. Most orders update within 24 hours of shipment.",
      tags: ["orders", "shipping", "tracking"]
    },
    { 
      id: 6,
      question: "What is your warranty policy?", 
      answer: "All products come with a standard 1-year warranty against manufacturer defects. Some premium items offer extended warranty options that can be purchased at checkout. To claim warranty service, please contact our support team with your order details and a description of the issue.",
      tags: ["warranty", "returns", "policy"]
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
    <>
      <Header />
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
            Find answers to common questions about our products and services
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
          <h3 className="text-xl font-medium text-pink-800 mb-3">Still have questions?</h3>
          <p className="text-pink-600 mb-6">Our support team is ready to help you with any questions you may have.</p>
          <motion.button 
            className="bg-pink-600 text-white py-3 px-8 rounded-md hover:bg-pink-700 transition-colors font-medium flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquareIcon className="w-5 h-5 mr-2" />
            Contact Support
          </motion.button>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          className="mt-16 text-center text-pink-500 text-sm"
          style={{ y: useTransform(scrollY, [0, 500], [0, -30]) }}
        >
          <p>© 2025 Your Company Name. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-pink-700">Terms</a>
            <a href="#" className="hover:text-pink-700">Privacy</a>
            <a href="#" className="hover:text-pink-700">Contact</a>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  
  );
};

export default FAQs;