import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const IjeuwaAuthFlow = ({ isLogin, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('initial'); // initial, phone, verification, profile, complete
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    verificationCode: '',
    name: '',
    dateOfBirth: '',
    gender: '',
  });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStartAuth = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setStep('phone');
      setLoading(false);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPhone = (e) => {
    e.preventDefault();
    if (!formData.phoneNumber) {
      setError('Please enter your phone number');
      return;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setStep('verification');
      setLoading(false);
    }, 1000);
  };

  const handleSubmitVerification = (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        setStep('complete');
      } else {
        setStep('profile');
      }
      setLoading(false);
    }, 1000);
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dateOfBirth || !formData.gender) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setStep('complete');
      setLoading(false);
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
    if (step === 'complete') {
      if (onSuccess) {
        onSuccess(formData);
      } else {
        const timer = setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [step, formData, onSuccess, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {step === 'initial' && (
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-4">
            <FaHeart size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-pink-600">
            {isLogin ? 'Sign in with Ijeuwa' : 'Sign up with Ijeuwa'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isLogin
              ? 'Sign in to your account using your Ijeuwa identity'
              : 'Create a new account using your Ijeuwa profile'}
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={handleStartAuth}
            disabled={loading}
            aria-label={isLogin ? 'Sign in with Ijeuwa' : 'Sign up with Ijeuwa'}
            className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium flex items-center justify-center"
          >
            <FaHeart className="mr-2" />
            {loading ? 'Connecting...' : 'Continue with Ijeuwa'}
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

      {step === 'phone' && (
        <div>
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-4">
              <FaHeart size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Enter your details</h2>
            <p className="text-gray-500 text-sm">Well send a verification code to your phone</p>
          </div>
          
          <form onSubmit={handleSubmitPhone}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
            
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              aria-label="Submit phone number and email"
              className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium"
            >
              {loading ? 'Sending code...' : 'Continue'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setStep('initial')}
              aria-label="Go back to initial step"
              className="text-pink-600 hover:text-pink-700 text-sm"
            >
              Go back
            </button>
          </div>
        </div>
      )}

      {step === 'verification' && (
        <div>
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-4">
              <FaHeart size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Verify your phone</h2>
            <p className="text-gray-500 text-sm">
              Weve sent a code to {formData.phoneNumber}
            </p>
          </div>
          
          <form onSubmit={handleSubmitVerification}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter 6-digit code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              aria-label="Verify code"
              className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setStep('phone')}
              aria-label="Resend verification code"
              className="text-pink-600 hover:text-pink-700 text-sm"
            >
              Resend code
            </button>
            <span className="mx-2 text-gray-300">|</span>
            <button
              onClick={() => setStep('phone')}
              aria-label="Change phone number"
              className="text-pink-600 hover:text-pink-700 text-sm"
            >
              Change phone number
            </button>
          </div>
        </div>
      )}

      {step === 'profile' && (
        <div>
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-4">
              <FaHeart size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Complete your profile</h2>
            <p className="text-gray-500 text-sm">
              Tell us a bit more about yourself
            </p>
          </div>
          
          <form onSubmit={handleSubmitProfile}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    required
                    aria-required="true"
                  />
                  <label htmlFor="male" className="ml-2 text-sm text-gray-600">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label htmlFor="female" className="ml-2 text-sm text-gray-600">
                    Female
                  </label>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              aria-label="Complete sign up"
              className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium"
            >
              {loading ? 'Creating profile...' : 'Complete Sign Up'}
            </button>
          </form>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center">
          <div className="mb-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-pink-600">
            {isLogin ? 'Sign in Successful!' : 'Account Created!'}
          </h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
};

IjeuwaAuthFlow.propTypes = {
  isLogin: PropTypes.bool,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

IjeuwaAuthFlow.defaultProps = {
  isLogin: true,
};

export default IjeuwaAuthFlow;