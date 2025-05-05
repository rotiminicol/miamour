import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const GoogleAuthFlow = ({ isLogin, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('initial'); // initial, email, consent, complete
  const [formData, setFormData] = useState({ email: '' });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStartAuth = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setStep('email');
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!formData.email || !validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setStep('consent');
      setLoading(false);
    }, 1000);
  };

  const handleConsent = () => {
    setLoading(true);
    setTimeout(() => {
      setStep('complete');
      setLoading(false);
      if (onSuccess) {
        onSuccess(formData);
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (step === 'complete' && !onSuccess) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, onSuccess, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {step === 'initial' && (
        <div className="text-center">
          <FcGoogle className="mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isLogin
              ? 'Sign in to your account using your Google credentials'
              : 'Create a new account using your Google profile'}
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={handleStartAuth}
            disabled={loading}
            aria-label={isLogin ? 'Sign in with Google' : 'Sign up with Google'}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center justify-center"
          >
            <FcGoogle className="mr-2" size={20} />
            {loading ? 'Connecting...' : 'Continue with Google'}
          </button>
          
          <button
            onClick={handleCancel}
            aria-label="Cancel authentication"
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {step === 'email' && (
        <div>
          <div className="text-center mb-6">
            <FcGoogle className="mx-auto mb-2" size={36} />
            <h2 className="text-xl font-semibold">Enter your Google email</h2>
            <p className="text-gray-500 text-sm">to continue to Love Connect</p>
          </div>
          
          <form onSubmit={handleSubmitEmail}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                aria-required="true"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              aria-label="Submit email address"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setStep('initial')}
              aria-label="Go back to initial step"
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Go back
            </button>
          </div>
        </div>
      )}

      {step === 'consent' && (
        <div className="text-center">
          <FcGoogle className="mx-auto mb-4" size={36} />
          <h2 className="text-xl font-semibold mb-2">Confirm your email</h2>
          <p className="text-gray-600 mb-6">
            Youre signing in with <strong>{formData.email}</strong>
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <div className="mb-4">
              <div className="font-medium">See your personal info</div>
              <div className="text-gray-500 text-sm">Including email address and profile information</div>
            </div>
            <div>
              <div className="font-medium">Access your account</div>
              <div className="text-gray-500 text-sm">To provide personalized matching services</div>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mb-6">
            By continuing, you allow Love Connect to use your Google account information in accordance with their terms of service and privacy policy.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleConsent}
              disabled={loading}
              aria-label="Confirm email and continue"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
            
            <button
              onClick={() => setStep('email')}
              aria-label="Choose another email"
              className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 rounded-md font-medium"
            >
              Choose another email
            </button>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center">
          <div className="mb-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Authentication Successful!</h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
};

GoogleAuthFlow.propTypes = {
  isLogin: PropTypes.bool,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

GoogleAuthFlow.defaultProps = {
  isLogin: true,
};

export default GoogleAuthFlow;