import { useState } from 'react';
import { CreditCard, Calendar, Lock, CheckCircle, Heart, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Confetti from 'react-confetti';
import { Header } from "../components/Header";

const BillingProcess = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [step, setStep] = useState(1);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 500], [0.4, 0.8]);

  const plans = [
    {
      id: 'blossom',
      name: 'Blossom Package',
      price: '₦75,000 / $50 / €45',
      period: 'monthly',
      features: [
        'Exclusive matchmaking within your country',
        'Access to live sessions',
        'Basic personality matching'
      ],
      color: 'from-rose-400 to-pink-500'
    },
    {
      id: 'harmony',
      name: 'Harmony Package',
      price: '₦125,000 / $83 / €75',
      period: 'monthly',
      features: [
        'Exclusive matchmaking within and outside your country',
        'Access to live sessions',
        'Advanced personality assessment'
      ],
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'forever',
      name: 'My Forever Package',
      price: '₦250,000 / $166 / €150 per month',
      period: 'monthly',
      features: [
        'Personal matches',
        'Private sessions',
        'Access to high-profile members',
        'Matches within and outside Nigeria',
        'Priority customer support'
      ],
      color: 'from-fuchsia-400 to-pink-500'
    },
    {
      id: 'personalized',
      name: 'Personalized Matching',
      price: '₦525,000 / $350 / €315 per month',
      period: 'monthly',
      features: [
        'Dedicated matchmaking specialist',
        'Customized matching algorithm',
        'Unlimited private sessions',
        'Global match access',
        'VIP event invitations',
        '24/7 concierge service',
        'Background verification included'
      ],
      isPremium: true,
      color: 'from-amber-300 to-pink-500'
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">Choose Your Love Journey</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className={`relative border border-gray-200/30 rounded-2xl p-6 cursor-pointer backdrop-blur-lg bg-white/30 shadow-xl transition-all duration-300 overflow-hidden
              ${selectedPlan === plan.id ? `bg-gradient-to-br ${plan.color} text-white` : 'hover:bg-white/50'}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
              animate={{ opacity: selectedPlan === plan.id ? 0.3 : 0 }}
            />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl">{plan.name}</h3>
                <p className={`text-sm ${selectedPlan === plan.id ? 'text-white/80' : 'text-gray-500'}`}>{plan.period}</p>
              </div>
              {selectedPlan === plan.id && (
                <CheckCircle className="h-6 w-6 text-white" />
              )}
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period === 'monthly' && <span className={`text-sm ml-2 ${selectedPlan === plan.id ? 'text-white/80' : 'text-gray-500'}`}>/month</span>}
            </div>
            
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <Heart className={`h-5 w-5 ${selectedPlan === plan.id ? 'text-white' : 'text-pink-500'} mr-2 flex-shrink-0 mt-0.5`} />
                  <span className={`text-sm ${selectedPlan === plan.id ? 'text-white/90' : 'text-gray-700'}`}>{feature}</span>
                </motion.li>
              ))}
            </ul>
            {plan.isPremium && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                Premium
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-xl p-5 flex items-start backdrop-blur-sm">
          <Gift className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Exclusive Offer</p>
            <p className="text-sm text-gray-700">Join today and receive a personalized compatibility report ($29.99 value) free!</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderPaymentMethod = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">Secure Payment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {['credit', 'paypal'].map((method) => (
          <motion.div
            key={method}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.97 }}
            className={`border border-gray-200/30 rounded-xl p-5 flex items-center cursor-pointer backdrop-blur-lg bg-white/30
              ${paymentMethod === method ? 'bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg' : ''}`}
            onClick={() => setPaymentMethod(method)}
          >
            <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-4">
              {paymentMethod === method && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-4 w-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500"
                />
              )}
            </div>
            {method === 'credit' ? (
              <>
                <CreditCard className="h-6 w-6 text-gray-700 mr-3" />
                <span className="font-medium text-gray-900">Credit/Debit Card</span>
              </>
            ) : (
              <span className="font-medium text-gray-900">PayPal</span>
            )}
          </motion.div>
        ))}
      </div>
      
      {paymentMethod === 'credit' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200/30 rounded-xl p-6 backdrop-blur-lg bg-white/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <motion.input
                whileFocus={{ borderColor: '#EC4899' }}
                type="text"
                id="cardName"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50"
                placeholder="Name as shown on card"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ borderColor: '#EC4899' }}
                  type="text"
                  id="cardNumber"
                  className="w-full pl-3 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ borderColor: '#EC4899' }}
                  type="text"
                  id="expiry"
                  className="w-full pl-3 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50"
                  placeholder="MM/YY"
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ borderColor: '#EC4899' }}
                  type="text"
                  id="cvv"
                  className="w-full pl-3 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/50"
                  placeholder="123"
                />
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {paymentMethod === 'paypal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200/30 rounded-xl p-6 text-center backdrop-blur-lg bg-white/30"
        >
          <p className="text-gray-700 mb-6">Youll be redirected to PayPal to complete your payment securely.</p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg transition-colors font-semibold"
          >
            Proceed to PayPal
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );

  const renderOrderSummary = () => {
    const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">Order Summary</h2>
        
        <motion.div
          className="bg-white/30 border border-gray-200/30 rounded-xl p-6 backdrop-blur-lg mb-6"
          whileHover={{ boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-200/30">
            <div>
              <h3 className="font-semibold text-xl text-gray-900">{selectedPlanDetails.name}</h3>
              <p className="text-gray-600">{selectedPlanDetails.period === 'monthly' ? 'Monthly subscription' : 'One-time payment'}</p>
            </div>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
              className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
            >
              {selectedPlanDetails.price}
            </motion.span>
          </div>
          
          {selectedPlanDetails.period === 'monthly' && (
            <div className="py-4 border-b border-gray-200/30">
              <p className="text-sm text-gray-700">Your subscription auto-renews monthly. Cancel anytime with one click.</p>
            </div>
          )}
          
          <div className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-3"
            >
              <span className="text-gray-700">Subtotal</span>
              <span className="font-medium">{selectedPlanDetails.price}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-between items-center mb-3"
            >
              <span className="text-gray-700">Tax</span>
              <span className="font-medium">$0.00</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center pt-4 border-t border-gray-200/30 mt-4"
            >
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">{selectedPlanDetails.price}</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-100 to-teal-100 border border-green-200/30 rounded-xl p-5 mb-6 backdrop-blur-sm"
        >
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Secure Transaction</p>
              <p className="text-sm text-gray-700">Your payment is protected with end-to-end encryption.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/30 rounded-xl p-5 mb-6 backdrop-blur-sm"
        >
          <div className="flex items-start">
            <Heart className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Our Love Guarantee</p>
              <p className="text-sm text-gray-700">No meaningful connections in 30 days? We’ll extend your subscription free!</p>
            </div>
          </div>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300"
        >
          Complete Payment
        </motion.button>
      </motion.div>
    );
  };

  const renderSuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full text-center relative"
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-pink-200/30 to-purple-200/30 backdrop-blur-lg"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 relative z-10">Welcome to Your Love Journey!</h2>
      <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto relative z-10">Your subscription is active! Get ready to meet your perfect match.</p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPaymentComplete(false)}
        className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-10 rounded-xl font-semibold relative z-10"
      >
        Start Matching Now
      </motion.button>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center mb-10"
    >
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <motion.div
            animate={{ scale: step === s ? 1.2 : 1 }}
            className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-semibold
              ${step >= s ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            {s}
          </motion.div>
          {s < 3 && (
            <motion.div
              className={`h-1 w-16 ${step > s ? 'bg-gradient-to-r from-pink-600 to-purple-600' : 'bg-gray-200'}`}
              animate={{ scaleX: step > s ? 1 : 0.8 }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-purple-200/30"
          style={{ opacity: backgroundOpacity }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(236,72,153,0.2) 0%, transparent 50%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 mb-4">Find Your Soulmate</h1>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">Select your perfect plan and start your journey to love with our premium matchmaking services.</p>
          </motion.div>
          
          {renderStepIndicator()}
          
          <motion.div
            className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-200/30"
            whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
          >
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-between items-center"
              >
                <motion.button
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className={`py-3 px-6 rounded-xl font-semibold flex items-center
                    ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-gray-100/50'}`}
                  disabled={step === 1}
                >
                  <ChevronLeft className="h-5 w-5 mr-2" /> Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-10 rounded-xl font-semibold flex items-center"
                >
                  Continue <ChevronRight className="h-5 w-5 ml-2" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BillingProcess;