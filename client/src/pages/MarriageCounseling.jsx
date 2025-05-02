import { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { AnimatePresence, motion } from 'framer-motion';

const MarriageCounseling = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [filter, setFilter] = useState('all');
  const [screenSize, setScreenSize] = useState('desktop');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
        <motion.div className="absolute inset-0 opacity-20" animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }} />
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Rediscover Your Connection</h1>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-50">Begin Your Journey</motion.button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'clinical', 'family', 'premarital'].map(category => (
            <button key={category} onClick={() => setFilter(category)} className={`px-4 py-2 rounded-full ${filter === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor, index) => (
              <motion.div key={counselor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer" onClick={() => setSelectedCounselor(counselor)}>
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{counselor.name}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">${counselor.price}/hr</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-gray-700 font-medium">{counselor.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {counselor.specialties.map((specialty, idx) => <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{specialty}</span>)}
                  </div>
                  <span className="text-gray-500 text-sm">Available: {counselor.availability}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to transform your relationship?</h2>
          <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-50">Book Your Free Consultation</motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCounselor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCounselor(null)}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ type: "spring", damping: 25 }} className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCounselor.name}</h2>
                <button onClick={() => setSelectedCounselor(null)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center text-yellow-400">{Array(Math.floor(selectedCounselor.rating)).fill('★').join('')} <span className="text-gray-600 ml-2">({selectedCounselor.reviews})</span></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-700">${selectedCounselor.price}</div>
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
                  <ul className="space-y-1">{selectedCounselor.specialties.map((specialty, index) => <li key={index} className="flex text-gray-600"><svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>{specialty}</li>)}</ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                  <p className="text-gray-600">{selectedCounselor.availability}</p>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Book Appointment</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {screenSize === 'mobile' && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-6 right-6 z-40">
          <button className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700" aria-label="Book Consultation">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MarriageCounseling;