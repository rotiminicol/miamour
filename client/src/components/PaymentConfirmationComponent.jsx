import { CreditCard, Shield, Globe, Heart, Sparkles, Banknote, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const PaymentConfirmationComponent = ({ option, onConfirm, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const getOptionDetails = () => {
    switch (option) {
      case "blossom":
        return {
          title: "Blossom Package",
          price: "₦30,000 / $20 / £18",
          icon: <Sparkles className="w-6 h-6" />,
          features: [
            "Exclusive matchmaking within your country",
            "Access to live sessions",
          ],
        };
      case "harmony":
        return {
          title: "Harmony Package",
          price: "₦50,000 / $33 / €30",
          icon: <Heart className="w-6 h-6" />,
          features: [
            "Exclusive matchmaking within and outside your country",
            "Access to live sessions",
          ],
        };
      case "forever":
        return {
          title: "My Forever Package",
          price: "₦100,000 / $66 / €60",
          icon: <Shield className="w-6 h-6" />,
          features: [
            "Personal matches & private sessions",
            "Access to high profile members",
            "Matches within and outside Nigeria",
          ],
        };
      default:
        return {
          title: "Basic Package",
          price: "Free",
          icon: <Globe className="w-6 h-6" />,
          features: ["Basic matchmaking features"],
        };
    }
  };

  const details = getOptionDetails();

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleBankTransferConfirm = () => {
    // Simulate bank transfer confirmation (in a real app, this would involve backend verification)
    onConfirm({ method: "bank_transfer" });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative z-10">
        Confirm Your Selection
      </h2>

      <div className="bg-gray-50 rounded-xl p-6 mb-6 relative z-10">
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
              <svg
                className="w-4 h-4 text-pink-500 mt-1 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p className="text-gray-600 text-sm">{feature}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-sm pt-2 border-t border-gray-200">
          Your subscription will renew automatically. You can cancel anytime from
          your account settings.
        </p>
      </div>

      <AnimatePresence>
        {!paymentMethod ? (
          <motion.div
            key="method-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePaymentMethodSelect("card")}
                className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all"
              >
                <CreditCard className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-gray-700 font-medium">Bank Card</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePaymentMethodSelect("transfer")}
                className="flex flex-col items-center p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all"
              >
                <Banknote className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-gray-700 font-medium">Bank Transfer</span>
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition flex items-center justify-center"
              onClick={onCancel}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </motion.button>
          </motion.div>
        ) : paymentMethod === "card" ? (
          <motion.div
            key="card-payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="border-t border-gray-200 pt-6 mb-6">
              <p className="text-gray-700 mb-2">
                Your profile will be ready for matching immediately after payment.
              </p>
              <p className="text-gray-700">
                Our matchmaking experts will begin reviewing your profile within 3
                hours.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center"
                onClick={() => onConfirm({ method: "card" })}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Confirm Card Payment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition flex items-center justify-center"
                onClick={() => setPaymentMethod(null)}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Change Payment Method
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="transfer-payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bank Transfer Details
            </h3>
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Bank Name:</span> Zenith Bank
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Account Name:</span> Matchmaking
                Services Ltd
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Account Number:</span> 1234567890
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Reference:</span> {option}_
                {Date.now()}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Please include the reference number in your transfer description.
                Your subscription will be activated within 24 hours of payment
                confirmation.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center"
                onClick={handleBankTransferConfirm}
              >
                <Banknote className="w-5 h-5 mr-2" />
                I Have Made the Transfer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition flex items-center justify-center"
                onClick={() => setPaymentMethod(null)}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Change Payment Method
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

PaymentConfirmationComponent.propTypes = {
  option: PropTypes.oneOf(["blossom", "harmony", "forever"]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentConfirmationComponent;