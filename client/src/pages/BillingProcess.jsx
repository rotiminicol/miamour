import { useState, useEffect } from 'react';
import { CreditCard, Calendar, Lock, CheckCircle, Heart, Gift, ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Confetti from 'react-confetti';
import { Header } from "../components/Header";
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const BillingProcess = () => {
  const [selectedPlan, setSelectedPlan] = useState('blossom');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [step, setStep] = useState(1);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [0.5, 0.9]);

  useEffect(() => {
    if (isPaymentComplete) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isPaymentComplete]);

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
      icon: <Star className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100'
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
      icon: <Star className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100'
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
      icon: <Star className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100'
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
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100'
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <Sparkles className="w-6 h-6 text-[#FF1493]" />
        <h2 className="text-3xl font-bold text-[#FF1493]">
          Choose Your Love Journey
        </h2>
        <Sparkles className="w-6 h-6 text-[#FF1493]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className={`relative bg-white rounded-xl p-6 shadow-lg border-2 flex flex-col h-[600px] ${
              selectedPlan === plan.id ? 'border-[#FF1493]' : 'border-gray-200'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className={`p-2 rounded-full bg-[#FF1493]/10 text-[#FF1493] shadow-sm`}>
                {plan.icon}
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-[#FF1493]">{plan.price}</p>
                <p className="text-xs text-gray-600">{plan.priceUSD} / {plan.priceEUR}</p>
                <p className="text-xs text-gray-600">per {plan.period}</p>
              </div>
            </div>

            <ul className="space-y-4 flex-grow">
              {plan.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start text-sm"
                >
                  <CheckCircle className="h-4 w-4 text-[#FF1493] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.id);
                }}
                className={`w-full py-4 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? 'bg-[#FF1493] text-white shadow-sm'
                    : 'bg-[#FF1493]/10 text-[#FF1493] hover:bg-[#FF1493]/20'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <div className="bg-[#FF1493]/5 border-2 border-[#FF1493] rounded-lg p-4 flex items-start">
          <Gift className="h-5 w-5 text-[#FF1493] mr-2 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 text-sm">Exclusive Offer</p>
            <p className="text-xs text-gray-600">Join today and receive a personalized compatibility report ($29.99 value) free!</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderPaymentMethod = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <Lock className="w-6 h-6 text-[#FF1493]" />
        <h2 className="text-3xl font-bold text-[#FF1493]">
          Secure Payment
        </h2>
        <Lock className="w-6 h-6 text-[#FF1493]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {['credit', 'paypal'].map((method) => (
          <motion.div
            key={method}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-lg p-4 flex items-center cursor-pointer bg-white
              ${paymentMethod === method ? 'border-[#FF1493] bg-[#FF1493]/5' : 'border-gray-200'}`}
            onClick={() => setPaymentMethod(method)}
          >
            <div className="h-5 w-5 rounded-full border-2 border-[#FF1493] flex items-center justify-center mr-3">
              {paymentMethod === method && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-3 w-3 rounded-full bg-[#FF1493]"
                />
              )}
            </div>
            {method === 'credit' ? (
              <>
                <CreditCard className="h-5 w-5 text-gray-700 mr-2" />
                <span className="font-bold text-gray-900 text-sm">Credit/Debit Card</span>
              </>
            ) : (
              <span className="font-bold text-gray-900 text-sm">PayPal</span>
            )}
          </motion.div>
        ))}
      </div>

      {paymentMethod === 'credit' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-[#FF1493] rounded-lg p-5 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3">
              <label htmlFor="cardName" className="block text-xs font-bold text-gray-700 mb-1">Cardholder Name</label>
              <motion.input
                whileFocus={{ borderColor: '#FF1493' }}
                type="text"
                id="cardName"
                className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#FF1493] bg-white"
                placeholder="Name as shown on card"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cardNumber" className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ borderColor: '#FF1493' }}
                  type="text"
                  id="cardNumber"
                  className="w-full pl-2 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#FF1493] bg-white"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="expiry" className="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ borderColor: '#FF1493' }}
                  type="text"
                  id="expiry"
                  className="w-full pl-2 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#FF1493] bg-white"
                  placeholder="MM/YY"
                />
                <Calendar className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cvv" className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ borderColor: '#FF1493' }}
                  type="text"
                  id="cvv"
                  className="w-full pl-2 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#FF1493] bg-white"
                  placeholder="123"
                />
                <Lock className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {paymentMethod === 'paypal' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-[#FF1493] rounded-lg p-5 text-center bg-white"
        >
          <p className="text-gray-600 mb-4 text-sm">Youll be redirected to PayPal to complete your payment securely.</p>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#3B82F6' }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-500 text-white py-2 px-6 rounded-md font-bold text-sm"
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
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <CheckCircle className="w-6 h-6 text-[#FF1493]" />
          <h2 className="text-3xl font-bold text-[#FF1493]">
            Order Summary
          </h2>
          <CheckCircle className="w-6 h-6 text-[#FF1493]" />
        </div>

        <motion.div
          className="bg-white border-2 border-[#FF1493] rounded-lg p-5 mb-4"
          whileHover={{ boxShadow: '0 4px 20px rgba(255,20,147,0.15)' }}
        >
          <div className="flex justify-between items-center pb-3 border-b border-[#FF1493]/20">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selectedPlanDetails.name}</h3>
              <p className="text-gray-600 text-sm">{selectedPlanDetails.period} subscription</p>
            </div>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
              className="font-bold text-lg text-[#FF1493]"
            >
              {selectedPlanDetails.price}
            </motion.span>
          </div>

          <div className="py-3 border-b border-[#FF1493]/20">
            <p className="text-xs text-gray-600">Your subscription auto-renews after {selectedPlanDetails.period}. Cancel anytime with one click.</p>
          </div>

          <div className="pt-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-2"
            >
              <span className="text-gray-700 text-sm font-medium">Subtotal</span>
              <span className="font-bold text-sm">{selectedPlanDetails.price}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-between items-center mb-2"
            >
              <span className="text-gray-700 text-sm font-medium">Tax</span>
              <span className="font-bold text-sm">$0.00</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center pt-3 border-t border-[#FF1493]/20 mt-3"
            >
              <span className="font-bold text-base">Total</span>
              <span className="font-bold text-base text-[#FF1493]">{selectedPlanDetails.price}</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FF1493]/5 border-2 border-[#FF1493] rounded-lg p-4 mb-4"
        >
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-[#FF1493] mr-2 mt-0.5" />
            <div>
              <p className="font-bold text-gray-900 text-sm">Secure Transaction</p>
              <p className="text-xs text-gray-600">Your payment is protected with end-to-end encryption.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FF1493]/5 border-2 border-[#FF1493] rounded-lg p-4 mb-4"
        >
          <div className="flex items-start">
            <Heart className="h-5 w-5 text-[#FF1493] mr-2 mt-0.5" />
            <div>
              <p className="font-bold text-gray-900 text-sm">Our Love Guarantee</p>
              <p className="text-xs text-gray-600">No meaningful connections in 30 days? Well extend your subscription free!</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleContinue}
          className="w-full bg-[#FF1493] text-white py-3 px-6 rounded-lg font-bold text-base"
        >
          Complete Payment
        </motion.button>
      </motion.div>
    );
  };

  const renderSuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full text-center relative"
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <motion.div
        className="absolute inset-0 bg-[#FF1493]/5"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-[#FF1493]" />
        <h2 className="text-3xl font-bold text-[#FF1493]">
          Welcome to Your Love Journey!
        </h2>
        <Sparkles className="w-6 h-6 text-[#FF1493]" />
      </div>
      <p className="text-gray-800 mb-6 text-base max-w-lg mx-auto relative z-10 font-medium">
        Your subscription is active! Get ready to meet your perfect match.
      </p>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsPaymentComplete(false)}
        className="bg-[#FF1493] text-white py-3 px-8 rounded-lg font-bold relative z-10"
      >
        Start Matching Now
      </motion.button>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center mb-8"
    >
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <motion.div
            animate={{ scale: step === s ? 1.1 : 1 }}
            className={`h-10 w-10 rounded-full flex items-center justify-center text-base font-bold
              ${step >= s ? 'bg-[#FF1493] text-white' : 'bg-[#FF1493]/10 text-[#FF1493]'}`}
          >
            {s}
          </motion.div>
          {s < 3 && (
            <motion.div
              className={`h-1 w-12 ${step > s ? 'bg-[#FF1493]' : 'bg-[#FF1493]/10'}`}
              animate={{ scaleX: step > s ? 1 : 0.9 }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto px-4 py-6 lg:px-6 lg:py-8">
          <BackButton />
          <motion.div
            className="max-w-5xl mx-auto px-4 py-12 relative z-10"
            style={{ opacity: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-[#FF1493]" />
                <h1 className="text-4xl font-bold text-[#FF1493]">
                  Find Your Soulmate
                </h1>
                <Sparkles className="w-6 h-6 text-[#FF1493]" />
              </div>
              <p className="text-gray-800 text-base max-w-2xl mx-auto font-medium">
                Select your perfect plan and start your journey to love with our premium matchmaking services.
              </p>
            </motion.div>

            {renderStepIndicator()}

            <motion.div
              className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border-2 border-[#FF1493]"
              whileHover={{ boxShadow: '0 10px 30px rgba(255,20,147,0.15)' }}
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
                  className="mt-8 flex justify-between items-center"
                >
                  <motion.button
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBack}
                    className={`py-2 px-4 rounded-lg font-medium text-sm flex items-center
                      ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-[#FF1493]/10'}`}
                    disabled={step === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleContinue}
                    className="bg-[#FF1493] text-white py-2 px-6 rounded-lg font-medium text-sm flex items-center"
                  >
                    Continue <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default BillingProcess;