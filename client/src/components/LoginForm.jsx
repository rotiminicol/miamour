import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/useAuthStore';

const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const newErrors = {};
    if (!trimmedEmail) newErrors.email = 'Email is required';
    if (!trimmedPassword) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login({ email: trimmedEmail, password: trimmedPassword });
    } catch (error) {
      console.error('Login error:', error.message);
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-pink-600">Welcome Back</h2>
        <p className="text-gray-500 mt-1">Sign in to continue your journey</p>
      </div>

      {errors.general && (
        <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500 hover:text-pink-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading ? 'bg-pink-400' : 'bg-pink-600 hover:bg-pink-700'
          } flex items-center justify-center`}
          disabled={loading}
        >
          <FaHeart className="mr-2" />
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Dont have an account?{' '}
        <button
          onClick={toggleForm}
          className="text-pink-600 hover:text-pink-700 font-medium"
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