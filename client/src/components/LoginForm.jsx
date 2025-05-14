import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/useAuthStore';

const LoginForm = ({ toggleForm }) => {
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
      await login({ 
        email: form.email.trim(), 
        password: form.password 
      });
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error?.response?.data?.message || 
                         error?.message || 
                         'Login failed. Please check your credentials and try again.';
      
      setErrors({
        ...errors,
        general: errorMessage
      });
      
      // Clear the password field on error
      setForm(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-pink-600">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-2">Sign in to continue your journey</p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md" role="alert">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2z" clipRule="evenodd" />
            </svg>
            <span>{errors.general}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-1 space-y-4" autoComplete="on" noValidate>
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

      <div className="mt-4 text-center text-sm text-gray-500">
        Dont have an account?{' '}
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
  );
};

LoginForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;