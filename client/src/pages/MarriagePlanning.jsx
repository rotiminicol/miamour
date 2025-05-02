import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from "../components/Header";
import { motion } from 'framer-motion';

const MarriagePlanning = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  
  const services = [
    {
      title: "Venue Selection & Church Arrangements",
      description: "Find the perfect venue, from churches to banquet halls, with full coordination of ceremonial needs and officiants."
    },
    {
      title: "Event Planning & Coordination",
      description: "We manage catering, decor, entertainment, and timelines for a stress-free, perfectly orchestrated wedding."
    },
    {
      title: "Legal Certificates & Documentation",
      description: "Assistance with marriage licenses and legal documents to ensure everything is ready for your big day."
    }
  ];

  const ContactPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
      >
        <h3 className="font-serif text-2xl font-semibold mb-4 text-gray-800">Contact Miamour</h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="font-medium text-gray-800">Phone</p>
              <p className="text-gray-600">+1 (800) 555-LOVE</p>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-gray-600">wedding@miamour.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-medium text-gray-800">Address</p>
              <p className="text-gray-600">123 Wedding Lane, Suite 101<br />Lovetown, CA 90210</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowContactPopup(false)}
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20" 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} 
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }} 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }} 
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Plan Your Dream Wedding with <span className="text-indigo-300">Miamour</span>
            </h1>
            <Link to="/counseling" className="inline-flex items-center text-indigo-200 hover:text-white transition-colors mb-8">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back to Counseling
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-center mb-8 text-gray-800">Our Wedding Planning Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -5 }} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="font-serif text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-4 text-white">Ready to Start Planning?</h2>
          <button 
            onClick={() => setShowContactPopup(true)}
            className="inline-block bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-50 transition-colors"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {showContactPopup && <ContactPopup />}
    </div>
  );
};

export default MarriagePlanning;