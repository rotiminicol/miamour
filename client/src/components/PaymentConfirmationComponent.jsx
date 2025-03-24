import { CreditCard, Shield, Globe, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; 

const PaymentConfirmationComponent = ({ option, onConfirm, onCancel }) => {
  const getOptionDetails = () => {
    switch(option) {
      case "blossom":
        return {
          title: "Blossom Package",
          price: "₦30,000 / $20 / £18",
          icon: <Sparkles className="w-6 h-6" />,
          features: [
            "Exclusive matchmaking within your country",
            "Access to live sessions"
          ]
        };
      case "harmony":
        return {
          title: "Harmony Package",
          price: "₦50,000 / $33 / €30",
          icon: <Heart className="w-6 h-6" />,
          features: [
            "Exclusive matchmaking within and outside your country",
            "Access to live sessions"
          ]
        };
      case "forever":
        return {
          title: "My Forever Package",
          price: "₦100,000 / $66 / €60",
          icon: <Shield className="w-6 h-6" />,
          features: [
            "Personal matches & private sessions",
            "Access to high profile members",
            "Matches within and outside Nigeria"
          ]
        };
      default:
        return {
          title: "Basic Package",
          price: "Free",
          icon: <Globe className="w-6 h-6" />,
          features: ["Basic matchmaking features"]
        };
    }
  };

  const details = getOptionDetails();

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Confirm Your Selection
      </h2>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
            {details.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {details.title}
            </h3>
            <p className="text-pink-600 font-bold">{details.price}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {details.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg className="w-4 h-4 text-pink-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-gray-600 text-sm">{feature}</p>
            </div>
          ))}
        </div>
        
        <p className="text-gray-600 text-sm pt-2 border-t border-gray-200">
          Your subscription will renew automatically. You can cancel anytime from your account settings.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <p className="text-gray-700 mb-2">
          Your profile will be ready for matching immediately after payment.
        </p>
        <p className="text-gray-700">
          Our matchmaking experts will begin reviewing your profile within 3 hours.
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center"
          onClick={onConfirm}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Confirm Payment
        </motion.button>
        <button
          className="w-full py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition"
          onClick={onCancel}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

PaymentConfirmationComponent.propTypes = {
  option: PropTypes.oneOf(["blossom", "harmony", "forever"]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentConfirmationComponent;