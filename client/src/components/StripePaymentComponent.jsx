import { useState } from 'react';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Check, ArrowLeft, Loader2 } from 'lucide-react';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const CheckoutForm = ({ selectedPlan, onPaymentSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState('');

  const planDetails = {
    'blossom': { price: 2000, name: 'Blossom Plan', features: ['Basic features', '7-day trial'] },
    'harmony': { price: 3300, name: 'Harmony Plan', features: ['All basic features', 'Priority support'] },
    'forever': { price: 6600, name: 'Forever Plan', features: ['All premium features', 'Lifetime access'] }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError('');
    setPaymentStatus(null);

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: planDetails[selectedPlan].price,
          currency: 'usd'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name'
          }
        }
      });

      if (result.error) {
        setPaymentStatus('error');
        setPaymentError(result.error.message || 'Payment failed');
      } else {
        setPaymentStatus('success');
        setTimeout(() => onPaymentSuccess(), 1500);
      }
    } catch (error) {
      setPaymentStatus('error');
      setPaymentError(error.message || 'An error occurred during payment');
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
        </div>

        {/* Plan Summary */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg text-indigo-800 mb-2">
            {planDetails[selectedPlan].name}
          </h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            ${planDetails[selectedPlan].price / 100}
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            {planDetails[selectedPlan].features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Method</h3>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#374151',
                      '::placeholder': {
                        color: '#9CA3AF',
                      },
                      iconColor: '#4F46E5',
                    },
                    invalid: {
                      color: '#EF4444',
                      iconColor: '#EF4444',
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>

          {/* Payment Button */}
          <motion.button
            type="submit"
            disabled={isProcessing || !stripe}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-all ${
              isProcessing || !stripe
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay ${planDetails[selectedPlan].price / 100}
              </>
            )}
          </motion.button>

          {/* Payment Status */}
          {paymentStatus === 'success' && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 mr-2" />
              Payment Successful! Redirecting...
            </div>
          )}
          
          {paymentStatus === 'error' && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg">
              <p className="font-medium">Payment Failed</p>
              <p className="text-sm">{paymentError}</p>
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your payment is secured with 256-bit SSL encryption</p>
          <div className="flex justify-center mt-2 space-x-4">
            <span className="text-xs">Visa</span>
            <span className="text-xs">Mastercard</span>
            <span className="text-xs">Amex</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  selectedPlan: PropTypes.oneOf(['blossom', 'harmony', 'forever']).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

const StripePaymentComponent = ({ selectedPlan, onPaymentSuccess, onBack }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        selectedPlan={selectedPlan} 
        onPaymentSuccess={onPaymentSuccess}
        onBack={onBack}
      />
    </Elements>
  );
};

StripePaymentComponent.propTypes = {
  selectedPlan: PropTypes.oneOf(['blossom', 'harmony', 'forever']).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default StripePaymentComponent;