import { useState } from 'react';
import { Check, CreditCard, Heart, Sparkles, Crown, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StripePaymentComponent from './StripePaymentComponent';

const ProfileSuccessComponent = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const controls = useAnimation();

  const plans = [
    {
      id: "blossom",
      title: "Blossom Package",
      description: [
        "Exclusive matchmaking within your country",
        "Access to live sessions",
        "Basic profile visibility",
        "5 matches per week"
      ],
      price: "₦30,000 / $20 / £18 per month",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-400 to-rose-400",
      shadow: "shadow-pink-200",
      popular: false
    },
    {
      id: "harmony",
      title: "Harmony Package",
      description: [
        "Exclusive matchmaking within and outside your country",
        "Access to live sessions",
        "Premium profile visibility",
        "10 matches per week",
        "Priority customer support"
      ],
      price: "₦50,000 / $33 / €30 per month",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-400",
      shadow: "shadow-purple-200",
      popular: true
    },
    {
      id: "forever",
      title: "My Forever Package",
      description: [
        "Personal matches & private sessions",
        "Access to high profile members",
        "Matches within and outside Nigeria",
        "Unlimited matches",
        "VIP concierge service",
        "Dedicated relationship advisor"
      ],
      price: "₦100,000 / $66 / €60 per month",
      icon: <Crown className="w-6 h-6" />,
      color: "from-amber-400 to-orange-400",
      shadow: "shadow-amber-200",
      popular: false
    },
  ];

  const handlePaymentSuccess = () => {
    navigate('/dashboard');
  };

  const handlePlanHover = (planId) => {
    setHoveredPlan(planId);
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
  };

  const handlePlanLeave = () => {
    setHoveredPlan(null);
  };

  // If a plan is selected, show payment component
  if (selectedPlan) {
    return (
      <StripePaymentComponent 
        selectedPlan={selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
        onBack={() => setSelectedPlan(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl shadow-lg mb-12 text-center border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="relative z-10">
          <motion.div 
            animate={controls}
            className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Check className="text-white" size={48} />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Profile Complete!
          </h2>
          <p className="text-gray-600 mb-6 text-xl">
            Your profile has been created successfully.
          </p>
          <p className="text-gray-600 mb-2 text-lg font-medium">
            Select your perfect membership package
          </p>
          <div className="flex justify-center">
            <motion.div 
              animate={{
                x: [-5, 5, -5],
                transition: { repeat: Infinity, duration: 2 }
              }}
            >
              <ChevronRight className="text-gray-400 w-8 h-8 rotate-90" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: plans.indexOf(plan) * 0.1 }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            onMouseEnter={() => handlePlanHover(plan.id)}
            onMouseLeave={handlePlanLeave}
            className={`relative rounded-2xl p-1 bg-gradient-to-br ${plan.color} ${plan.shadow} transition-all duration-300`}
            style={{
              transform: hoveredPlan === plan.id 
                ? "perspective(1000px) rotateX(5deg) rotateY(0deg) rotateZ(0deg)" 
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
              transformStyle: "preserve-3d"
            }}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
            )}
            <div className="bg-white rounded-xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${plan.color} text-white flex items-center justify-center shadow-md`}>
                  {plan.icon}
                </div>
                {plan.popular && (
                  <div className="text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 px-3 py-1 rounded-full">
                    Best Value
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {plan.title}
              </h3>
              <ul className="text-gray-600 mb-6 space-y-3 flex-grow">
                {plan.description.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 bg-gradient-to-r ${plan.color} text-transparent bg-clip-text`} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <p className="text-xl font-bold text-gray-800 mb-6">
                  {plan.price}
                </p>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 bg-gradient-to-r ${plan.color} text-white rounded-xl font-bold flex items-center justify-center shadow-md hover:shadow-lg transition-all`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Select Plan
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12 text-gray-500 text-sm"
      >
        <p>Secure payment processing powered by Stripe</p>
        <p className="mt-1">Cancel anytime with one click</p>
      </motion.div>
    </div>
  );
};

export default ProfileSuccessComponent;