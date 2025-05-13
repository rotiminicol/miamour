import { useState, useRef, useEffect } from 'react';
import { SearchIcon, XIcon, ChevronDownIcon, MailIcon, PhoneIcon, MessageSquareIcon, ChevronLeft } from 'lucide-react';

// Sleek floating back button
const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-8 left-8 z-30 flex items-center bg-white/90 border border-pink-100 shadow-lg rounded-full px-4 py-2 text-pink-600 font-semibold hover:bg-pink-50 transition-colors"
    aria-label="Go back"
  >
    <ChevronLeft className="h-5 w-5 mr-1" />
    Back
  </button>
);

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Parallax effect
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxRef1.current) parallaxRef1.current.style.transform = `translateY(${scrollY * 0.12}px)`;
      if (parallaxRef2.current) parallaxRef2.current.style.transform = `translateY(${scrollY * 0.22}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data
  const faqItems = [
    { id: 1, question: "How do I reset my password?", answer: "Use the 'Forgot Password' link on login page." },
    { id: 2, question: "How to update profile?", answer: "Go to account settings and edit your profile." },
    { id: 3, question: "Change subscription plan?", answer: "In Billing section, select new plan." },
  ];

  const contactMethods = [
    { 
      method: "Email", 
      detail: "info@miamour.me", 
      icon: <MailIcon className="w-5 h-5" />,
      action: () => window.location.href = "mailto:info@miamour.me"
    },
    { 
      method: "Live Chat", 
      detail: "Available 24/7", 
      icon: <MessageSquareIcon className="w-5 h-5" />,
      action: () => setIsChatOpen(true)
    },
    { 
      method: "Phone", 
      detail: "+234 9112568963", 
      icon: <PhoneIcon className="w-5 h-5" />,
      action: () => window.location.href = "tel:+2349112568963"
    },
  ];

  // Handlers
  const toggleFaq = (id) => setExpandedFaq(expandedFaq === id ? null : id);
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  // Chat functions
  const sendChatMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our support team will get back to you shortly.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Filter FAQs based on search
  const filteredFaqs = faqItems.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Parallax geometric background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          ref={parallaxRef1}
          width="100%" height="100%" viewBox="0 0 1440 600"
          className="absolute top-0 left-0"
          style={{ transition: 'transform 0.2s linear' }}
        >
          <circle cx="1200" cy="100" r="180" fill="#f0f4ff" opacity="0.7" />
          <rect x="100" y="400" width="300" height="120" rx="60" fill="#ffe4f0" opacity="0.5" />
        </svg>
        <svg
          ref={parallaxRef2}
          width="100%" height="100%" viewBox="0 0 1440 600"
          className="absolute top-0 left-0"
          style={{ transition: 'transform 0.2s linear' }}
        >
          <ellipse cx="400" cy="120" rx="120" ry="60" fill="#f7faff" opacity="0.7" />
          <rect x="900" y="350" width="220" height="80" rx="40" fill="#ffd6ec" opacity="0.4" />
        </svg>
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Sleek floating back button */}
      <BackButton />

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-[320px] flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80')`,
              filter: 'brightness(0.92) saturate(1.1)',
            }}
            aria-hidden="true"
          />
          {/* Soft white/pink overlay */}
          <div className="absolute inset-0 bg-white/80 bg-gradient-to-b from-white/90 via-pink-50/70 to-white/90" />
          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-pink-600">Help Center</h1>
            <p className="text-lg text-gray-700 opacity-90">We are here to help you</p>
            {/* Search */}
            <div className="max-w-md mx-auto mt-6 relative">
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow">
                <SearchIcon className="w-5 h-5 ml-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full p-4 focus:outline-none text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="pr-4 text-gray-400">
                    <XIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {['faq', 'contact', 'resources'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium ${
                  activeTab === tab
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-600 hover:bg-pink-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-pink-600">Common Questions</h2>
                <div className="space-y-3">
                  {filteredFaqs.map(faq => (
                    <div key={faq.id} className="border-b border-gray-100 pb-3">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="flex justify-between w-full text-left p-3 hover:bg-pink-50 rounded-lg"
                      >
                        <span className="font-medium">{faq.question}</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-3 pb-3 text-gray-600">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-pink-600">Contact Options</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {contactMethods.map((method, i) => (
                    <button
                      key={i}
                      onClick={method.action}
                      className="border border-gray-200 rounded-lg p-4 text-center hover:bg-pink-50 transition-colors"
                    >
                      <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        {method.icon}
                      </div>
                      <h3 className="font-medium">{method.method}</h3>
                      <p className="text-pink-600 mt-1">{method.detail}</p>
                    </button>
                  ))}
                </div>

                <h3 className="text-lg font-medium mb-4">Send us a message</h3>
                {showConfirmation ? (
                  <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                    Thank you! We will respond soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="p-3 border rounded-lg w-full"
                        required
                      />
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="p-3 border rounded-lg w-full"
                        required
                      />
                    </div>
                    <input
                      id="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="p-3 border rounded-lg w-full"
                      required
                    />
                    <textarea
                      id="message"
                      rows="4"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleFormChange}
                      className="p-3 border rounded-lg w-full"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-pink-600">Helpful Resources</h2>
                <div className="space-y-4">
                  {/* Getting Started Guide */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Getting Started Guide</h3>
                    <p className="text-gray-600 text-sm mb-3">Follow these steps to set up your miamour account and start exploring.</p>
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                      <li>Create an account by visiting the <a href="/signup" className="text-pink-600 hover:underline">Sign Up</a> page and entering your details.</li>
                      <li>Verify your email address via the confirmation link sent to your inbox.</li>
                      <li>Complete your profile in the Account Settings to personalize your experience.</li>
                      <li>Explore the dashboard to discover features like messaging, profiles, and subscriptions.</li>
                      <li>Contact support via Live Chat if you encounter any issues.</li>
                    </ul>
                    <a
                      href="/guides/getting-started"
                      className="mt-3 inline-block text-pink-600 hover:underline text-sm"
                    >
                      Read Full Guide
                    </a>
                  </div>

                  {/* Video Tutorials */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Video Tutorials</h3>
                    <p className="text-gray-600 text-sm mb-3">Watch our step-by-step video to learn how to navigate miamour.</p>
                    <div className="relative w-full h-0 pb-[56.25%]">
                      <video
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        controls
                        poster="https://via.placeholder.com/640x360?text=Video+Thumbnail"
                      >
                        <source src="" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">Note: Replace the video source with your asset.</p>
                  </div>

                  {/* Community Forum */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Community Forum</h3>
                    <p className="text-gray-600 text-sm mb-3">Join our vibrant community to ask questions, share tips, and connect with others.</p>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <a href="/forum/topics/welcome" className="text-pink-600 hover:underline">Welcome to the miamour Community</a>
                        <p className="text-gray-500 text-xs">Introduce yourself and meet other users.</p>
                      </div>
                      <div className="text-sm">
                        <a href="/forum/topics/tips" className="text-pink-600 hover:underline">Top Tips for New Users</a>
                        <p className="text-gray-500 text-xs">Learn best practices from experienced members.</p>
                      </div>
                      <div className="text-sm">
                        <a href="/forum/topics/support" className="text-pink-600 hover:underline">Technical Support Q&A</a>
                        <p className="text-gray-500 text-xs">Get help with common technical issues.</p>
                      </div>
                    </div>
                    <a
                      href="/forum"
                      className="mt-3 inline-block bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 text-sm"
                    >
                      Join the Forum
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Live Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
          <div className="bg-pink-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Live Chat Support</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-pink-200">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto max-h-64">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                Start chatting with our support team
              </div>
            ) : (
              <div className="space-y-2">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs p-2 rounded-lg ${msg.sender === 'user' 
                        ? 'bg-pink-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-pink-200' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <button
                onClick={sendChatMessage}
                className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12 text-center text-gray-600">
        <p>© 2025 miamour All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HelpSupport;