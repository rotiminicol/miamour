import { Lock, Globe, Check } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";  // Import PropTypes

const PrivacySelectionComponent = ({ onSelect, selectedOption }) => {
  const options = [
    {
      id: "private",
      title: "Private Profile",
      description: "Only selected matches can view your profile details",
      price: "$9.99/month",
      icon: <Lock className="w-6 h-6" />,
    },
    {
      id: "public",
      title: "Public Profile",
      description: "Anyone in our network can view your profile details",
      price: "$4.99/month",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Choose Your Privacy Setting
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Select how visible you want your profile to be in our matchmaking network
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <p className="text-gray-600 mb-4">{option.description}</p>
            <p className="text-lg font-bold text-pink-600">{option.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
PrivacySelectionComponent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

export default PrivacySelectionComponent;
