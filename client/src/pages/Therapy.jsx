import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { FiArrowLeft, FiCheck, FiStar } from 'react-icons/fi';

// Sample data (ideally moved to separate files)
const therapyPlans = [
  {
    id: 1,
    name: "Reset Package",
    description: "For those needing a fresh start",
    sessions: 5,
    priceNGN: 250000,
    priceUSD: 156.25,
    save: "15%",
    features: [
      "Comprehensive assessment",
      "New perspective techniques",
      "Goal setting",
      "Action plan development"
    ]
  },
  {
    id: 2,
    name: "Healing Plan",
    description: "Deep emotional work and recovery",
    sessions: 5,
    priceNGN: 350000,
    priceUSD: 218.75,
    save: "25%",
    popular: true,
    features: [
      "Emotional healing",
      "Trauma recovery",
      "Mind-body connection",
      "Resilience building"
    ]
  },
  {
    id: 3,
    name: "Mindful Living",
    description: "Focus on stress and anxiety reduction",
    sessions: 5,
    priceNGN: 300000,
    priceUSD: 156.25,
    save: "15%",
    features: [
      "Mindfulness practices",
      "Stress management",
      "Relaxation techniques",
      "Coping strategies"
    ]
  },
  {
    id: 4,
    name: "Inner Peace",
    description: "Managing depression and finding balance",
    sessions: 5,
    priceNGN: 400000,
    priceUSD: 250.00,
    save: "35%",
    features: [
      "Depression management",
      "Mood regulation",
      "Mindfulness training",
      "Life balance"
    ]
  },
  {
    id: 5,
    name: "Confidence Package",
    description: "Self-esteem and personal growth",
    sessions: 5,
    priceNGN: 450000,
    priceUSD: 187.50,
    save: "20%",
    features: [
      "Self-esteem building",
      "Personal growth",
      "Boundary setting",
      "Empowerment techniques"
    ]
  }
];

const therapists = [
  { id: 1, name: "Dr. Jane Smith", specialty: "Emotional Healing", image: "/assets/therapist1.jpg", rating: 4.9, reviews: 128 },
  { id: 2, name: "Dr. Michael Brown", specialty: "Stress Management", image: "/assets/therapist2.jpg", rating: 4.8, reviews: 95 },
  { id: 3, name: "Dr. Sarah Johnson", specialty: "Depression Management", image: "/assets/therapist3.jpg", rating: 4.7, reviews: 112 }
];

// Time slots for scheduling (9 AM to 5 PM)
const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const PlanCard = React.memo(({ plan, onClick }) => (
  <div
    className={`relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
      plan.popular ? 'ring-2 ring-pink-500' : 'border border-gray-100'
    }`}
    onClick={onClick}
    role="button"
    aria-label={`Select ${plan.name} plan`}
    tabIndex="0"
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    {plan.popular && (
      <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-tr-xl rounded-bl-lg flex items-center">
        <FiStar className="mr-1" /> Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
    <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
    
    <div className="mt-4 flex items-end">
      <p className="text-pink-500 font-bold text-2xl">₦{plan.priceNGN.toLocaleString()}</p>
      <p className="text-gray-500 text-sm ml-2 mb-1">≈ ${plan.priceUSD.toFixed(2)}</p>
    </div>
    
    {plan.save && (
      <div className="mt-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full inline-block">
        Save {plan.save}
      </div>
    )}
    
    <p className="text-gray-600 mt-3 text-sm">{plan.sessions} sessions</p>
    
    <ul className="mt-4 space-y-2">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-start text-gray-700 text-sm">
          <FiCheck className="flex-shrink-0 text-pink-500 mt-0.5 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button
      className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
      aria-label={`Choose ${plan.name} plan`}
    >
      Choose Plan
    </button>
  </div>
));

PlanCard.displayName = 'PlanCard';

PlanCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sessions: PropTypes.number.isRequired,
    priceNGN: PropTypes.number.isRequired,
    priceUSD: PropTypes.number.isRequired,
    save: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    popular: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const TherapistModal = ({ isOpen, onClose, therapists, onSelect }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white p-6 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Therapist</h2>
        <p className="text-gray-600 mb-6">Choose the professional that best fits your needs</p>
        
        <div className="space-y-4">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="flex items-start p-4 border border-gray-100 rounded-xl hover:bg-pink-50 cursor-pointer transition-colors"
              onClick={() => onSelect(therapist)}
              role="button"
              aria-label={`Select therapist ${therapist.name}`}
              tabIndex="0"
              onKeyDown={(e) => e.key === 'Enter' && onSelect(therapist)}
            >
              <img 
                src={therapist.image} 
                alt={therapist.name} 
                className="w-16 h-16 rounded-xl object-cover mr-4" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/therapist-placeholder.jpg';
                }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{therapist.name}</h3>
                <p className="text-gray-600 text-sm">{therapist.specialty}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(therapist.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs ml-1">
                    {therapist.rating} ({therapist.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-100 text-gray-800 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          aria-label="Close therapist selection"
        >
          Close
        </button>
      </div>
    </div>
  );
};

TherapistModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  therapists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const PaymentModal = ({ isOpen, onClose, plan, therapist, onPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [schedule, setSchedule] = useState({
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateCard = useCallback(() => {
    const newErrors = {};
    if (!cardDetails.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardDetails.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      newErrors.expiry = 'Expiry must be MM/YY';
    }
    if (!cardDetails.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    if (!cardDetails.name.trim()) {
      newErrors.name = 'Name on card is required';
    }
    return newErrors;
  }, [cardDetails]);

  const validateSchedule = useCallback(() => {
    const newErrors = {};
    const today = new Date();
    const selectedDate = new Date(schedule.date);
    if (!schedule.date || selectedDate < today.setHours(0, 0, 0, 0)) {
      newErrors.date = 'Please select a future date';
    }
    if (!schedule.time) {
      newErrors.time = 'Please select a time slot';
    }
    return newErrors;
  }, [schedule]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({...cardDetails, cardNumber: formatted.replace(/\s/g, '')});
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails({...cardDetails, expiry: value});
  };

  const handlePayment = async () => {
    try {
      const cardErrors = paymentMethod === 'card' ? validateCard() : {};
      const scheduleErrors = validateSchedule();
      const allErrors = { ...cardErrors, ...scheduleErrors };
      
      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors);
        toast.error('Please fix the errors');
        return;
      }
      
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onPayment({ date: schedule.date, time: schedule.time });
      toast.success('Payment successful!');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white p-6 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Purchase</h2>
        <p className="text-gray-600 mb-6">
          {plan.name} with {therapist.name}
        </p>
        
        <div className="bg-pink-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Total Amount:</span>
            <span className="text-pink-600 font-bold text-xl">₦{plan.priceNGN.toLocaleString()}</span>
          </div>
          <p className="text-gray-500 text-sm">≈ ${plan.priceUSD.toFixed(2)}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Schedule Your Session</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                value={schedule.date}
                onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                aria-label="Session date"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <select
                value={schedule.time}
                onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                aria-label="Session time"
              >
                <option value="">Select time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-3 border rounded-lg flex items-center justify-center transition-colors ${
                paymentMethod === 'card' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setPaymentMethod('card')}
              aria-label="Pay with card"
            >
              <span className="font-medium">Credit Card</span>
            </button>
            <button
              className={`p-3 border rounded-lg flex items-center justify-center transition-colors ${
                paymentMethod === 'transfer' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setPaymentMethod('transfer')}
              aria-label="Pay with bank transfer"
            >
              <span className="font-medium">Bank Transfer</span>
            </button>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name on Card</label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="John Doe"
                aria-label="Name on card"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Card Number</label>
              <input
                type="text"
                value={formatCardNumber(cardDetails.cardNumber)}
                onChange={handleCardNumberChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                aria-label="Card number"
                maxLength="19"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={handleExpiryChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="MM/YY"
                  aria-label="Card expiry date"
                  maxLength="5"
                />
                {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
             开发
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="123"
                  aria-label="Card CVV"
                  maxLength="4"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Bank Transfer Details</h3>
            <div className="space-y-3">
              <div>
               
                <p className="text-gray-800"><strong>Bank:</strong> Providus Bank</p>
              </div>
              <div>
             
               <p className="text-gray-800"><strong>Account Name:</strong> Arigo Energy Services Ltd</p>
              </div>
              <div>
               
                 <p className="text-gray-800"><strong>Account Number:</strong> 5400881912</p>
              </div>
            </div>
            <p className="text-red-500 text-sm mt-3">
              Please include your full name as payment reference
            </p>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium ${
            isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
          }`}
          aria-label={paymentMethod === 'card' ? 'Pay now' : 'Confirm transfer'}
        >
          {isProcessing ? 'Processing...' : paymentMethod === 'card' ? 'Pay Now' : 'Confirm Transfer'}
        </button>
        
        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          aria-label="Cancel payment"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    priceNGN: PropTypes.number.isRequired,
    priceUSD: PropTypes.number.isRequired,
  }).isRequired,
  therapist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
  onPayment: PropTypes.func.isRequired,
};

const SuccessPopup = ({ isOpen, onClose, schedule }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white p-6 rounded-xl max-w-sm w-full text-center max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-2">Your therapy session has been booked successfully.</p>
        {schedule && (
          <p className="text-gray-600 mb-6">
            Scheduled for {new Date(schedule.date).toLocaleDateString()} at {schedule.time}.
          </p>
        )}
        
        <button
          onClick={() => {
            onClose();
            navigate('/homepage');
          }}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
          aria-label="Go to homepage"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

SuccessPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  schedule: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
};

const Therapy = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handlePlanClick = useCallback((plan) => {
    setSelectedPlan(plan);
    setShowTherapistModal(true);
  }, []);

  const handleTherapistSelect = useCallback((therapist) => {
    setSelectedTherapist(therapist);
    setShowTherapistModal(false);
    setShowPaymentModal(true);
  }, []);

  const handlePayment = useCallback((schedule) => {
    setSelectedSchedule(schedule);
    setShowPaymentModal(false);
    setShowSuccessPopup(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-700 transition-colors px-4 py-2 rounded-lg font-medium text-sm"
            aria-label="Go back"
          >
            <FiArrowLeft className="mr-2 w-5 h-5" /> Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Our Therapy Plans</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
        
        <p className="text-gray-600 mb-8 max-w-3xl">
          Choose from our carefully designed therapy packages. Each plan includes multiple sessions
          with a licensed professional tailored to your specific needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapyPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onClick={() => handlePlanClick(plan)} />
          ))}
        </div>
      </div>
      
      <TherapistModal
        isOpen={showTherapistModal}
        onClose={() => setShowTherapistModal(false)}
        therapists={therapists}
        onSelect={handleTherapistSelect}
      />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={selectedPlan || therapyPlans[0]}
        therapist={selectedTherapist || therapists[0]}
        onPayment={handlePayment}
      />
      
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        schedule={selectedSchedule}
      />
    </div>
  );
};

export default Therapy;