import { useState } from 'react';
import { Header } from "../components/Header";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Calendar, FileText, Phone, Mail, MapPin, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const MarriagePlanning = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  
  const services = [
    {
      title: "Venue Selection & Church Arrangements",
      description: "Find the perfect venue, from churches to banquet halls, with full coordination of ceremonial needs and officiants.",
      icon: Calendar,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Event Planning & Coordination",
      description: "We manage catering, decor, entertainment, and timelines for a stress-free, perfectly orchestrated wedding.",
      icon: Heart,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Legal Certificates & Documentation",
      description: "Assistance with marriage licenses and legal documents to ensure everything is ready for your big day.",
      icon: FileText,
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const ContactPopup = () => (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl border border-pink-100 relative"
      >
        <motion.button
          onClick={() => setShowContactPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Contact miamour
          </h3>
          <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
        </div>

        <div className="space-y-6">
          <motion.div 
            className="flex items-start bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)" }}
          >
            <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg mr-4">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Phone</p>
              <p className="text-gray-600">+1 (800) 555-LOVE</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)" }}
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-gray-600">wedding@miamour.com</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)" }}
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-4">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Address</p>
              <p className="text-gray-600">123 Wedding Lane, Suite 101<br />Lovetown, CA 90210</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
          <BackButton />
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white overflow-hidden">
              <motion.div 
                className="absolute inset-0 opacity-20" 
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} 
                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }} 
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', 
                  backgroundAttachment: 'fixed',
                  backgroundSize: '100px 100px'
                }} 
              />
              <div className="container mx-auto px-4 py-16 text-center relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-pink-200 mr-2" />
                    <h1 className="text-4xl md:text-5xl font-bold">
                      Plan Your Dream Wedding with <span className="text-pink-200">miamour</span>
                    </h1>
                    <Sparkles className="h-6 w-6 text-pink-200 ml-2" />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-12 relative">
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }} 
                className="mb-12"
              >
                <div className="flex items-center justify-center mb-8">
                  <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Our Wedding Planning Services
                  </h2>
                  <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.15)" }}
                      className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-pink-100 relative overflow-hidden group"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`} />
                      <div className="relative z-10">
                        <div className={`p-3 bg-gradient-to-r ${service.gradient} rounded-xl inline-block mb-4`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }} 
                className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] bg-repeat opacity-20" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-pink-200 mr-2" />
                    <h2 className="text-3xl font-bold text-white">Ready to Start Planning?</h2>
                    <Sparkles className="h-6 w-6 text-pink-200 ml-2" />
                  </div>
                  <motion.button 
                    onClick={() => setShowContactPopup(true)}
                    className="inline-block bg-white text-pink-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:bg-pink-50 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showContactPopup && <ContactPopup />}
      </AnimatePresence>
    </div>
  );
};

// Inline CSS for parallax effect
const styles = `
  html, body {
    scroll-behavior: smooth;
  }
  .parallax-hero {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .parallax-section {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default MarriagePlanning;