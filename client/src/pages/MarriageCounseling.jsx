
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';

// Packages remain the same
const packages = [
  {
    id: 1,
    name: "Strong Foundation",
    description: "Pre-marital or relationship building",
    sessions: 5,
    priceNGN: 300000,
    priceUSD: 187.50,
    duration: "5 sessions",
    features: [
      "Comprehensive pre-marital assessment",
      "Communication skills development",
      "Conflict resolution strategies",
      "Financial planning guidance",
      "Family planning discussion"
    ]
  },
  {
    id: 2,
    name: "Reconnect Package",
    description: "For couples needing to rebuild trust",
    sessions: 5,
    priceNGN: 400000,
    priceUSD: 250.00,
    duration: "5 sessions",
    features: [
      "Trust rebuilding exercises",
      "Intimacy restoration",
      "Boundary setting",
      "Emotional healing",
      "Rebuilding connection"
    ]
  },
  {
    id: 3,
    name: "Better Together",
    description: "Strengthen communication and connection",
    sessions: 5,
    priceNGN: 350000,
    priceUSD: 218.75,
    duration: "5 sessions",
    features: [
      "Advanced communication techniques",
      "Conflict resolution",
      "Emotional intelligence",
      "Connection building",
      "Relationship growth"
    ]
  }
];

// Enhanced counselors with images, bios, ratings, and specialties
const counselors = [
  {
    id: 1,
    name: "Dr. Amara Okafor",
    specialty: "Pre-marital & Relationship Building",
    experience: "12 years",
    image: "/assets/counselors/amara.jpg",
    rating: 4.9,
    reviews: 210,
    bio: "Certified marriage counselor with a passion for helping couples build strong foundations. Fluent in English and Igbo. Known for her empathetic and practical approach.",
    languages: ["English", "Igbo"],
    location: "Lagos, NG"
  },
  {
    id: 2,
    name: "Dr. Tunde Balogun",
    specialty: "Trust & Intimacy Restoration",
    experience: "10 years",
    image: "/assets/counselors/tunde.jpg",
    rating: 4.8,
    reviews: 180,
    bio: "Expert in rebuilding trust and intimacy. Uses evidence-based techniques to help couples reconnect. Fluent in English and Yoruba.",
    languages: ["English", "Yoruba"],
    location: "Abuja, NG"
  },
  {
    id: 3,
    name: "Dr. Ifeoma Eze",
    specialty: "Communication & Conflict Resolution",
    experience: "15 years",
    image: "/assets/counselors/ifeoma.jpg",
    rating: 5.0,
    reviews: 250,
    bio: "Specializes in advanced communication and conflict resolution. Integrates modern and traditional approaches. Fluent in English and Hausa.",
    languages: ["English", "Hausa"],
    location: "Port Harcourt, NG"
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    specialty: "Financial & Family Planning",
    experience: "9 years",
    image: "/assets/counselors/michael.jpg",
    rating: 4.7,
    reviews: 140,
    bio: "Focuses on financial planning and family dynamics. Helps couples align their goals for a harmonious future.",
    languages: ["English"],
    location: "Ibadan, NG"
  }
];

// Card input validation helpers
const validateCardNumber = (num) => /^\d{16}$/.test(num.replace(/\s/g, ''));
const validateExpiry = (exp) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
const validateCVC = (cvc) => /^\d{3,4}$/.test(cvc);

const MarriageCounseling = () => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Card form state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [cardErrors, setCardErrors] = useState({});
  const [cardProcessing, setCardProcessing] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBooking = async () => {
    if (paymentMethod === 'card') {
      // Validate card
      const errors = {};
      if (!validateCardNumber(cardDetails.number)) errors.number = "Invalid card number";
      if (!cardDetails.name) errors.name = "Cardholder name required";
      if (!validateExpiry(cardDetails.expiry)) errors.expiry = "Invalid expiry (MM/YY)";
      if (!validateCVC(cardDetails.cvc)) errors.cvc = "Invalid CVC";
      setCardErrors(errors);
      if (Object.keys(errors).length > 0) return;
      setCardProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setCardProcessing(false);
        setShowConfirmation(true);
      }, 1500);
    } else {
      setShowConfirmation(true);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Back Button */}
      {step > 1 && (
        <div className="fixed top-6 left-6 z-50">
          <motion.button
            onClick={handleBack}
            className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-100 hover:bg-pink-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
            <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
          </motion.button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Choose Your Journey */}
        {step === 1 && (
          <motion.div
            key="step1"
            className="flex-1 flex flex-col items-center justify-center p-4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Marriage <span className="text-pink-600">Counseling</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
              Strengthen your marriage with our professional counseling packages designed to help couples thrive.
            </p>
            <motion.button
              className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              onClick={() => setStep(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Counseling Plans
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Display Plans */}
        {step === 2 && (
          <motion.div
            key="step2"
            className="flex-1 flex flex-col items-center p-4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Counseling Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  className="bg-white p-6 rounded-xl border border-pink-100 hover:shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setStep(3);
                  }}
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{pkg.name}</h2>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                  <p className="text-lg font-bold mt-4 text-pink-600">
                    ₦{pkg.priceNGN.toLocaleString()} / ${pkg.priceUSD}
                  </p>
                  <p className="text-gray-500">{pkg.duration}</p>
                  <ul className="mt-4 space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm Plan */}
        {step === 3 && (
          <motion.div
            key="step3"
            className="flex-1 flex flex-col items-center p-4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Confirm Your Plan</h1>
            {selectedPackage && (
              <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-800">{selectedPackage.name}</h2>
                <p className="text-gray-600 mt-2">{selectedPackage.description}</p>
                <p className="text-lg font-bold mt-4 text-pink-600">
                  ₦{selectedPackage.priceNGN.toLocaleString()} / ${selectedPackage.priceUSD}
                </p>
                <p className="text-gray-500">{selectedPackage.duration}</p>
                <ul className="mt-4 space-y-2">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors w-full"
                  onClick={() => setStep(4)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Select Counselor
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Choose Counselor */}
        {step === 4 && (
          <motion.div
            key="step4"
            className="flex-1 flex flex-col items-center p-4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Choose Your Counselor</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
              {counselors.map((counselor) => (
                <motion.div
                  key={counselor.id}
                  className="bg-white p-6 rounded-xl border border-pink-100 hover:shadow-lg cursor-pointer flex flex-col items-center"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    setSelectedCounselor(counselor);
                    setStep(5);
                  }}
                >
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-pink-100"
                    onError={e => { e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; }}
                  />
                  <h2 className="text-xl font-semibold text-gray-800">{counselor.name}</h2>
                  <div className="flex items-center text-yellow-400 mt-1 mb-1">
                    {Array(Math.floor(counselor.rating)).fill('★').join('')}
                    <span className="text-gray-600 text-xs ml-2">({counselor.reviews} reviews)</span>
                  </div>
                  <p className="text-pink-600 font-medium">{counselor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-2">{counselor.experience} experience</p>
                  <p className="text-gray-500 text-xs mb-2">{counselor.location}</p>
                  <p className="text-gray-600 text-xs mb-2"><span className="font-semibold">Languages:</span> {counselor.languages.join(', ')}</p>
                  <p className="text-gray-600 text-xs">{counselor.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 5: Book Session */}
        {step === 5 && (
          <motion.div
            key="step5"
            className="flex-1 flex flex-col items-center p-4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Book Your Session</h1>
            <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-semibold text-gray-800">Booking Summary</h2>
              <p className="text-gray-600 mt-2">Package: {selectedPackage?.name}</p>
              <p className="text-gray-600">Counselor: {selectedCounselor?.name}</p>
              <p className="text-lg font-bold mt-4 text-pink-600">
                Total: ₦{selectedPackage?.priceNGN.toLocaleString()} / ${selectedPackage?.priceUSD}
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                <div className="flex gap-4 mt-2">
                  <button
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      paymentMethod === 'card' ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-600 border border-pink-600'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Card
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      paymentMethod === 'bank' ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-600 border border-pink-600'
                    }`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    Bank Transfer
                  </button>
                </div>
                {paymentMethod === 'card' && (
                  <form
                    className="mt-4 space-y-4"
                    onSubmit={e => {
                      e.preventDefault();
                      handleBooking();
                    }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className={`mt-1 block w-full rounded-md border ${cardErrors.number ? 'border-red-400' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200`}
                        value={cardDetails.number}
                        onChange={e => setCardDetails({ ...cardDetails, number: e.target.value.replace(/[^\d ]/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                        autoComplete="cc-number"
                      />
                      {cardErrors.number && <span className="text-xs text-red-500">{cardErrors.number}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                      <input
                        type="text"
                        className={`mt-1 block w-full rounded-md border ${cardErrors.name ? 'border-red-400' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200`}
                        value={cardDetails.name}
                        onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })}
                        autoComplete="cc-name"
                      />
                      {cardErrors.name && <span className="text-xs text-red-500">{cardErrors.name}</span>}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          className={`mt-1 block w-full rounded-md border ${cardErrors.expiry ? 'border-red-400' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200`}
                          value={cardDetails.expiry}
                          onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value.replace(/[^0-9/]/g, '').replace(/^(\d{2})(\d{1,2})$/, '$1/$2') })}
                          autoComplete="cc-exp"
                        />
                        {cardErrors.expiry && <span className="text-xs text-red-500">{cardErrors.expiry}</span>}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">CVC</label>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="CVC"
                          className={`mt-1 block w-full rounded-md border ${cardErrors.cvc ? 'border-red-400' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200`}
                          value={cardDetails.cvc}
                          onChange={e => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '') })}
                          autoComplete="cc-csc"
                        />
                        {cardErrors.cvc && <span className="text-xs text-red-500">{cardErrors.cvc}</span>}
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={cardProcessing}
                    >
                      {cardProcessing ? "Processing..." : "Pay & Confirm Booking"}
                    </motion.button>
                  </form>
                )}
                {paymentMethod === 'bank' && (
                  <div className="mt-4 text-gray-600">
                    <p>Bank: <span className="font-semibold">Providus Bank</span></p>
                     <p className="text-gray-800"><strong>Account Name:</strong> Arigo Energy Services Ltd</p>
                    <p className="text-gray-800"><strong>Account Number:</strong> 5400881912</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Please make payment to the account above and contact us to confirm your booking.
                    </p>
                    <motion.button
                      className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors w-full"
                      onClick={handleBooking}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Confirm Booking
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl max-w-md w-full p-6 border border-pink-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              You have successfully booked your <span className="text-pink-600">{selectedPackage?.name}</span> session with{' '}
              <span className="text-pink-600">{selectedCounselor?.name}</span>.
            </p>
            <div className="flex items-center mb-4">
              <img
                src={selectedCounselor?.image}
                alt={selectedCounselor?.name}
                className="w-14 h-14 object-cover rounded-full border-2 border-pink-100 mr-4"
                onError={e => { e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; }}
              />
              <div>
                <div className="font-semibold text-gray-800">{selectedCounselor?.name}</div>
                <div className="text-xs text-gray-500">{selectedCounselor?.specialty}</div>
                <div className="text-xs text-gray-500">{selectedCounselor?.experience} experience</div>
              </div>
            </div>
            <div className="mb-6 p-4 bg-pink-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">Next Steps</h3>
              {paymentMethod === 'bank' ? (
                <p className="text-gray-600 text-sm">
                  Please make payment to:<br />
                  Bank: Providus Bank<br />
                  Account Name: Arigo Energy<br />
                  Account Number: 1234567890<br />
                  Contact us at <a href="mailto:info@miamour.me" className="text-pink-600 hover:underline">info@miamour.me</a> to confirm your payment.
                </p>
              ) : (
                <p className="text-gray-600 text-sm">
                  Your card payment was successful. A confirmation email will be sent to you shortly.
                </p>
              )}
            </div>
            <motion.button
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors w-full"
              onClick={() => {
                setShowConfirmation(false);
                setStep(1);
                setSelectedPackage(null);
                setSelectedCounselor(null);
                setCardDetails({ number: '', name: '', expiry: '', cvc: '' });
                setCardErrors({});
                navigate('/homepage');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Home
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarriageCounseling;
