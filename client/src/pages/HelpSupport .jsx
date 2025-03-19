import { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, XIcon, ChevronDownIcon, ChevronRightIcon, MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
      tags: ["account", "password", "login"]
    },
    {
      id: 2,
      question: "How do I update my profile information?",
      answer: "Go to your account settings by clicking on your profile picture in the top right corner, then select 'Edit Profile'. From there, you can update your personal information, preferences, and notification settings.",
      tags: ["account", "profile", "settings"]
    },
    {
      id: 3,
      question: "Can I change my subscription plan?",
      answer: "Yes, you can change your subscription plan in the 'Billing' section of your account settings. We offer various plans to meet your needs. When upgrading, the change takes effect immediately. When downgrading, the new pricing takes effect at the start of your next billing cycle.",
      tags: ["billing", "subscription", "payment"]
    },
    {
      id: 4,
      question: "How do I cancel my subscription?",
      answer: "To cancel your subscription, go to 'Billing' in your account settings and click on 'Cancel Subscription'. You'll need to confirm your decision and provide a reason for cancellation. Your access will remain until the end of your current billing period.",
      tags: ["billing", "subscription", "cancellation"]
    },
    {
      id: 5,
      question: "How do I export my data?",
      answer: "You can export your data by going to Account Settings > Privacy > Download My Data. The export will be prepared and emailed to you within 24 hours as a compressed ZIP file.",
      tags: ["data", "export", "privacy"]
    },
    {
      id: 6,
      question: "Where can I change notification settings?",
      answer: "Notification settings can be found in Account Settings > Notifications. You can customize email, mobile, and in-app notifications for different types of activities and events.",
      tags: ["notifications", "settings", "preferences"]
    }
  ];

  const contactMethods = [
    {
      method: "Email",
      detail: "support@example.com",
      description: "We typically respond within 24 hours.",
      icon: <MailIcon className="w-6 h-6" />,
      action: "Copy Email"
    },
    {
      method: "Live Chat",
      detail: "Available 24/7",
      description: "Get instant help from our support team.",
      icon: <MessageSquareIcon className="w-6 h-6" />,
      action: "Start Chat"
    },
    {
      method: "Phone",
      detail: "+1 (555) 123-4567",
      description: "Available Monday-Friday, 9am-5pm EST.",
      icon: <PhoneIcon className="w-6 h-6" />,
      action: "Call Now"
    }
  ];

  const resourceCategories = [
    {
      id: "kb",
      title: "Knowledge Base",
      description: "Browse our extensive collection of articles and guides.",
      items: [
        "Getting Started Guide", 
        "Advanced Features Tutorial", 
        "Troubleshooting Common Issues", 
        "Account Management"
      ]
    },
    {
      id: "videos",
      title: "Video Tutorials",
      description: "Learn how to use our product with step-by-step video guides.",
      items: [
        "Quick Start Video", 
        "Feature Spotlight Series", 
        "Expert Tips & Tricks", 
        "Integration Tutorials"
      ]
    },
    {
      id: "guides",
      title: "User Guides",
      description: "Download comprehensive guides for our products.",
      items: [
        "Complete User Manual", 
        "Developer Documentation", 
        "API Reference Guide", 
        "Migration Guide"
      ]
    },
    {
      id: "community",
      title: "Community Forum",
      description: "Connect with other users and share your experiences.",
      items: [
        "Feature Requests", 
        "User Showcase", 
        "Integration Examples", 
        "Technical Discussions"
      ]
    }
  ];

  // Generate search suggestions based on query
  useEffect(() => {
    if (searchQuery.length > 2) {
      const allTags = faqItems.flatMap(item => item.tags);
      const uniqueTags = [...new Set(allTags)];
      const matchingTags = uniqueTags.filter(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const questionMatches = faqItems
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

  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    // Reset form after "submission"
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setShowConfirmation(false);
    }, 3000);
  };

  const handleResourceClick = (categoryId) => {
    setSelectedResource(selectedResource === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-blue-600 text-white w-full">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Help & Support Center</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Get the assistance you need with our comprehensive support resources
            </p>
          </motion.div>
          
          {/* Search Bar with Suggestions */}
          <div className="max-w-3xl mx-auto mt-8 relative">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="pl-5 text-gray-400">
                <SearchIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="What can we help you with today?"
                className="w-full p-5 focus:outline-none text-gray-700 text-lg"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              />
              {searchQuery && (
                <button 
                  className="pr-5 text-gray-400 hover:text-gray-600" 
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
                  className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ul>
                    {searchSuggestions.map((suggestion, idx) => (
                      <li 
                        key={idx} 
                        className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-gray-700"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-200 overflow-x-auto justify-center">
          {['faq', 'contact', 'resources'].map((tab) => (
            <motion.button 
              key={tab}
              className={`px-8 py-4 font-medium text-lg whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: activeTab !== tab ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'faq' 
                ? 'FAQ' 
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {/* FAQ Section */}
            {activeTab === 'faq' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
                  <div className="text-sm text-gray-500">
                    {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
                  </div>
                </div>
                
                {searchQuery && filteredFaqs.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                    <p className="text-gray-700 mb-3 text-lg">No results found for {searchQuery}</p>
                    <p className="text-gray-600">Try a different search term or check out our popular topics below.</p>
                    <div className="flex flex-wrap gap-3 justify-center mt-6">
                      {["password", "billing", "account", "notifications", "login"].map(tag => (
                        <button 
                          key={tag}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100"
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
                        expandedFaq === index ? 'border-blue-300 shadow-md' : 'border-gray-200'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div 
                        className={`flex justify-between items-center p-5 cursor-pointer 
                          ${expandedFaq === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        onClick={() => toggleFaq(index)}
                      >
                        <h3 className="text-xl font-medium text-gray-800">{faq.question}</h3>
                        <motion.div
                          animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        >
                          <ChevronDownIcon className={`w-6 h-6 ${
                            expandedFaq === index ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                        </motion.div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-0 border-t border-gray-200">
                              <p className="text-gray-600 text-lg">{faq.answer}</p>
                              
                              <div className="mt-6 flex flex-wrap gap-2">
                                {faq.tags.map(tag => (
                                  <span 
                                    key={tag} 
                                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full cursor-pointer hover:bg-gray-200"
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
                                <span className="text-sm text-gray-500">Was this helpful?</span>
                                <div className="inline-flex ml-2">
                                  <button className="p-2 mx-1 rounded hover:bg-gray-100 text-lg">
                                    👍
                                  </button>
                                  <button className="p-2 mx-1 rounded hover:bg-gray-100 text-lg">
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
              </div>
            )}
            
            {/* Contact Us Section */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-8 text-lg">Our support team is ready to assist you. Choose your preferred contact method:</p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {contactMethods.map((method, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
                      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
                          {method.icon}
                        </div>
                        <h3 className="text-xl font-medium text-gray-800">{method.method}</h3>
                      </div>
                      <p className="text-blue-600 font-semibold mb-3 text-lg">{method.detail}</p>
                      <p className="text-gray-600 mb-6">{method.description}</p>
                      <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors font-medium">
                        {method.action}
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <h3 className="text-2xl font-medium text-gray-800 mb-6">Send us a message</h3>
                  {showConfirmation ? (
                    <motion.div 
                      className="bg-green-50 border border-green-200 rounded-lg p-6 text-center text-green-800"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p className="font-medium text-xl">Thank you for your message!</p>
                      <p className="mt-2">Well get back to you as soon as possible.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <input 
                          type="text" 
                          id="subject" 
                          value={formData.subject}
                          onChange={handleFormChange}
                          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea 
                          id="message" 
                          rows="6" 
                          value={formData.message}
                          onChange={handleFormChange}
                          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        ></textarea>
                      </div>
                      <motion.button 
                        type="submit" 
                        className="bg-blue-600 text-white py-4 px-8 rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              </div>
            )}
            
            {/* Resources Section */}
            {activeTab === 'resources' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resources</h2>
                <p className="text-gray-600 mb-8 text-lg">Find helpful guides, tutorials, and community resources to get the most out of our platform.</p>
                
                <div className="space-y-6">
                  {resourceCategories.map((category, index) => (
                    <motion.div 
                      key={category.id}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div 
                        className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleResourceClick(category.id)}
                      >
                        <div>
                          <h3 className="text-xl font-medium text-gray-800">{category.title}</h3>
                          <p className="text-gray-600">{category.description}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: selectedResource === category.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                        </motion.div>
                      </div>
                      
                      <AnimatePresence>
                        {selectedResource === category.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 bg-gray-50 border-t border-gray-200">
                              <ul className="grid md:grid-cols-2 gap-4">
                                {category.items.map((item, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <button className="text-blue-600 hover:text-blue-800 hover:underline text-left flex items-center py-2 text-lg">
                                      <span className="mr-2">•</span> {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-6 text-right">
                                <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                  View All {category.title}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-12 p-8 bg-blue-50 border border-blue-200 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Cant find what youre looking for?</h3>
                  <p className="text-gray-600 mb-6 text-lg">Our team is ready to help you with any questions you may have.</p>
                  <motion.button 
                    className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('contact')}
                  >
                    Contact Support
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold mb-2">Company Name</h4>
              <p className="text-gray-400">Support available 24/7</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpSupport;