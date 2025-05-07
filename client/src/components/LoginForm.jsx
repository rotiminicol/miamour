
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
      await login({ email: form.email.trim(), password: form.password });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error?.response?.data?.message || error?.message || 'Login failed. Please try again.',
      }));
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl px-12 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-600">Welcome Back</h2>
          <p className="text-lg text-gray-500 mt-2">Sign in to continue your journey</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 text-base text-red-600 bg-red-50 rounded" role="alert">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7" autoComplete="on" noValidate>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
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
              className={`w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={loading}
              autoFocus
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-base font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-pink-600 hover:text-pink-700"
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
                className={`w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-600"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="remember-me" className="ml-3 text-base text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-lg text-white font-semibold transition-colors ${
              loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
            } flex items-center justify-center`}
            disabled={loading}
          >
            <FaHeart className="mr-3" size={20} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-base text-gray-500">
          Don&apos;t have an account?{' '}
          <button
            onClick={toggleForm}
            className="text-pink-600 hover:text-pink-700 font-semibold"
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
};

export default LoginForm;
