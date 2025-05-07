
import { useState, useEffect, useRef } from 'react';
import { Gift, Clock, Copy, CheckCircle, Sparkles, ChevronLeft } from 'lucide-react';

// Sleek BackButton component
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

const DiscountsPage = () => {
  const [discounts] = useState([
    {
      id: 1,
      code: 'SUMMER2025',
      description: 'Get 25% off your first 3 months',
      validUntil: '2025-08-31',
      discount: '25%',
      background: 'bg-gradient-to-r from-blue-400 to-purple-500',
      featured: true
    },
    {
      id: 2,
      code: 'FOREVER25',
      description: '50% off Premium Love plan',
      validUntil: '2025-07-15',
      discount: '50%',
      background: 'bg-gradient-to-r from-pink-500 to-red-500'
    },
    {
      id: 3,
      code: 'NEWUSER2025',
      description: 'Free 14-day trial with any subscription',
      validUntil: '2025-12-31',
      discount: 'FREE TRIAL',
      background: 'bg-gradient-to-r from-amber-400 to-orange-500'
    },
    {
      id: 4,
      code: 'LOYALTY25',
      description: '30% discount for returning customers',
      validUntil: '2025-09-30',
      discount: '30%',
      background: 'bg-gradient-to-r from-emerald-400 to-teal-500'
    }
  ]);

  const [copied, setCopied] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    // Update countdown timers
    const calculateTimeRemaining = () => {
      const remaining = {};
      discounts.forEach(discount => {
        const difference = new Date(discount.validUntil) - new Date();
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          remaining[discount.id] = days;
        } else {
          remaining[discount.id] = 0;
        }
      });
      setTimeRemaining(remaining);
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 86400000); // Update once per day

    return () => clearInterval(timer);
  }, [discounts]);

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  // Parallax effect using scroll
  const parallaxRef = useRef(null);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  };
  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-x-hidden">
      {/* Parallax geometric background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          ref={parallaxRef}
          width="100%" height="100%" viewBox="0 0 1440 600"
          className="absolute top-0 left-0"
          style={{ transition: 'transform 0.2s linear' }}
        >
          <circle cx="1200" cy="100" r="180" fill="#f0f4ff" opacity="0.7" />
          <rect x="100" y="400" width="300" height="120" rx="60" fill="#ffe4f0" opacity="0.5" />
          <ellipse cx="400" cy="120" rx="120" ry="60" fill="#f7faff" opacity="0.7" />
          <rect x="900" y="350" width="220" height="80" rx="40" fill="#ffd6ec" opacity="0.4" />
        </svg>
        {/* Pink splash */}
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Sleek Back Button */}
      <BackButton />

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-pink-700 mb-4">Exclusive Discounts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Unlock special offers and save on your journey to finding love in 2025
          </p>
        </div>

        {/* Featured discount */}
        {discounts.filter(d => d.featured).map(discount => (
          <div key={`featured-${discount.id}`} className="mb-12">
            <div className="flex items-center justify-center mb-6 text-pink-700">
              <Sparkles className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">FEATURED OFFER</h2>
            </div>
            <div className={`${discount.background} rounded-2xl p-8 shadow-xl text-white`}>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <div className="text-6xl font-bold mb-2">{discount.discount}</div>
                  <h3 className="text-2xl font-semibold mb-2">{discount.description}</h3>
                  <div className="flex items-center text-white/80">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {timeRemaining[discount.id] > 0 ?
                        `Expires in ${timeRemaining[discount.id]} days` :
                        "Offer expired"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-5 py-3 mb-4 border border-white/30">
                    <span className="font-mono text-xl font-bold tracking-wider">{discount.code}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(discount.code, discount.id)}
                    className="bg-white text-pink-600 hover:bg-pink-50 font-medium rounded-full px-6 py-2 flex items-center transition-all"
                  >
                    {copied === discount.id ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 mr-2" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 border border-pink-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">More Discount Codes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {discounts.filter(d => !d.featured).map((discount) => (
              <div
                key={discount.id}
                className={`${discount.background} rounded-xl p-6 flex flex-col text-white shadow-lg`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Gift className="h-6 w-6 mr-3" />
                    <span className="font-bold text-xl">{discount.discount}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {timeRemaining[discount.id] > 0 ?
                        `${timeRemaining[discount.id]} days left` :
                        "Expired"}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-medium mb-4">{discount.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    <span className="font-mono font-bold tracking-wider">{discount.code}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(discount.code, discount.id)}
                    className="bg-white/30 hover:bg-white/40 rounded-full p-2 transition-all"
                    aria-label="Copy code"
                  >
                    {copied === discount.id ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to redeem section */}
        <div className="mt-16 bg-pink-50 rounded-3xl p-8 md:p-10 border border-pink-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Redeem</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-pink-700 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy Code</h3>
              <p className="text-gray-600">Click the copy button next to your preferred discount code</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-pink-700 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Plan</h3>
              <p className="text-gray-600">Choose your subscription plan on the checkout page</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-pink-700 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply & Save</h3>
              <p className="text-gray-600">Paste your code in the promo field and enjoy the savings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsPage;
