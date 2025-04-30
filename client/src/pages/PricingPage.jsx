import { motion } from "framer-motion";
import { Check,  Star, Gift } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    duration: "",
    features: [
      "Limited matches per day",
      "Basic profile visibility",
      "Standard search filters",
      "Send 3 likes per day"
    ],
    popular: false
  },
  {
    name: "Premium",
    price: "$19.99",
    duration: "/month",
    features: [
      "Unlimited matches",
      "Priority profile visibility",
      "Advanced search filters",
      "Unlimited likes and messages",
      "See who liked you",
      "Boost your profile weekly"
    ],
    popular: true
  },
  {
    name: "VIP",
    price: "$49.99",
    duration: "/month",
    features: [
      "All Premium features",
      "Personal matchmaker",
      "Profile highlight",
      "Exclusive events access",
      "Dating coach sessions",
      "Priority customer support"
    ],
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent mb-4"
          >
            Find Your Perfect Plan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Choose the membership that fits your journey to finding love. All plans include our satisfaction guarantee.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden border ${plan.popular ? 'border-pink-300 ring-2 ring-pink-200' : 'border-pink-100'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-pink-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                  {plan.popular && <Star className="w-5 h-5 text-yellow-400 ml-2" fill="currentColor" />}
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">{plan.duration}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-pink-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition-all ${plan.popular 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white hover:shadow-lg' 
                    : 'bg-pink-50 text-pink-500 hover:bg-pink-100'}`}
                >
                  {plan.name === 'Basic' ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white rounded-xl shadow-lg border border-pink-100 p-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <Gift className="w-16 h-16 text-pink-500" />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Special Offer</h3>
              <p className="text-gray-600 mb-4">
                Get 3 months of Premium for the price of 2 when you subscribe today!
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all">
                Claim Your Discount
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}