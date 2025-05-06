import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Fetch user profile
  fetchUserProfile: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get('/api/users/profile');
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching profile',
        loading: false
      });
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put('/api/users/profile', userData);
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error updating profile',
        loading: false
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({
    user: null,
    loading: false,
    error: null
  })
}));

export default useUserStore; 