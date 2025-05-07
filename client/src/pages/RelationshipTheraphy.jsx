import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Heart, MessageCircle, Users, Award, Star, X,  ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RelationshipTherapy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [formData, setFormData] = useState({ name: '', email: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(1);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const servicesParallax = useTransform(scrollY, [300, 600], [0, 50]);
  const tabContentParallax = useTransform(scrollY, [600, 900], [0, 50]);
  const ctaParallax = useTransform(scrollY, [900, 1200], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = (content) => {
    setPopupContent(content);
    setShowPopup(true);
    setScheduleStep(1);
    setFormData({ name: '', email: '', date: '' });
  };

  const scrollToTabContent = () => {
    const tabContent = document.getElementById('tab-content');
    if (tabContent) tabContent.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (scheduleStep === 1) {
      setScheduleStep(2);
    } else {
      setIsSubmitting(true);
      try {
        await axios.post('/api/notifications/send-consultation-email', formData);
        setIsSubmitting(false);
        setShowPopup(false);
        setFormData({ name: '', email: '', date: '' });
        setScheduleStep(1);
        handleButtonClick('Consultation Success');
      } catch (error) {
        console.error('Error sending email:', error);
        setIsSubmitting(false);
        handleButtonClick('Consultation Error');
      }
    }
  };

  const testimonials = [
    {
      name: "Sarah & Mike",
      text: "The therapy sessions helped us communicate better. We're stronger than ever!",
      years: "Together 5 years",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Priya & James",
      text: "We were on the brink of separation, but the exercises helped us reconnect.",
      years: "Together 3 years",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b3ce551?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David & Chris",
      text: "Learning about our love languages transformed our relationship completely.",
      years: "Together 7 years",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const services = [
    {
      title: "Communication Coaching",
      description: "Learn effective ways to express needs and listen actively.",
      icon: <MessageCircle className="h-8 w-8 text-pink-600" />
    },
    {
      title: "Conflict Resolution",
      description: "Develop healthy strategies for resolving disagreements.",
      icon: <Users className="h-8 w-8 text-pink-600" />
    },
    {
      title: "Intimacy Building",
      description: "Reconnect emotionally and physically with your partner.",
      icon: <Heart className="h-8 w-8 text-pink-600" />
    },
    {
      title: "Relationship Assessment",
      description: "Identify strengths and growth areas in your relationship.",
      icon: <Award className="h-8 w-8 text-pink-600" />
    }
  ];

  const therapyPlans = [
    { name: "Starter", sessions: "4", priceNGN: 150000, priceUSD: 93.75, save: "15%" },
    { name: "Essential", sessions: "8", priceNGN: 300000, priceUSD: 187.50, save: "25%", popular: true },
    { name: "Premium", sessions: "12", priceNGN: 450000, priceUSD: 281.25, save: "35%" }
  ];

  const popupConfigs = {
    "Book a Consultation": {
      title: "Book a Consultation",
      content: (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {scheduleStep === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
              >
                Proceed to Payment
              </button>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bank Transfer Details</h3>
                <p className="text-gray-600 mb-4">Please make a bank transfer to confirm your consultation. Include your name and appointment date in the reference.</p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-gray-800"><strong>Bank:</strong> Providus Bank</p>
                  <p className="text-gray-800"><strong>Account Name:</strong> Arigo Energy Services Ltd</p>
                  <p className="text-gray-800"><strong>Account Number:</strong> 5400881912</p>
                  <p className="text-gray-800"><strong>Amount:</strong> ₦10,000 (~$6.25)</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Note: Your consultation will be confirmed once payment is verified. Complete the transfer within 24 hours.</p>
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setScheduleStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
                </button>
              </div>
            </>
          )}
        </form>
      )
    },
    "Consultation Error": {
      title: "Error Scheduling Consultation",
      content: (
        <div className="text-center space-y-4">
          <p className="text-gray-600">There was an error scheduling your consultation. Please try again later.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      )
    },
    "View Therapy Plans": {
      title: "Explore Our Therapy Plans",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">Choose from our tailored therapy packages to meet your relationship goals.</p>
          <div className="grid grid-cols-1 gap-4">
            {therapyPlans.map((plan, index) => (
              <div key={index} className={`bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-pink-100 ${plan.popular ? 'shadow-lg' : ''}`}>
                {plan.popular && (
                  <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">Most Popular</span>
                )}
                <h4 className="font-bold text-lg mt-2">{plan.name}</h4>
                <p className="text-sm">{plan.sessions} sessions</p>
                <p className="font-bold text-xl">₦{plan.priceNGN.toLocaleString()} (~${plan.priceUSD})</p>
                <p className="text-xs">Save {plan.save}</p>
                <button
                  onClick={() => handleButtonClick(plan.popular ? 'Select Plan' : 'Learn More')}
                  className="mt-2 bg-pink-600 text-white py-1 px-4 rounded-lg hover:bg-pink-700 text-sm"
                >
                  {plan.popular ? 'Select Plan' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    "Start Assessment": {
      title: "Begin Your Relationship Assessment",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Complete our online assessment to receive personalized insights about your relationship.</p>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800">Assessment Preview</h4>
            <p className="text-sm text-gray-600">Answer questions about communication, intimacy, and goals.</p>
          </div>
          <button
            onClick={() => handleButtonClick('Assessment Form')}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Start Assessment Now
          </button>
        </div>
      )
    },
    "Assessment Form": {
      title: "Relationship Assessment",
      content: (
        <form onSubmit={() => handleButtonClick('Assessment Success')} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How long have you been together?</label>
            <select
              className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
              required
            >
              <option value="">Select duration</option>
              <option value="less_than_1">Less than 1 year</option>
              <option value="1_3">1-3 years</option>
              <option value="3_5">3-5 years</option>
              <option value="5_plus">5+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary goal for therapy</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
              placeholder="e.g., Improve communication"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Submit Assessment
          </button>
        </form>
      )
    },
    "Assessment Success": {
      title: "Assessment Completed!",
      content: (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-pink-600" />
          </div>
          <p className="text-gray-600">Your assessment has been submitted! You will receive personalized insights via email within 24 hours.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      )
    },
    "Select Plan": {
      title: "Select Your Therapy Plan",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Confirm your plan to start your journey to a stronger relationship.</p>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-pink-100">
            <h4 className="font-bold text-lg">Essential Plan</h4>
            <p className="text-sm">8 sessions, ₦300,000 (~$187.50), Save 25%</p>
            <button
              onClick={() => handleButtonClick('Plan Confirmation')}
              className="mt-2 bg-pink-600 text-white py-1 px-4 rounded-lg hover:bg-pink-700 text-sm"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )
    },
    "Plan Confirmation": {
      title: "Plan Confirmed!",
      content: (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-pink-600" />
          </div>
          <p className="text-gray-600">Your Essential Plan has been confirmed. Check your email for next steps.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      )
    },
    "Learn More": {
      title: "Learn About Our Therapy Plans",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Explore the benefits of our tailored therapy packages.</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-1" />
              <p className="text-gray-600">Personalized sessions with certified therapists</p>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-1" />
              <p className="text-gray-600">Flexible scheduling for virtual or in-person</p>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-1" />
              <p className="text-gray-600">Ongoing support and resources</p>
            </div>
          </div>
          <button
            onClick={() => handleButtonClick('View Therapy Plans')}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            View All Plans
          </button>
        </div>
      )
    },
    "Schedule a Session": {
      title: "Schedule Your Therapy Session",
      content: (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {scheduleStep === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
              >
                Proceed to Payment
              </button>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bank Transfer Details</h3>
                <p className="text-gray-600 mb-4">Please make a bank transfer to confirm your session. Include your name and session date in the reference.</p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-gray-800"><strong>Bank:</strong> Providus Bank</p>
                  <p className="text-gray-800"><strong>Account Name:</strong> Arigo Energy Services Ltd</p>
                  <p className="text-gray-800"><strong>Account Number:</strong> 5400881912</p>
                  <p className="text-gray-800"><strong>Amount:</strong> ₦10,000 (~$6.25)</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Note: Your session will be confirmed once payment is verified. Complete the transfer within 24 hours.</p>
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setScheduleStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
                </button>
              </div>
            </>
          )}
        </form>
      )
    },
    "Learn More About Our Approach": {
      title: "Our Therapy Approach",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Discover our evidence-based techniques for relationship healing.</p>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800">Key Methods</h4>
            <p className="text-sm text-gray-600">We use Gottman Method, EFT, and personalized exercises.</p>
          </div>
          <button
            onClick={() => handleButtonClick('Book a Consultation')}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Book a Consultation
          </button>
        </div>
      )
    },
    "Consultation Success": {
      title: "Consultation Scheduled!",
      content: (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-pink-600" />
          </div>
          <p className="text-gray-600">Your consultation has been scheduled! Check your email for confirmation.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
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
            <Heart className="h-16 w-16 text-pink-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
              Relationship <span className="text-pink-600">Therapy</span>
            </h1>
            <p className="text-lg md:text-xl mt-4 mb-12 text-gray-600 max-w-2xl mx-auto">
              Strengthen your bond and rediscover connection with our expert-guided therapy.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleButtonClick('Book a Consultation')}
                className="bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => handleButtonClick('View Therapy Plans')}
                className="bg-white text-pink-600 border border-pink-100 py-3 px-6 rounded-lg font-semibold hover:bg-pink-50"
              >
                View Therapy Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div style={{ transform: `translateY(${servicesParallax.get()}px)` }} className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-white/90 backdrop-blur-sm p-1 border border-pink-100">
            {['about', 'services', 'testimonials'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  scrollToTabContent();
                }}
                className={`px-4 py-2 font-medium rounded-md transition-colors ${
                  activeTab === tab ? 'bg-pink-600 text-white' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div id="tab-content" style={{ transform: `translateY(${tabContentParallax.get()}px)` }} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-pink-100">
          {activeTab === 'about' && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Approach to Relationship Healing</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Our relationship therapy program is tailored to couples at any stage, offering personalized guidance to address your unique needs.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Using evidence-based techniques, our certified therapists create a safe space to foster communication, intimacy, and understanding.
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose Our Therapy?</h3>
                    <ul className="space-y-2">
                      {[
                        "Personalized approach for your unique relationship",
                        "Flexible scheduling with virtual and in-person options",
                        "Practical exercises you can implement immediately",
                        "Ongoing support between sessions"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-pink-600 mr-2 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Get Started Today</h3>
                  <p className="text-gray-600 mb-6">Follow our simple process to begin your journey:</p>
                  <ol className="space-y-4">
                    {[
                      "Schedule your consultation",
                      "Receive your personalized therapy plan",
                      "Begin your sessions with your matched therapist"
                    ].map((step, index) => (
                      <li key={index} className="flex">
                        <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-gray-600">{step}</p>
                      </li>
                    ))}
                  </ol>
                  <button
                    onClick={() => handleButtonClick('Book a Consultation')}
                    className="mt-8 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
                  >
                    Book a Consultation
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Our Therapy Services</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="p-3 bg-pink-100 rounded-lg mr-4">{service.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-pink-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Customized Therapy Packages</h3>
                <p className="text-gray-600 mb-6">Choose from our tailored packages to meet your specific needs.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {therapyPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-pink-100 ${plan.popular ? 'shadow-lg' : ''}`}
                    >
                      {plan.popular && (
                        <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">Most Popular</span>
                      )}
                      <h4 className="font-bold text-lg mt-2">{plan.name}</h4>
                      <p className="text-sm">{plan.sessions} sessions</p>
                      <p className="font-bold text-2xl">₦{plan.priceNGN.toLocaleString()} (~${plan.priceUSD})</p>
                      <p className="text-xs">Save {plan.save}</p>
                      <button
                        onClick={() => handleButtonClick(plan.popular ? 'Select Plan' : 'Learn More')}
                        className="mt-4 bg-pink-600 text-white py-1 px-4 rounded-lg hover:bg-pink-700 text-sm"
                      >
                        {plan.popular ? 'Select Plan' : 'Learn More'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.years}</p>
                      </div>
                    </div>
                    <div className="text-pink-600 mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="inline-block w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">{testimonial.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-8 bg-pink-50 rounded-xl text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Ready to Transform Your Relationship?</h3>
                <p className="text-gray-600 mb-8">Join hundreds of couples who have strengthened their bond with us.</p>
                <button
                  onClick={() => handleButtonClick('Book a Consultation')}
                  className="bg-pink-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-pink-700"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ transform: `translateY(${ctaParallax.get()}px)` }} className="mt-16 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Ready to Take the First Step?</h2>
          <p className="text-gray-600 mb-8">Our experts are here to help you build a stronger connection.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleButtonClick('Schedule a Session')}
              className="bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700"
            >
              Schedule a Session
            </button>
            <button
              onClick={() => handleButtonClick('Learn More About Our Approach')}
              className="bg-white text-pink-600 border border-pink-100 py-3 px-6 rounded-lg font-semibold hover:bg-pink-50"
            >
              Learn More About Our Approach
            </button>
          </div>
        </div>
      </div>

      {showPopup && popupContent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowPopup(false)}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl max-w-md w-full p-6 border border-pink-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-serif font-bold text-gray-800">{popupConfigs[popupContent].title}</h3>
              <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            {popupConfigs[popupContent].content}
          </div>
        </div>
      )}

      {screenSize === 'mobile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
            aria-label="Get Started"
            onClick={() => handleButtonClick('Book a Consultation')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default RelationshipTherapy;