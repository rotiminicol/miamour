import { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/useAuthStore';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { FaEye, FaEyeSlash, FaHeart } from 'react-icons/fa';


const SignupForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    genderPreference: ''
  });
  
  const [errors, setErrors] = useState({});
  const { signup, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-Up Successful:', user);
      // You can now handle the user object, e.g., store it in your state or send it to your backend
    } catch (error) {
      console.error('Google Sign-Up Error:', error.message);
      setErrors({ general: error.message });
    }
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 
    'Nigeria', 'Ghana', 'South Africa', 'Kenya', 'India', 
    'China', 'Japan', 'Germany', 'France', 'Brazil', 'Mexico'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    // Country validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'You must be at least 18 years old';
    }
    
    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    // Gender preference validation
    if (!formData.genderPreference) {
      newErrors.genderPreference = 'Gender preference is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit the form data
    signup(formData);
  };

  const handleIjeuwaSignup = () => {
    console.log('Continue with Ijeuwa');
    // Implement Ijeuwa OAuth logic here
  };

  return (
    <motion.div 
      className="w-full h-full px-6 py-8 md:px-12 md:py-8 overflow-y-auto"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-10 font-serif"></h2>
      <p className="text-2xl font-bold text-center text-pink-600 mb-10 font-serif">Create Your Love Profile</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
          />
          {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.age ? 'border-red-500' : 'border-pink-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
            min="18"
          />
          {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
        </div>
        <div className="relative">
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Password
  </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-pink-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-pink-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500`}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Gender</label>
          <div className="mt-2 flex gap-2">
            <div className="flex items-center">
              <input
                id="male"
                name="gender"
                type="checkbox"
                checked={formData.gender === "male"}
                onChange={() => setFormData({ ...formData, gender: "male" })}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="male" className="ml-2 block text-sm text-gray-900">Male</label>
            </div>
            <div className="flex items-center">
              <input
                id="female"
                name="gender"
                type="checkbox"
                checked={formData.gender === "female"}
                onChange={() => setFormData({ ...formData, gender: "female" })}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="female" className="ml-2 block text-sm text-gray-900">Female</label>
            </div>
          </div>
          {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prefer Me</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="prefer-male"
                name="genderPreference"
                type="radio"
                value="male"
                checked={formData.genderPreference === "male"}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
              />
              <label htmlFor="prefer-male" className="ml-2 block text-sm text-gray-900">Male</label>
            </div>
            <div className="flex items-center">
              <input
                id="prefer-female"
                name="genderPreference"
                type="radio"
                value="female"
                checked={formData.genderPreference === "female"}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
              />
              <label htmlFor="prefer-female" className="ml-2 block text-sm text-gray-900">Female</label>
            </div>
            <div className="flex items-center">
              <input
                id="prefer-both"
                name="genderPreference"
                type="radio"
                value="both"
                checked={formData.genderPreference === "both"}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
              />
              <label htmlFor="prefer-both" className="ml-2 block text-sm text-gray-900">Both</label>
            </div>
          </div>
          {errors.genderPreference && <p className="mt-1 text-xs text-red-500">{errors.genderPreference}</p>}
        </div>
      
        <button 
          type="submit" 
          className={`w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <FaHeart className="mr-2" /> {loading ? "Signing up..." : "Sign Up for Love"}
        </button>
      </form>
      
      <div className="mt-6">
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
          onClick={handleGoogleSignup}
          className="w-full py-2 px-4 border border-pink-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-pink-50 flex items-center justify-center"
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          Google
          </button>
          
          <button
            onClick={handleIjeuwaSignup}
            className="w-full py-2 px-4 border border-pink-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-pink-50 flex items-center justify-center"
          >
            Ijeuwa
          </button>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={toggleForm} 
            className="font-medium text-pink-600 hover:text-pink-500"
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

SignupForm.propTypes = {
  toggleForm: PropTypes.func.isRequired
}

export default SignupForm;