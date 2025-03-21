import { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaHeart, FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/useAuthStore';
import { auth, googleProvider, signInWithPopup } from '../firebase'; // Import Firebase auth functions

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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In Successful:', user);
      // You can now handle the user object, e.g., store it in your state or send it to your backend
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
      setErrors({ general: error.message });
    }
  };

  return (
    <motion.div 
      className="w-full h-full px-6 py-8 md:px-12 md:py-12 overflow-y-auto flex flex-col justify-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-2 font-serif">
        Welcome Back to MiAmour
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Continue your journey to find love
      </p>
      
      {errors.general && (
        <p className="text-center text-red-500 mb-4">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => { 
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
            placeholder="Your email address"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
              placeholder="Your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-pink-600 hover:text-pink-500">
          Forgot password?
        </a>
        </div>

        <button 
          type="submit" 
          className={`w-full py-3 px-4 ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'} text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center`}
          disabled={loading}
        >
          <FaHeart className="mr-2" />
          {loading ? 'Signing in...' : 'Login to MiAmour'}
        </button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button 
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 border border-pink-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-pink-50 flex items-center justify-center"
          >
            <FcGoogle className="h-5 w-5 mr-2" /> Google
          </button>
          <button className="w-full py-2 px-4 border border-pink-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-pink-50 flex items-center justify-center">
            Ijeuwa
          </button>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">
          Don’t have an account yet?{' '}
          <button onClick={toggleForm} className="font-medium text-pink-600 hover:text-pink-500">
            Sign up for love
          </button>
        </p>
      </div>
    </motion.div>
  );
};

LoginForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;