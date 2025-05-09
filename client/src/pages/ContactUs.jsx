import { useEffect, useState, useRef } from 'react';
import { MailIcon, PhoneIcon, MessageSquareIcon, ArrowLeft } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Refs for parallax elements
  const heroBgRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef(null);
  
  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply parallax effects
  useEffect(() => {
    if (heroBgRef.current) {
      heroBgRef.current.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    }
    if (formRef.current) {
      formRef.current.style.transform = `translateY(${-scrollPosition * 0.05}px)`;
    }
    if (cardsRef.current) {
      cardsRef.current.style.transform = `translateY(${-scrollPosition * 0.08}px)`;
    }
  }, [scrollPosition]);

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
      detail: "+234 9112568963",
      description: "Available Monday-Friday, 9am-5pm WAT.",
      icon: <PhoneIcon className="w-6 h-6" />,
      action: "Call Now",
      handler: () => window.location.href = "tel:+2349112568963"
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
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 overflow-hidden relative">
      {/* Fixed Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full transition-colors hover:bg-pink-50 text-pink-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
      </div>
      
      {/* Subtle Parallax Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div ref={heroBgRef} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-gradient-to-tl from-pink-200 to-pink-100 opacity-20 blur-3xl"></div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Hero Banner */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-pink-900 mb-6">Contact Us</h1>
          <p className="text-xl text-pink-700 max-w-2xl mx-auto">
            Get in touch with our support team for any questions or concerns.
          </p>
        </div>

        {/* Contact Methods */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white border border-pink-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-pink-50 rounded-full text-pink-700 mr-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-medium text-pink-900">{method.method}</h3>
              </div>
              <p className="text-pink-700 font-semibold mb-3 text-lg">{method.detail}</p>
              <p className="text-gray-600 mb-8 leading-relaxed">{method.description}</p>
              <button 
                className="w-full py-3 px-4 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition-colors font-medium"
                onClick={method.handler}
              >
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div ref={formRef} className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-md border border-pink-100">
          <h3 className="text-2xl font-semibold text-pink-900 mb-8">Send us a message</h3>
          {showConfirmation ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center text-green-800">
              <p className="font-medium text-xl mb-2">Thank you for your message!</p>
              <p>We will get back to you as soon as possible.</p>
            </div>
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
                    className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all" 
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
                    className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all" 
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
                  className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all" 
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-pink-600 text-white py-4 px-8 rounded-lg hover:bg-pink-700 transition-colors text-lg font-medium"
              >
                Submit
              </button>
            </form>
          )}
        </div>
        
        {/* Footer */}
        <div className="pt-20 pb-10 text-center text-pink-400 text-sm">
          <p>© 2025 miamour. All rights reserved.</p>
        </div>
      </div>
      
      {/* LiveChat component would go here */}
      {showLiveChat && (
        <div className="fixed bottom-6 right-6 w-96 h-128 bg-white shadow-xl rounded-2xl border border-pink-200 z-50">
          <div className="p-4 bg-pink-600 text-white rounded-t-2xl flex justify-between items-center">
            <h3 className="font-medium">Live Chat Support</h3>
            <button onClick={() => setShowLiveChat(false)} className="text-white hover:text-pink-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="p-4">
            <p className="text-center text-gray-500">Chat component would go here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsPage;