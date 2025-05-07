import { useState, useRef } from 'react';
import { CheckCircle, Sparkles, Crown, Star, Heart, ChevronLeft } from 'lucide-react';

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

const SubscriptionsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('blossom');

  const plans = [
    {
      id: 'blossom',
      name: 'Blossom Package',
      price: '₦75,000',
      priceUSD: '$20',
      priceEUR: '€18',
      period: '1 month',
      features: [
        'Exclusive matchmaking within your country',
        'Access to live sessions',
        'Basic profile verification',
        'Standard customer support'
      ],
      icon: <Star className="w-6 h-6 text-pink-500" />,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'harmony',
      name: 'Harmony Package',
      price: '₦125,000',
      priceUSD: '$33',
      priceEUR: '€30',
      period: '3 months',
      features: [
        'Exclusive matchmaking within and outside your country',
        'Access to live sessions',
        'Priority profile verification',
        'Premium customer support',
        'Advanced matching algorithms'
      ],
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'forever',
      name: 'My Forever Package',
      price: '₦225,000',
      priceUSD: '$66',
      priceEUR: '€60',
      period: '6 months',
      features: [
        'Personal matches',
        'Private sessions',
        'Access to high-profile members',
        'Matches within and outside Nigeria',
        'VIP customer support',
        'Exclusive events access'
      ],
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'personalized',
      name: 'Personalized Matching',
      price: '₦475,000',
      priceUSD: '$125',
      priceEUR: '€115',
      period: '1 year',
      features: [
        'Dedicated matchmaker',
        'Customized matching strategy',
        'Unlimited private sessions',
        'Global elite network access',
        '24/7 VIP support',
        'Premium event invitations'
      ],
      icon: <Heart className="w-6 h-6 text-red-500" />,
      color: 'from-red-500 to-pink-500'
    }
  ];

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

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Love Journey
            </h1>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Select the perfect plan to find your forever love. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 shadow-2xl border border-pink-100 flex flex-col h-[600px] ${
                selectedPlan === plan.id ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className={`p-3 rounded-full bg-gradient-to-r ${plan.color} text-white shadow-lg`}>
                  {plan.icon}
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="space-y-1">
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.price}
                  </p>
                  <p className="text-sm text-gray-500">{plan.priceUSD} / {plan.priceEUR}</p>
                  <p className="text-sm text-gray-500">for {plan.period}</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 mt-auto ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white border-2 border-pink-200 text-pink-600 hover:border-pink-400'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
