import { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const SchedulePage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const timeSlotsParallax = useTransform(scrollY, [300, 600], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const timeSlots = [
    { id: 1, time: '9:00 AM', counselor: 'Dr. Sarah Johnson', available: true },
    { id: 2, time: '10:00 AM', counselor: 'Dr. Michael Chen', available: true },
    { id: 3, time: '11:00 AM', counselor: 'Lisa Rodriguez, LMFT', available: false },
    { id: 4, time: '12:00 PM', counselor: 'Mark Wilson, LCSW', available: true },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsContactOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="relative bg-gradient-to-r from-pink-500 to-pink-700 text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20" 
          style={{ y: heroParallax }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} 
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }} 
          css={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Schedule Your Session</h1>
            <p className="text-xl mb-8 text-pink-100">Choose a time to start your journey.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          style={{ y: timeSlotsParallax }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Available Time Slots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeSlots.map((slot, index) => (
              <motion.div 
                key={slot.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                whileHover={{ y: -5 }} 
                className={`bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={() => slot.available && setSelectedSlot(slot)}
              >
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{slot.time}</h3>
                    <span className={`text-sm font-semibold ${slot.available ? 'text-green-600' : 'text-red-600'}`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <p className="text-gray-600">{slot.counselor}</p>
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
          className="bg-gradient-to-r from-pink-500 to-pink-700 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Need Assistance?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={() => setIsContactOpen(true)}
            className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-pink-50"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedSlot && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
            onClick={() => setSelectedSlot(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }} 
              transition={{ type: "spring", damping: 25 }} 
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedSlot.time}</h2>
                <button onClick={() => setSelectedSlot(null)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="bg-pink-50 p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center text-yellow-400">{Array(5).fill('★').join('')} <span className="text-gray-600 ml-2">(127 reviews)</span></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">$150</div>
                    <div className="text-gray-600">per session</div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Counselor</h3>
                <p className="text-gray-600">{selectedSlot.counselor}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">Confirm Booking</button>
                <button className="flex-1 bg-white border border-pink-600 text-pink-600 py-3 rounded-lg font-semibold hover:bg-pink-50">Reschedule</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }} 
              transition={{ type: "spring", damping: 25 }} 
              className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-gray-200/30" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">Contact Us</h2>
                <button 
                  onClick={() => setIsContactOpen(false)} 
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100/50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">Name</label>
                  <motion.input
                    whileFocus={{ borderColor: '#EC4899' }}
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                  <motion.input
                    whileFocus={{ borderColor: '#EC4899' }}
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                  <motion.textarea
                    whileFocus={{ borderColor: '#EC4899' }}
                    id="message"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50 h-32 resize-none"
                    placeholder="How can we assist you?"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="px-6 py-3 bg-white/50 text-gray-900 rounded-lg font-semibold hover:bg-white/70"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg font-semibold hover:bg-pink-700"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {screenSize === 'mobile' && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-6 right-6 z-40">
          <button 
            className="bg-pink-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-pink-700" 
            aria-label="Book Consultation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SchedulePage;