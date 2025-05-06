import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header } from "../components/Header";
import { MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';
import LiveChat from "../components/LiveChat";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showLiveChat, setShowLiveChat] = useState(false);
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const formY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 0.7], [100, 0]);
  
  // Update scroll position for additional parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contactMethods = [
    {
      method: "Email",
      detail: "info@miamour.me",
      description: "We typically respond within 24 hours.",
      icon: <MailIcon className="w-6 h-6" />,
      action: "Copy Email",
      handler: () => {
        navigator.clipboard.writeText("info@miamour.me");
        alert("Email copied to clipboard!");
      }
    },
    {
      method: "Live Chat",
      detail: "Available 24/7",
      description: "Get instant help from our support team.",
      icon: <MessageSquareIcon className="w-6 h-6" />,
      action: "Start Chat",
      handler: () => setShowLiveChat(true)
    },
    {
      method: "Phone",
      detail: "+234 9044130171",
      description: "Available Monday-Friday, 9am-5pm EST.",
      icon: <PhoneIcon className="w-6 h-6" />,
      action: "Call Now",
      handler: () => window.location.href = "tel:+2349044130171"
    }
  ];

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
          <BackButton />
          <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 overflow-hidden">
            {/* Parallax Background Elements */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
              <div 
                className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink-200"
                style={{ transform: `translateY(${scrollY * 0.2}px)` }}
              />
              <div 
                className="absolute top-60 right-20 w-48 h-48 rounded-full bg-pink-100"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              />
              <div 
                className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-pink-100"
                style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
              />
            </div>
            
            {/* Hero Banner */}
            <motion.div 
              className="bg-pink-500 text-white w-full relative z-10"
              style={{ y: heroY }}
            >
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                  <p className="text-xl opacity-90 max-w-3xl mx-auto">
                    Get in touch with our support team for any questions or concerns.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
              <motion.div 
                className="grid md:grid-cols-3 gap-6 mb-12"
                style={{ y: cardsY }}
              >
                {contactMethods.map((method, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white border border-pink-100 rounded-lg p-6 hover:shadow-lg transition-all"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.2)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ 
                      transform: `translateY(${scrollY * 0.08 * (index + 1)}px)` 
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-pink-100 rounded-full text-pink-600 mr-4">
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-medium text-gray-800">{method.method}</h3>
                    </div>
                    <p className="text-pink-600 font-semibold mb-3 text-lg">{method.detail}</p>
                    <p className="text-gray-600 mb-6">{method.description}</p>
                    <button 
                      className="w-full py-3 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-md transition-colors font-medium"
                      onClick={method.handler}
                    >
                      {method.action}
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md border border-pink-100 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                style={{ y: formY }}
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
                          className="w-full p-4 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" 
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
                          className="w-full p-4 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" 
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
                        className="w-full p-4 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" 
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
                        className="w-full p-4 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        required
                      ></textarea>
                    </div>
                    <motion.button 
                      type="submit" 
                      className="bg-pink-500 text-white py-4 px-8 rounded-md hover:bg-pink-600 transition-colors text-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      {showLiveChat && (
        <LiveChat onClose={() => setShowLiveChat(false)} />
      )}
    </div>
  );
};

export default ContactUsPage;