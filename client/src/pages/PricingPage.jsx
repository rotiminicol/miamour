import { motion } from "framer-motion";
import { ChevronLeft, Star, Heart, Gift } from "lucide-react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";

const pricingPlans = [
  {
    name: "Basic",
    price: "₦75,000",
    period: "per month",
    features: [
      "Basic profile creation",
      "Limited matches per day",
      "Standard messaging",
      "Basic profile verification"
    ],
    icon: <Star className="w-6 h-6 text-[#FF1493]" />
  },
  {
    name: "Premium",
    price: "₦125,000",
    period: "per month",
    features: [
      "Advanced profile features",
      "Unlimited matches",
      "Priority messaging",
      "Enhanced profile verification",
      "Access to premium events"
    ],
    icon: <Heart className="w-6 h-6 text-[#FF1493]" />
  },
  {
    name: "VIP",
    price: "₦225,000",
    period: "per month",
    features: [
      "All Premium features",
      "Personal matchmaker",
      "VIP event access",
      "Priority customer support",
      "Exclusive dating tips",
      "Profile boost"
    ],
    icon: <Gift className="w-6 h-6 text-[#FF1493]" />
  }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-4 py-6 lg:px-6 lg:py-8">
          <div className="container mx-auto px-4 py-6">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-[#FF1493] mb-6 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </motion.button>
          </div>

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
                className="text-4xl font-bold text-[#FF1493] mb-4"
              >
                Choose Your Plan
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                Find the perfect plan to start your journey to love
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-[#FF1493]/20 p-8"
                >
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 rounded-full bg-[#FF1493]/10 mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#FF1493]">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className="w-5 h-5 text-[#FF1493] mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#FF1493] text-white py-3 rounded-lg font-medium"
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-600 mb-6">
                All plans include a 7-day free trial. No credit card required.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#FF1493] text-white px-8 py-3 rounded-lg font-medium"
              >
                Start Free Trial
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}