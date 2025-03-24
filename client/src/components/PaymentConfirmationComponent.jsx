import { CreditCard, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; 

const PaymentConfirmationComponent = ({ option, onConfirm, onCancel }) => {
  const getOptionDetails = () => {
    if (option === "private") {
      return {
        title: "Private Profile",
        price: "$9.99/month",
        icon: <Shield className="w-6 h-6" />,
      };
    } else {
      return {
        title: "Public Profile",
        price: "$4.99/month",
        icon: <Globe className="w-6 h-6" />,
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
        <p className="text-gray-600 text-sm">
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
  option: PropTypes.string.isRequired, // ✅ Should be a string
  onConfirm: PropTypes.func.isRequired, // ✅ Should be a function
  onCancel: PropTypes.func.isRequired, // ✅ Should be a function
};

export default PaymentConfirmationComponent;