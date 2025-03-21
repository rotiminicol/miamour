import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from "../components/Header";
import { MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        {/* Hero Banner */}
        <div className="bg-blue-600 text-white w-full">
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
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Contact Form */}
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
      </div>
    </>
  );
};

export default ContactUsPage;