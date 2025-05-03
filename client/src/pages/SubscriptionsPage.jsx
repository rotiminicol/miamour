import { useState } from 'react';
import { CheckCircle, Heart} from 'lucide-react';
import { motion,  } from 'framer-motion';
import { Header } from "../components/Header";

const SubscriptionsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isUpdating, setIsUpdating] = useState(false);

  const plans = [
    {
      id: 'blossom',
      name: 'Blossom Package',
      price: '₦75,000 / $20 / £18',
      period: 'monthly',
      features: [
        'Exclusive matchmaking within your country',
        'Access to live sessions'
      ]
    },
    {
      id: 'harmony',
      name: 'Harmony Package',
      price: '₦125,000 / $33 / €30',
      period: 'monthly',
      features: [
        'Exclusive matchmaking within and outside your country',
        'Access to live sessions'
      ]
    },
    {
      id: 'forever',
      name: 'My Forever Package',
      price: '₦225,000 / $66 / €60 per month',
      period: 'monthly',
      features: [
        'Personal matches',
        'Private sessions',
        'Access to high-profile members',
        'Matches within and outside Nigeria'
      ]
    },
    {
      id: 'Personalized Matching',
      name: 'My Forever Package',
      price: '₦525,000 / $66 / €60 per month',
      period: 'monthly',
      features: [
        'Personal matches',
        'Private sessions',
        'Access to high-profile members',
        'Matches within and outside Nigeria'
      ]
    }
  ];
  
  
  const handleUpdateSubscription = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      alert('Subscription updated successfully!');
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-pink-700 mb-3">Manage Your Subscription</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Upgrade, downgrade, or cancel your subscription plan at any time.</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Current Plan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`border rounded-xl p-6 cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'border-pink-500 bg-pink-50 shadow-lg' 
                        : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{plan.name}</h3>
                        <p className="text-gray-500">{plan.period}</p>
                      </div>
                      {selectedPlan === plan.id && (
                        <CheckCircle className="text-pink-500 h-6 w-6" />
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-pink-600">{plan.price}</span>
                      {plan.period === 'monthly' && <span className="text-gray-500 ml-1">/month</span>}
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Heart className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="mt-8">
              <button 
                onClick={handleUpdateSubscription}
                className="w-full bg-pink-600 text-white py-4 px-6 rounded-lg hover:bg-pink-700 transition-colors font-bold text-lg"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Subscription'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsPage;