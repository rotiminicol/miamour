import axios from "axios";

// Base URL configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('Using API URL:', BASE_URL);

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error);
      return Promise.reject(new Error('Request timeout. Please check your internet connection.'));
    }
    
    if (!error.response) {
      // Network error
      console.error('Network Error:', error);
      return Promise.reject(new Error('Network Error. Please check your internet connection or if the server is running.'));
    }
    
    // Handle specific status codes
    if (error.response.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized:', error);
    } else if (error.response.status === 403) {
      // Handle forbidden
      console.error('Forbidden:', error);
    } else if (error.response.status >= 500) {
      // Handle server errors
      console.error('Server Error:', error);
    }
    
    return Promise.reject(error);
  }
);