import { useState } from 'react';
import { CheckCircle, Sparkles, Crown, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "../components/Header";

const SubscriptionsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const plans = [
    {
      id: 'blossom',
      name: 'Blossom Package',
      price: '₦75,000',
      priceUSD: '$20',
      priceEUR: '£18',
      period: 'monthly',
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
      period: 'monthly',
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
      period: 'monthly',
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
    }
  ];
  
  const handleUpdateSubscription = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 ${
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
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white border-2 border-pink-200 text-pink-600 hover:border-pink-400'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={handleUpdateSubscription}
              disabled={isUpdating}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></span>
              <span className="relative flex items-center gap-2">
                {isUpdating ? (
                  'Processing...'
                ) : (
                  <>
                    Update Subscription
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </motion.div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-6 flex items-center gap-4 border border-green-100"
              >
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Success!</h4>
                  <p className="text-gray-600">Your subscription has been updated.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsPage;