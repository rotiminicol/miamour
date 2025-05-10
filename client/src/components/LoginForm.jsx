import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'; // Added FaGoogle
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/useAuthStore';

const LoginForm = ({ toggleForm, onGoogleClick, onIjeuwaClick }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuthStore();
  const emailRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      await login({ email: form.email.trim(), password: form.password });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error?.response?.data?.message || error?.message || 'Login failed. Please try again.',
      }));
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Sign in to continue your journey</p>
        </div>

        {errors.general && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded" role="alert">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              value={form.email}
              autoComplete="email"
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={loading}
              autoFocus
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-pink-600 hover:text-pink-700"
                tabIndex={loading ? -1 : 0}
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={form.password}
                autoComplete="current-password"
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-600"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-base text-white font-medium transition-colors ${
              loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
            } flex items-center justify-center`}
            disabled={loading}
          >
            <FaHeart className="mr-2" size={16} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Third-party Authentication Buttons */}
        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={onGoogleClick}
            className={`w-full py-2 px-4 rounded-md text-base font-medium flex items-center justify-center border border-gray-300 hover:bg-gray-50 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            <FaGoogle className="mr-2" size={16} />
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={onIjeuwaClick}
            className={`w-full py-2 px-4 rounded-md text-base font-medium flex items-center justify-center border border-gray-300 hover:bg-gray-50 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            Sign in with Ijeuwa
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <button
            onClick={toggleForm}
            className="text-pink-600 hover:text-pink-700 font-medium"
            type="button"
            disabled={loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
  onIjeuwaClick: PropTypes.func.isRequired,
};

export default LoginForm;