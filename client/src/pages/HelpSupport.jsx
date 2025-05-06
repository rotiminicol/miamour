import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, XIcon, ChevronDownIcon, MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Data
  const faqItems = [
    { id: 1, question: "How do I reset my password?", answer: "Use the 'Forgot Password' link on login page." },
    { id: 2, question: "How to update profile?", answer: "Go to account settings and edit your profile." },
    { id: 3, question: "Change subscription plan?", answer: "In Billing section, select new plan." },
  ];

  const contactMethods = [
    { method: "Email", detail: "support@example.com", icon: <MailIcon className="w-5 h-5" /> },
    { method: "Live Chat", detail: "Available 24/7", icon: <MessageSquareIcon className="w-5 h-5" /> },
    { method: "Phone", detail: "+1 (555) 123-4567", icon: <PhoneIcon className="w-5 h-5" /> },
  ];

  // Handlers
  const toggleFaq = (id) => setExpandedFaq(expandedFaq === id ? null : id);
  const handleFormChange = (e) => setFormData({...formData, [e.target.id]: e.target.value});
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  // Filter FAQs based on search
  const filteredFaqs = faqItems.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
          <BackButton />
          {/* Hero Section */}
          <div className="bg-pink-600 text-white py-12 px-4 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold mb-3">Help Center</h1>
              <p className="text-lg opacity-90">Were here to help you</p>
              
              {/* Search */}
              <div className="max-w-md mx-auto mt-6 relative">
                <div className="flex items-center bg-white rounded-lg overflow-hidden shadow">
                  <SearchIcon className="w-5 h-5 ml-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search help articles..."
                    className="w-full p-4 focus:outline-none text-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="pr-4 text-gray-400">
                      <XIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              {['faq', 'contact', 'resources'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-medium ${
                    activeTab === tab 
                      ? 'bg-pink-600 text-white' 
                      : 'text-gray-600 hover:bg-pink-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Common Questions</h2>
                    <div className="space-y-3">
                      {filteredFaqs.map(faq => (
                        <div key={faq.id} className="border-b border-gray-100 pb-3">
                          <button 
                            onClick={() => toggleFaq(faq.id)}
                            className="flex justify-between w-full text-left p-3 hover:bg-pink-50 rounded-lg"
                          >
                            <span className="font-medium">{faq.question}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${
                              expandedFaq === faq.id ? 'transform rotate-180' : ''
                            }`} />
                          </button>
                          {expandedFaq === faq.id && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="px-3 pb-3 text-gray-600"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Contact Options</h2>
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {contactMethods.map((method, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 text-center">
                          <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            {method.icon}
                          </div>
                          <h3 className="font-medium">{method.method}</h3>
                          <p className="text-pink-600 mt-1">{method.detail}</p>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-4">Send us a message</h3>
                    {showConfirmation ? (
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                        Thank you! Well respond soon.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            id="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="p-3 border rounded-lg w-full"
                            required
                          />
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="p-3 border rounded-lg w-full"
                            required
                          />
                        </div>
                        <input
                          id="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleFormChange}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                        <textarea
                          id="message"
                          rows="4"
                          placeholder="Your message..."
                          value={formData.message}
                          onChange={handleFormChange}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                        <button 
                          type="submit" 
                          className="bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700"
                        >
                          Send Message
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Helpful Resources</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Getting Started Guide</h3>
                        <p className="text-gray-600 text-sm">Learn how to set up your account</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Video Tutorials</h3>
                        <p className="text-gray-600 text-sm">Step-by-step video guides</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Community Forum</h3>
                        <p className="text-gray-600 text-sm">Connect with other users</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 py-6 mt-12 text-center text-gray-600">
          <p>© 2025 miamour All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HelpSupport;