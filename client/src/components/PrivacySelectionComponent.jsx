import {  Check, Heart, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const PrivacySelectionComponent = ({ onSelect, selectedOption }) => {
  const options = [
    {
      id: "blossom",
      title: "Blossom Package",
      description: [
        "Exclusive matchmaking within your country",
        "Access to live sessions"
      ],
      price: "₦30,000 / $20 / £18 per month",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      id: "harmony",
      title: "Harmony Package",
      description: [
        "Exclusive matchmaking within and outside your country",
        "Access to live sessions"
      ],
      price: "₦50,000 / $33 / €30 per month",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: "forever",
      title: "My Forever Package",
      description: [
        "Personal matches & private sessions",
        "Access to high profile members",
        "Matches within and outside Nigeria"
      ],
      price: "₦100,000 / $66 / €60 per month",
      icon: <Crown className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Choose Your Membership Package
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Select the package that best fits your matchmaking needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              selectedOption === option.id
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-300"
            }`}
            onClick={() => onSelect(option.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedOption === option.id
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {option.icon}
              </div>
              {selectedOption === option.id && (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {option.title}
            </h3>
            <ul className="text-gray-600 mb-4 space-y-2">
              {option.description.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-pink-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-pink-600 mt-4">{option.price}</p>
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