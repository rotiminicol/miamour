import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Calendar, User, Phone, Mail, MessageSquare, ChevronLeft, Heart, Shield, Star } from 'lucide-react';

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
    message: '',
    packageId: null
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

  const packages = [
    {
      id: 1,
      name: "Strong Foundation",
      description: "Pre-marital or relationship building",
      sessions: 5,
      priceNGN: 300000,
      priceUSD: 187.50,
      duration: "5 sessions",
      features: [
        "Comprehensive pre-marital assessment",
        "Communication skills development",
        "Conflict resolution strategies",
        "Financial planning guidance",
        "Family planning discussion"
      ]
    },
    {
      id: 2,
      name: "Reconnect Package",
      description: "For couples needing to rebuild trust",
      sessions: 5,
      priceNGN: 400000,
      priceUSD: 250.00,
      duration: "5 sessions",
      features: [
        "Trust rebuilding exercises",
        "Intimacy restoration",
        "Boundary setting",
        "Emotional healing",
        "Rebuilding connection"
      ]
    },
    {
      id: 3,
      name: "Better Together",
      description: "Strengthen communication and connection",
      sessions: 5,
      priceNGN: 350000,
      priceUSD: 218.75,
      duration: "5 sessions",
      features: [
        "Advanced communication techniques",
        "Conflict resolution",
        "Emotional intelligence",
        "Connection building",
        "Relationship growth"
      ]
    }
  ];

  const counselors = [
    { 
      id: 1, 
      name: "Dr. Sarah Johnson", 
      specialties: ["Communication", "Intimacy"], 
      rating: 4.9, 
      reviews: 127, 
      priceNGN: 150000, 
      priceUSD: 93.75, 
      availability: "Mon, Wed, Fri", 
      bio: "Dr. Johnson helps couples rebuild trust and communication using cognitive-behavioral techniques.", 
      category: "clinical" 
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      specialties: ["Trust Building", "Family Dynamics"], 
      rating: 4.8, 
      reviews: 98, 
      priceNGN: 135000, 
      priceUSD: 84.38, 
      availability: "Tue, Thu, Sat", 
      bio: "Dr. Chen focuses on cultural dynamics and mutual understanding in relationships.", 
      category: "family" 
    },
    { 
      id: 3, 
      name: "Lisa Rodriguez, LMFT", 
      specialties: ["Premarital Counseling", "Cultural Differences"], 
      rating: 4.7, 
      reviews: 85, 
      priceNGN: 100000, 
      priceUSD: 62.50, 
      availability: "Mon-Fri", 
      bio: "Lisa helps diverse couples build strong foundations before marriage.", 
      category: "premarital" 
    },
    { 
      id: 4, 
      name: "Dr. Aisha Bello", 
      specialties: ["Conflict Resolution", "Emotional Intimacy"], 
      rating: 4.6, 
      reviews: 72, 
      priceNGN: 120000, 
      priceUSD: 75.00, 
      availability: "Wed, Fri, Sat", 
      bio: "Dr. Bello specializes in helping couples navigate conflicts with empathy and understanding.", 
      category: "clinical" 
    },
    { 
      id: 5, 
      name: "Emeka Okoro, LPC", 
      specialties: ["Financial Stress", "Co-Parenting"], 
      rating: 4.8, 
      reviews: 110, 
      priceNGN: 175000, 
      priceUSD: 109.38, 
      availability: "Mon, Tue, Thu", 
      bio: "Emeka supports couples in managing financial stress and effective co-parenting strategies.", 
      category: "family" 
    },
    { 
      id: 6, 
      name: "Dr. Funmi Adebayo", 
      specialties: ["Blended Families", "Spiritual Counseling"], 
      rating: 4.9, 
      reviews: 95, 
      priceNGN: 200000, 
      priceUSD: 125.00, 
      availability: "Tue, Thu, Fri", 
      bio: "Dr. Adebayo integrates spiritual and practical approaches for blended family dynamics.", 
      category: "family" 
    },
  ];

  const filteredCounselors = filter === 'all' ? counselors : counselors.filter(c => c.category === filter);

  const services = [
    { title: "Communication Coaching", description: "Learn to express needs and listen effectively.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { title: "Relationship Rebuilding", description: "Restore trust and emotional intimacy.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { title: "Premarital Preparation", description: "Build a strong foundation before marriage.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Strengthen Your Bond",
      description: "Deepen your connection and understanding of each other"
    },
    {
      icon: <Shield className="w-6 h-6 text-pink-500" />,
      title: "Safe Space",
      description: "Confidential and supportive environment for open communication"
    },
    {
      icon: <Star className="w-6 h-6 text-pink-500" />,
      title: "Expert Guidance",
      description: "Professional counselors with years of experience"
    }
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (bookingStep === 1) {
      setBookingStep(2);
      const slots = generateTimeSlots(selectedCounselor.availability);
      setAvailableTimeSlots(slots);
    } else if (bookingStep === 2) {
      setBookingStep(3);
    } else {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const selectedPackage = packages.find(p => p.id === bookingData.packageId);
        
        alert(`Booking successful! Please complete the payment using the bank details provided. We will contact you shortly to confirm your appointment.
        
        Package: ${selectedPackage.name}
        Total Amount: ₦${selectedPackage.priceNGN.toLocaleString()} (~${selectedPackage.priceUSD})
        Sessions: ${selectedPackage.sessions}
        
        Bank Details:
        Bank: Providus Bank
        Account Name: Arigo Energy Services Ltd
        Account Number: 5400881912`);

        setBookingData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          message: '',
          packageId: null
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
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-100 hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
          <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-pink-50 to-white text-gray-800 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 0C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0zm0 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24zm0-48C14.327 6 6 14.327 6 30s8.327 24 24 24 24-8.327 24-24S45.673 6 30 6z' fill='%23EC4899' fill-opacity='0.3' fill-rule='evenodd'/></svg>")`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div style={{ transform: `translateY(${heroParallax.get()}px)` }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">
              Rediscover Your <span className="text-pink-600">Connection</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
              Expert guidance to strengthen your relationship and build a lasting bond.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-pink-100">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div style={{ transform: `translateY(${servicesParallax.get()}px)` }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">Our Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine evidence-based techniques with personalized care to help you build a stronger, more fulfilling relationship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-pink-100 text-center">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'clinical', 'family', 'premarital'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors border ${
                filter === category 
                  ? 'bg-pink-600 text-white border-pink-600' 
                  : 'bg-white text-gray-700 border-pink-100 hover:bg-pink-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ transform: `translateY(${expertsParallax.get()}px)` }} className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-gray-900">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor) => (
              <div
                key={counselor.id}
                className="bg-white rounded-xl border border-pink-100 hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedCounselor(counselor)}
              >
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{counselor.name}</h3>
                    <span className="bg-pink-50 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                      ₦{counselor.priceNGN.toLocaleString()}/hr (~${counselor.priceUSD})
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
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
              </div>
            ))}
          </div>
        </div>

        <div className="bg-pink-50 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12 mt-24">
          <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Ready to transform your relationship?</h2>
          <button
            className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700"
            onClick={() => setShowConsultationPopup(true)}
          >
            Book Your Consultation
          </button>
        </div>
      </div>

      {selectedCounselor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => { setSelectedCounselor(null); setShowBookingForm(false); setBookingStep(1); }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            {!showBookingForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCounselor.name}</h2>
                  <button
                    onClick={() => { setSelectedCounselor(null); setShowBookingForm(false); setBookingStep(1); }}
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
                      <div className="text-2xl font-bold text-pink-600">₦{selectedCounselor.priceNGN.toLocaleString()}</div>
                      <div className="text-gray-600">~${selectedCounselor.priceUSD} per session</div>
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
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {bookingStep === 1 ? "Your Information" : bookingStep === 2 ? "Select Time Slot" : "Payment Details"}
                  </h2>
                  <button
                    onClick={() => { setShowBookingForm(false); setBookingStep(1); }}
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Package</label>
                          <div className="relative">
                            <select
                              name="packageId"
                              value={bookingData.packageId}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            >
                              <option value="">Select a package</option>
                              {packages.map((pkg) => (
                                <option key={pkg.id} value={pkg.id}>
                                  {pkg.name} - ₦{pkg.priceNGN.toLocaleString()} (~${pkg.priceUSD})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
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
                  ) : bookingStep === 2 ? (
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
                          <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2">
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
                              placeholder="Any specific concerns or topics you'd like to discuss?"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Bank Transfer Details</h3>
                          <p className="text-gray-600 mb-4">Please make a bank transfer to the following account to confirm your booking. Include your name and appointment date in the transfer reference.</p>
                          <div className="bg-pink-50 p-4 rounded-lg">
                            <p className="text-gray-800"><strong>Package:</strong> {packages.find(p => p.id === bookingData.packageId)?.name}</p>
                            <p className="text-gray-800"><strong>Sessions:</strong> {packages.find(p => p.id === bookingData.packageId)?.sessions}</p>
                            <p className="text-gray-800"><strong>Amount:</strong> ₦{packages.find(p => p.id === bookingData.packageId)?.priceNGN.toLocaleString()} (~${packages.find(p => p.id === bookingData.packageId)?.priceUSD})</p>
                            <p className="text-gray-800"><strong>Bank:</strong> Providus Bank</p>
                            <p className="text-gray-800"><strong>Account Name:</strong> Arigo Energy Services Ltd</p>
                            <p className="text-gray-800"><strong>Account Number:</strong> 5400881912</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Note: Your appointment will be confirmed once we verify the payment. Please ensure the transfer is completed within 24 hours.</p>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between pt-4">
                    {bookingStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors ${
                        bookingStep === 1 || bookingStep === 2 ? "ml-auto" : "w-full"
                      }`}
                    >
                      {bookingStep === 1 ? "Continue" : bookingStep === 2 ? "Proceed to Payment" : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {showConsultationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowConsultationPopup(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Book Your Consultation</h2>
                <p className="text-gray-600 mt-1">Take the first step towards a stronger relationship</p>
              </div>
              <button
                onClick={() => setShowConsultationPopup(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What to Expect</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">30-Minute Session</h4>
                      <p className="text-gray-600">Initial consultation with a relationship expert</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Personalized Assessment</h4>
                      <p className="text-gray-600">Understanding your unique relationship needs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Customized Plan</h4>
                      <p className="text-gray-600">Tailored therapy recommendations for your journey</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Our expert counselors are here to help you navigate your journey to a more fulfilling partnership.
                  No commitment required - take the first step today.
                </p>
                <button
                  className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700"
                  onClick={() => { setShowConsultationPopup(false); }}
                >
                  View Our Counselors
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {screenSize === 'mobile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-700"
            aria-label="Book Consultation"
            onClick={() => setShowConsultationPopup(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap=" ILL round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MarriageCounseling;