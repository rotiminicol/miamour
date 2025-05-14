import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  checkingAuth: true,
  loading: false,
  error: null,

  signup: async (signupData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post("/auth/signup", signupData);
      
      if (!response.data.user) {
        throw new Error('No user data received from server');
      }
      
      const user = response.data.user;
      set({ 
        authUser: user,
        loading: false,
        error: null 
      });
      
      localStorage.setItem("authUser", JSON.stringify(user));
      initializeSocket(user._id);
      toast.success("Account created successfully!");
      return user;
      
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Registration failed. Please try again.';
      
      set({ 
        loading: false,
        error: errorMessage 
      });
      
      toast.error(errorMessage);
      throw error;
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post("/auth/login", loginData);
      
      if (!response.data.user) {
        throw new Error('No user data received from server');
      }
      
      const user = response.data.user;
      set({ 
        authUser: user,
        loading: false,
        error: null 
      });
      
      localStorage.setItem("authUser", JSON.stringify(user));
      initializeSocket(user._id);
      toast.success("Logged in successfully!");
      return user;
      
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Login failed. Please check your credentials and try again.';
      
      set({ 
        loading: false,
        error: errorMessage 
      });
      
      toast.error(errorMessage);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      disconnectSocket();
      set({ authUser: null });
      localStorage.removeItem("authUser");
    }
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      const user = response.data?.user;
      
      if (user) {
        set({ 
          authUser: user,
          checkingAuth: false,
          error: null 
        });
        localStorage.setItem("authUser", JSON.stringify(user));
        initializeSocket(user._id);
      } else {
        throw new Error('No user data in response');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ 
        authUser: null, 
        checkingAuth: false,
        error: 'Session expired. Please log in again.'
      });
      localStorage.removeItem("authUser");
    }
  },

  setAuthUser: (user) => {
    set({ authUser: user });
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  },
}));
