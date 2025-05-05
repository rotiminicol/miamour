import { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, User, Phone, Mail, MessageSquare, Sparkles } from 'lucide-react';

const MarriageCounseling = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [filter, setFilter] = useState('all');
  const [screenSize, setScreenSize] = useState('desktop');
  const [showConsultationPopup, setShowConsultationPopup] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const servicesParallax = useTransform(scrollY, [300, 600], [0, 50]);
  const expertsParallax = useTransform(scrollY, [600, 900], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const counselors = [
    { id: 1, name: "Dr. Sarah Johnson", specialties: ["Communication", "Intimacy"], rating: 4.9, reviews: 127, price: 150, availability: "Mon, Wed, Fri", bio: "Dr. Johnson helps couples rebuild trust and communication using cognitive-behavioral techniques.", category: "clinical" },
    { id: 2, name: "Dr. Michael Chen", specialties: ["Trust Building", "Family Dynamics"], rating: 4.8, reviews: 98, price: 135, availability: "Tue, Thu, Sat", bio: "Dr. Chen focuses on cultural dynamics and mutual understanding in relationships.", category: "family" },
    { id: 3, name: "Lisa Rodriguez, LMFT", specialties: ["Premarital Counseling", "Cultural Differences"], rating: 4.7, reviews: 85, price: 120, availability: "Mon-Fri", bio: "Lisa helps diverse couples build strong foundations before marriage.", category: "premarital" },
  ];

  const filteredCounselors = filter === 'all' ? counselors : counselors.filter(c => c.category === filter);

  const services = [
    { title: "Communication Coaching", description: "Learn to express needs and listen effectively.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { title: "Relationship Rebuilding", description: "Restore trust and emotional intimacy.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { title: "Premarital Preparation", description: "Build a strong foundation before marriage.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (bookingStep === 1) {
      setBookingStep(2);
      // Generate time slots based on counselor's availability
      const slots = generateTimeSlots(selectedCounselor.availability);
      setAvailableTimeSlots(slots);
    } else {
      // Here you would typically make an API call to save the booking
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Booking successful! We will contact you shortly to confirm your appointment.');
        
        // Reset form and close modal
        setBookingData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          message: ''
        });
        setBookingStep(1);
        setShowBookingForm(false);
        setSelectedCounselor(null);
      } catch (error) {
        alert('There was an error booking your appointment. Please try again.');
      }
    }
  };

  const generateTimeSlots = (availability) => {
    // This is a simplified version - in a real app, you'd check against actual booked slots
    const slots = [];
    const hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    availability.split(',').forEach(day => {
      hours.forEach(hour => {
        slots.push(`${day.trim()} at ${hour}`);
      });
    });
    return slots;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
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
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <Sparkles className="h-12 w-12 text-pink-200 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Rediscover Your 
              <span className="bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent"> Connection</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-pink-100 max-w-2xl mx-auto">
              Expert guidance to strengthen your relationship and build a lasting bond.
            </p>
            <motion.div 
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-pink-50 transition-all duration-300"
                onClick={() => setShowConsultationPopup(true)}
              >
                Book Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                onClick={() => window.scrollTo({ top: document.querySelector('.services-section').offsetTop - 100, behavior: 'smooth' })}
              >
                Explore Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          style={{ y: servicesParallax }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 services-section"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Sparkles className="h-10 w-10 text-pink-500 mx-auto" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Our Approach
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine evidence-based techniques with personalized care to help you build a stronger, more fulfilling relationship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(236, 72, 153, 0.15)" }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'clinical', 'family', 'premarital'].map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === category 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        <motion.div
          style={{ y: expertsParallax }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor, index) => (
              <motion.div
                key={counselor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer"
                onClick={() => setSelectedCounselor(counselor)}
              >
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{counselor.name}</h3>
                    <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full">${counselor.price}/hr</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-gray-700 font-medium">{counselor.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {counselor.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{specialty}</span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">Available: {counselor.availability}</span>
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
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to transform your relationship?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-pink-50"
            onClick={() => setShowConsultationPopup(true)}
          >
            Book Your Free Consultation
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCounselor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setSelectedCounselor(null);
              setShowBookingForm(false);
              setBookingStep(1);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              {!showBookingForm ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCounselor.name}</h2>
                    <button
                      onClick={() => {
                        setSelectedCounselor(null);
                        setShowBookingForm(false);
                        setBookingStep(1);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl mb-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center text-yellow-400">
                          {Array(Math.floor(selectedCounselor.rating)).fill('★').join('')}
                          <span className="text-gray-600 ml-2">({selectedCounselor.reviews})</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">${selectedCounselor.price}</div>
                        <div className="text-gray-600">per session</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-600">{selectedCounselor.bio}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Specialties</h3>
                      <ul className="space-y-1">
                        {selectedCounselor.specialties.map((specialty, index) => (
                          <li key={index} className="flex text-gray-600">
                            <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                      <p className="text-gray-600">{selectedCounselor.availability}</p>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Book Appointment
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {bookingStep === 1 ? "Your Information" : "Select Time Slot"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowBookingForm(false);
                        setBookingStep(1);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {bookingStep === 1 ? (
                      <>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="text"
                                name="name"
                                value={bookingData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="email"
                                name="email"
                                value={bookingData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Enter your email"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="tel"
                                name="phone"
                                value={bookingData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="date"
                                name="date"
                                value={bookingData.date}
                                onChange={handleInputChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                            <div className="grid grid-cols-2 gap-2">
                              {availableTimeSlots.map((slot, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setBookingData(prev => ({ ...prev, time: slot }))}
                                  className={`p-2 text-sm rounded-lg border ${
                                    bookingData.time === slot
                                      ? "bg-pink-600 text-white border-pink-600"
                                      : "border-gray-300 hover:border-pink-500"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                              <textarea
                                name="message"
                                value={bookingData.message}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                rows="3"
                                placeholder="Any specific concerns or topics you&apos;d like to discuss?"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between pt-4">
                      {bookingStep === 2 && (
                        <button
                          type="button"
                          onClick={() => setBookingStep(1)}
                          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        className={`px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors ${
                          bookingStep === 2 ? "ml-auto" : "w-full"
                        }`}
                      >
                        {bookingStep === 1 ? "Continue" : "Book Appointment"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConsultationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowConsultationPopup(false)}
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
                <h2 className="text-2xl font-bold text-gray-800">Book Your Free Consultation</h2>
                <button
                  onClick={() => setShowConsultationPopup(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600">
                  Booking a free consultation with Miamour is simple. Choose a counselor from our expert list, 
                  review their availability, and select a time slot that works for you. During the consultation, 
                  youll discuss your relationship goals and how our services can help. Theres no commitment 
                  required—use this opportunity to find the right counselor and start building a stronger connection.
                </p>
              </div>
              <button
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700"
                onClick={() => setShowConsultationPopup(false)}
              >
                View Counselors
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {screenSize === 'mobile' && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-pink-700"
            aria-label="Book Consultation"
            onClick={() => setShowConsultationPopup(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MarriageCounseling;