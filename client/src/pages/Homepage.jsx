
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, CreditCard, FileText, User, Settings, HelpCircle, Users, Sparkles } from 'lucide-react';
import useMatchStore from '../store/matchStore';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import { Header } from '../components/Header';

const Homepage = () => {
  const navigate = useNavigate();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const { matchCard, loading, fetchMatchCard } = useMatchStore();
  const { authUser, checkAuth } = useAuthStore();

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

  // Fetch user profile and match card status when component mounts
  useEffect(() => {
    const fetchAndWatchMatchCard = async () => {
      await checkAuth();
      await fetchMatchCard();

      // Watch for URL changes to refresh match card status
      const handleLocationChange = async () => {
        await fetchMatchCard();
      };

      window.addEventListener('hashchange', handleLocationChange);
      window.addEventListener('popstate', handleLocationChange);

      return () => {
        window.removeEventListener('hashchange', handleLocationChange);
        window.removeEventListener('popstate', handleLocationChange);
      };
    };

    fetchAndWatchMatchCard();
    // eslint-disable-next-line
  }, [fetchMatchCard, checkAuth]);

  // Handle match card activation success
  const handleMatchCardActivation = () => {
    // Set match card status to active
    useMatchStore.setState({ matchCard: { status: 'active' } });
  };

  // Categories data
  const categories = {
    services: [
      { icon: <Heart size={24} className="text-pink-500" />, text: 'Marriage Counseling', to: '/marriage-counseling', description: 'Build a lasting partnership.' },
      { icon: <Users size={24} className="text-pink-400" />, text: 'Relationship Therapy', to: '/relationship-therapy', description: 'Strengthen your bond.' },
      { icon: <MessageCircle size={24} className="text-pink-400" />, text: 'miamour App', to: '/dating-app', description: 'Connect with matches.' },
      { icon: <Calendar size={24} className="text-pink-300" />, text: 'Schedule', to: '/schedule', description: 'Book your sessions.' },
      { icon: <Sparkles size={24} className="text-pink-500" />, text: 'Ceremony Planning', to: '/ceremony-planning', description: 'Plan your dream event.' },
      { icon: <MessageCircle size={24} className="text-pink-500" />, text: 'Personalized Matching', to: '/getting-started', description: 'Find your perfect partner.' },
    ],
    billing: [
      { icon: <CreditCard size={24} className="text-pink-500" />, text: 'Payment Methods', to: '/billing-process', description: 'Manage payments.' },
      { icon: <FileText size={24} className="text-pink-400" />, text: 'Insets: invoices', to: '/invoices', description: 'View billing history.' },
    ],
    settings: [
      { icon: <User size={24} className="text-pink-500" />, text: 'My Account', to: '/profile', description: 'Update your profile.' },
      { icon: <Settings size={24} className="text-pink-400" />, text: 'Preferences', to: '/preference', description: 'Customize settings.' },
    ],
    support: [
      { icon: <HelpCircle size={24} className="text-pink-500" />, text: 'Get Help', to: '/help-support', description: 'Contact support.' },
      { icon: <HelpCircle size={24} className="text-pink-400" />, text: 'FAQs', to: '/faqs', description: 'Find answers.' },
    ],
  };

  // Hero content
  const heroContent = {
    title: 'Find Your Soulmate',
    subtitle: 'Connect with someone who completes you.',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  };

  // Wedding advertisements
  const weddingAdvertisements = [
    {
      id: 1,
      title: 'Dream Wedding Venues',
      description: 'Discover breathtaking locations for your special day.',
      imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Explore Venues',
      to: '/wedding-venues',
    },
    {
      id: 2,
      title: 'Bridal Elegance',
      description: 'Find the perfect dress from top designers.',
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Shop Dresses',
      to: '/bridal-fashion',
    },
    {
      id: 3,
      title: 'Honeymoon Bliss',
      description: 'Plan your romantic getaway with exclusive deals.',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Book Now',
      to: '/honeymoon-destinations',
    },
  ];

  // Auto-advance carousel (no controls, no dots)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % weddingAdvertisements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [weddingAdvertisements.length]);

  // Popup logic
  const handleAwaitingMatchClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <Header />

        {/* Parallax geometric background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

        <main className="relative z-10">
          {/* Hero Section */}
          <section
            className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%), url(${heroContent.bgImage}) center/cover no-repeat`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-pink-50/60 to-white/90" />
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-pink-600" style={{ letterSpacing: '-0.03em' }}>
                {heroContent.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 font-light">
                {heroContent.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {matchCard?.status === 'active' ? (
                  <button
                    aria-label="Awaiting Match"
                    className="bg-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-700 transition-all"
                    onClick={handleAwaitingMatchClick}
                  >
                    Awaiting Match
                  </button>
                ) : (
                  <button
                    aria-label="Start matching"
                    className="bg-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-700 transition-all"
                    onClick={() => {
                      handleMatchCardActivation();
                      navigate('/getting-started');
                    }}
                  >
                    Start Matching
                  </button>
                )}
                <button
                  aria-label="Learn more about miamour"
                  className="bg-white border border-pink-200 text-pink-600 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-pink-50 transition-all"
                  onClick={() => navigate('/learn-more')}
                >
                  Learn More
                </button>
              </div>
            </div>
          </section>

          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl border border-pink-100 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-pink-100/30 blur-xl"></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-3xl font-bold text-pink-600 mb-4">
                    Ready to Find Your Match?
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Our advanced algorithm is working to find your perfect partner. Track your match progress in real-time!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      aria-label="Track my match"
                      className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors shadow-lg"
                      onClick={() => {
                        handleClosePopup();
                        navigate('/match-track');
                      }}
                    >
                      Track My Match
                    </button>
                    <button
                      aria-label="Close popup"
                      className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
                      onClick={handleClosePopup}
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Our Services Section */}
          <section className="pt-20 pb-12 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
                  Our Services
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover all the ways we help you find and nurture love
                </p>
              </div>
              {Object.entries(categories).map(([category, items]) => (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                      <div
                        key={`${category}-${item.text}`}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
                      >
                        <button
                          aria-label={`Navigate to ${item.text}`}
                          className="w-full p-6 flex flex-col items-center text-center h-full"
                          onClick={() => navigate(item.to)}
                        >
                          <div className="mb-4 p-4 rounded-full bg-pink-50">
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.text}</h3>
                          <p className="text-gray-500 text-sm">{item.description}</p>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Partners Section */}
          <section className="pt-20 pb-0 bg-gradient-to-b from-pink-50 to-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
                  Featured Wedding Partners
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We have partnered with the best to make your special day perfect
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[32rem] shadow-xl border border-white/20 bg-white">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
                  style={{ backgroundImage: `url(${weddingAdvertisements[currentAdIndex].imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-pink-50/40 to-white/80" />
                  <div className="relative h-full flex flex-col items-center justify-end pb-12 px-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">
                      {weddingAdvertisements[currentAdIndex].title}
                    </h3>
                    <p className="text-gray-700 text-lg md:text-xl mb-6 text-center max-w-2xl">
                      {weddingAdvertisements[currentAdIndex].description}
                    </p>
                    <button
                      aria-label={`Explore ${weddingAdvertisements[currentAdIndex].title}`}
                      className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
                      onClick={() => navigate(weddingAdvertisements[currentAdIndex].to)}
                    >
                      {weddingAdvertisements[currentAdIndex].cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Homepage;