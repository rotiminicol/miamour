import { Check, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const plans = [
  {
    id: 'blossom',
    title: 'Blossom Package',
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
    title: 'Harmony Package',
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
    title: 'My Forever Package',
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
    title: 'Personalized Matching',
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

const PrivacySelectionComponent = ({ onSelect, selectedOption }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Choose Your Membership Package
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Select the package that best fits your matchmaking needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 bg-white
              ${selectedOption === plan.id
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-300"
              }`}
            onClick={() => onSelect(plan.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow
                  ${selectedOption === plan.id
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100"
                  }`}
              >
                {plan.icon}
              </div>
              {selectedOption === plan.id && (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {plan.title}
            </h3>
            <ul className="text-gray-600 mb-4 space-y-2">
              {plan.features.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-pink-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-lg font-bold text-pink-600">
                {plan.price} <span className="text-gray-500 font-normal">/ {plan.period}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {plan.priceUSD} / {plan.priceEUR}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

PrivacySelectionComponent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

export default PrivacySelectionComponent;
