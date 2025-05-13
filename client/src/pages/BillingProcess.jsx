import { useState, useEffect } from 'react';
import {
  CreditCard, Calendar, Lock, CheckCircle, Heart, Gift,
  ChevronLeft, ChevronRight, Sparkles, Star
} from 'lucide-react';
import Confetti from 'react-confetti';

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

const glassBg = "bg-white/80 backdrop-blur-md border border-pink-100 shadow-xl";
const gradientBg = "bg-gradient-to-br from-pink-50 via-white to-purple-50";

const BillingProcess = () => {
  const [selectedPlan, setSelectedPlan] = useState('blossom');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [step, setStep] = useState(1);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
      icon: <Star className="w-6 h-6 text-purple-600" />,
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
      icon: <Star className="w-6 h-6 text-amber-500" />,
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

  // Stepper
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shadow
              ${step >= s ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white' : 'bg-white/70 text-pink-500 border border-pink-200'}`}
          >
            {s}
          </div>
          {s < 3 && (
            <div
              className={`h-1 w-16 ${step > s ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-pink-100'}`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Plan Selection
  const renderPlanSelection = () => (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Sparkles className="w-6 h-6 text-pink-500" />
        <h2 className="text-3xl font-bold text-pink-500">
          Choose Your Love Journey
        </h2>
        <Sparkles className="w-6 h-6 text-pink-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative ${glassBg} rounded-2xl p-7 flex flex-col h-[650px] cursor-pointer transition-all duration-300 w-full ${
              selectedPlan === plan.id ? 'ring-2 ring-pink-500' : ''
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="flex-grow">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className={`p-3 rounded-full bg-gradient-to-r ${plan.color} text-white shadow-lg`}>
                  {plan.icon}
                </div>
              </div>
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="space-y-1">
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.price}
                  </p>
                  <p className="text-sm text-gray-500">{plan.priceUSD} / {plan.priceEUR}</p>
                  <p className="text-sm text-gray-500">for {plan.period}</p>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan.id); }}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
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
      <div className="mt-8">
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 flex items-start">
          <Gift className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 text-sm">Exclusive Offer</p>
            <p className="text-xs text-gray-600">Join today and receive a personalized compatibility report ($29.99 value) free!</p>
          </div>
        </div>
      </div>
    </div>
  );

 
  // Payment Method
const renderPaymentMethod = () => (
  <div className="w-full">
    <div className="flex items-center justify-center gap-2 mb-8">
      <Lock className="w-6 h-6 text-pink-500" />
      <h2 className="text-3xl font-bold text-pink-500">
        Secure Payment
      </h2>
      <Lock className="w-6 h-6 text-pink-500" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {['credit', 'bank'].map((method) => (
        <div
          key={method}
          className={`border-2 rounded-lg p-4 flex items-center cursor-pointer bg-white
            ${paymentMethod === method ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}
          onClick={() => setPaymentMethod(method)}
        >
          <div className="h-5 w-5 rounded-full border-2 border-pink-500 flex items-center justify-center mr-3">
            {paymentMethod === method && (
              <div className="h-3 w-3 rounded-full bg-pink-500" />
            )}
          </div>
          {method === 'credit' ? (
            <>
              <CreditCard className="h-5 w-5 text-gray-700 mr-2" />
              <span className="font-bold text-gray-900 text-sm">Credit/Debit Card</span>
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 text-gray-700 mr-2" />
              <span className="font-bold text-gray-900 text-sm">Bank Transfer</span>
            </>
          )}
        </div>
      ))}
    </div>
    {paymentMethod === 'credit' && (
      <div className="border-2 border-pink-500 rounded-lg p-5 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-3">
            <label htmlFor="cardName" className="block text-xs font-bold text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-pink-500 bg-white"
              placeholder="Name as shown on card"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                className="w-full pl-2 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-pink-500 bg-white"
                placeholder="1234 5678 9012 3456"
              />
              <CreditCard className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="expiry" className="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
            <div className="relative">
              <input
                type="text"
                id="expiry"
                className="w-full pl-2 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-pink-500 bg-white"
                placeholder="MM/YY"
              />
              <Calendar className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
            <div className="relative">
              <input
                type="text"
                id="cvv"
                className="w-full pl-2 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-pink-500 bg-white"
                placeholder="123"
              />
              <Lock className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    )}
    {paymentMethod === 'bank' && (
      <div className="border-2 border-pink-500 rounded-lg p-5 bg-white">
        <div className="space-y-4">
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">Bank Transfer Details</h3>
            <div className="space-y-2 text-sm">
              <p>Bank: <span className="font-semibold">Providus Bank</span></p>
              <p className="text-gray-800"><strong>Account Name:</strong> Arigo Energy Services Ltd</p>
              <p className="text-gray-800"><strong>Account Number:</strong> 5400881912</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-bold text-yellow-800 text-sm mb-2">Important Instructions</h4>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Please include your name as reference when making payment</li>
              <li>• Send payment confirmation to support@example.com</li>
              <li>• Your account will be activated within 24 hours of payment confirmation</li>
            </ul>
          </div>
          <button
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-6 rounded-md font-bold text-sm hover:from-pink-700 hover:to-purple-700 transition mt-4"
          >
            I have Completed the Transfer
          </button>
        </div>
      </div>
    )}
  </div>
);

  // Order Summary
  const renderOrderSummary = () => {
    const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);
    return (
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <CheckCircle className="w-6 h-6 text-pink-500" />
          <h2 className="text-3xl font-bold text-pink-500">
            Order Summary
          </h2>
          <CheckCircle className="w-6 h-6 text-pink-500" />
        </div>
        <div className={`${glassBg} rounded-2xl p-6 mb-4`}>
          <div className="flex justify-between items-center pb-3 border-b border-pink-100">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selectedPlanDetails.name}</h3>
              <p className="text-gray-600 text-sm">{selectedPlanDetails.period} subscription</p>
            </div>
            <span className="font-bold text-lg text-pink-500">
              {selectedPlanDetails.price}
            </span>
          </div>
          <div className="py-3 border-b border-pink-100">
            <p className="text-xs text-gray-600">Your subscription auto-renews after {selectedPlanDetails.period}. Cancel anytime with one click.</p>
          </div>
          <div className="pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-sm font-medium">Subtotal</span>
              <span className="font-bold text-sm">{selectedPlanDetails.price}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-sm font-medium">Tax</span>
              <span className="font-bold text-sm">$0.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-pink-100 mt-3">
              <span className="font-bold text-base">Total</span>
              <span className="font-bold text-base text-pink-500">{selectedPlanDetails.price}</span>
            </div>
          </div>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
            <div>
              <p className="font-bold text-gray-900 text-sm">Secure Transaction</p>
              <p className="text-xs text-gray-600">Your payment is protected with end-to-end encryption.</p>
            </div>
          </div>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <Heart className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
            <div>
              <p className="font-bold text-gray-900 text-sm">Our Love Guarantee</p>
              <p className="text-xs text-gray-600"></p>
            </div>
          </div>
        </div>
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-bold text-base shadow-lg hover:from-pink-700 hover:to-purple-700 transition"
        >
          Complete Payment
        </button>
      </div>
    );
  };

  // Success Screen
  const renderSuccessScreen = () => (
    <div className="w-full text-center relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="absolute inset-0 bg-pink-50 opacity-20" />
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-pink-500" />
        <h2 className="text-3xl font-bold text-pink-500">
          Welcome to Your Love Journey!
        </h2>
        <Sparkles className="w-6 h-6 text-pink-500" />
      </div>
      <p className="text-gray-800 mb-6 text-base max-w-lg mx-auto relative z-10 font-medium">
        Your subscription is active! Get ready to meet your perfect match.
      </p>
      <button
        onClick={() => setIsPaymentComplete(false)}
        className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-8 rounded-lg font-bold relative z-10 shadow-lg hover:from-pink-700 hover:to-purple-700 transition"
      >
        Start Matching Now
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen relative flex flex-col lg:flex-row ${gradientBg}`}>
      <BackButton />
      <div className="flex-grow flex flex-col relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <h1 className="text-4xl font-bold text-pink-500">
                Find Your Soulmate
              </h1>
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-gray-800 text-base max-w-2xl mx-auto font-medium">
              Select your perfect plan and start your journey to love with our premium matchmaking services.
            </p>
          </div>
          {renderStepIndicator()}
          <div className={`${glassBg} shadow-xl rounded-2xl p-6 md:p-10`}>
            {isPaymentComplete ? (
              renderSuccessScreen()
            ) : (
              <>
                {step === 1 && renderPlanSelection()}
                {step === 2 && renderPaymentMethod()}
                {step === 3 && renderOrderSummary()}
              </>
            )}
            {!isPaymentComplete && step !== 3 && (
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className={`py-2 px-4 rounded-lg font-medium text-sm flex items-center
                    ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-pink-50 transition'}`}
                  disabled={step === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </button>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-6 rounded-lg font-medium text-sm flex items-center shadow-lg hover:from-pink-700 hover:to-purple-700 transition"
                >
                  Continue <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingProcess;