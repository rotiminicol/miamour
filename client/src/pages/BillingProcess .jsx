import { useState } from 'react';
import { CreditCard, Calendar, Lock, CheckCircle, Heart, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "../components/Header";
import Confetti from 'react-confetti';

const BillingProcess = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [step, setStep] = useState(1);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Match',
      price: '$29.99',
      period: 'monthly',
      features: [
        'Up to 10 matches per month',
        'Basic profile visibility',
        'Message with matches',
        'Access to basic events'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Match',
      price: '$49.99',
      period: 'monthly',
      features: [
        'Unlimited matches',
        'Enhanced profile visibility',
        'Priority messaging',
        'Access to premium events',
        'Advanced match filters',
        'Profile highlighting'
      ]
    },
    {
      id: 'lifetime',
      name: 'Lifetime Love',
      price: '$299.99',
      period: 'one-time',
      features: [
        'All Premium features',
        'Lifetime membership',
        'Personal matchmaking assistant',
        'Background verification badge',
        'Exclusive elite events',
        'Video date feature'
      ]
    }
  ];

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsPaymentComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderPlanSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Match Plan</h2>
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
      
      <div className="mt-8">
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 flex items-start">
          <Gift className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Special Offer</p>
            <p className="text-sm text-gray-600">Sign up today and get a free compatibility report worth $19.99!</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPaymentMethod = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`border rounded-lg p-4 flex items-center cursor-pointer ${
            paymentMethod === 'credit' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
          }`}
          onClick={() => setPaymentMethod('credit')}
        >
          <div className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center mr-3">
            {paymentMethod === 'credit' && (
              <div className="h-4 w-4 rounded-full bg-pink-500"></div>
            )}
          </div>
          <CreditCard className="h-6 w-6 text-gray-700 mr-3" />
          <span className="font-medium text-gray-800">Credit or Debit Card</span>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`border rounded-lg p-4 flex items-center cursor-pointer ${
            paymentMethod === 'paypal' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
          }`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <div className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center mr-3">
            {paymentMethod === 'paypal' && (
              <div className="h-4 w-4 rounded-full bg-pink-500"></div>
            )}
          </div>
          <span className="font-medium text-gray-800">PayPal</span>
        </motion.div>
      </div>
      
      {paymentMethod === 'credit' && (
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input 
              type="text" 
              id="cardName" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Name as shown on card"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <div className="relative">
              <input 
                type="text" 
                id="cardNumber" 
                className="w-full pl-3 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="1234 5678 9012 3456"
              />
              <div className="absolute right-3 top-3">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="expiry" 
                  className="w-full pl-3 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="MM/YY"
                />
                <div className="absolute right-3 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="cvv" 
                  className="w-full pl-3 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="123"
                />
                <div className="absolute right-3 top-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === 'paypal' && (
        <div className="border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">You will be redirected to PayPal to complete your payment.</p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Proceed to PayPal
          </button>
        </div>
      )}
    </motion.div>
  );

  const renderOrderSummary = () => {
    const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{selectedPlanDetails.name}</h3>
              <p className="text-gray-500">{selectedPlanDetails.period === 'monthly' ? 'Monthly subscription' : 'One-time payment'}</p>
            </div>
            <span className="font-bold text-xl text-pink-600">{selectedPlanDetails.price}</span>
          </div>
          
          {selectedPlanDetails.period === 'monthly' && (
            <div className="py-4 border-b border-gray-200">
              <p className="text-sm text-gray-700">Your subscription will automatically renew each month. You can cancel anytime.</p>
            </div>
          )}
          
          <div className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-medium">{selectedPlanDetails.price}</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Tax</span>
              <span className="font-medium">$0.00</span>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-lg text-pink-600">{selectedPlanDetails.price}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">Secure Payment</p>
              <p className="text-sm text-gray-600">Your payment information is encrypted and secure.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <Heart className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">Our Promise</p>
              <p className="text-sm text-gray-600">If you dont find meaningful connections in 30 days, well extend your subscription for free.</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleContinue}
          className="w-full bg-pink-600 text-white py-4 px-6 rounded-lg hover:bg-pink-700 transition-colors font-bold text-lg"
        >
          Complete Payment
        </button>
      </motion.div>
    );
  };

  const renderSuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-center"
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">Thank you for subscribing. Your journey to finding love starts now!</p>
      <button 
        onClick={() => setIsPaymentComplete(false)}
        className="bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors font-medium"
      >
        Back to Dashboard
      </button>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          1
        </div>
        <div className={`h-1 w-12 ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          2
        </div>
        <div className={`h-1 w-12 ${step >= 3 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          step >= 3 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          3
        </div>
      </div>
    </div>
  );

  return (
    <>
     <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-700 mb-3">Find Your Perfect Match</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose the right plan to begin your journey towards finding your soulmate. Our premium features increase your chances of finding your perfect match.</p>
        </div>
        
        {renderStepIndicator()}
        
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {isPaymentComplete ? (
              renderSuccessScreen()
            ) : (
              <>
                {step === 1 && renderPlanSelection()}
                {step === 2 && renderPaymentMethod()}
                {step === 3 && renderOrderSummary()}
              </>
            )}
          </AnimatePresence>
          
          {!isPaymentComplete && step !== 3 && (
            <div className="mt-8 flex justify-between">
              <button 
                onClick={handleBack}
                className={`py-3 px-6 rounded-lg font-medium ${
                  step === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                disabled={step === 1}
              >
                <ChevronLeft className="inline-block mr-2" /> Back
              </button>
              <button 
                onClick={handleContinue}
                className="bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors font-medium"
              >
                Continue <ChevronRight className="inline-block ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  
  );
};

export default BillingProcess;