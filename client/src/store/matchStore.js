import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useMatchStore = create((set) => ({
  matchCard: null,
  potentialMatches: [],
  loading: false,
  error: null,

  // Fetch user's match card
  fetchMatchCard: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/api/match-cards/me');
      set({ matchCard: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching match card',
        loading: false
      });
      throw error;
    }
  },

  // Create or update match card
  createMatchCard: async (matchCardData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/api/match-cards', matchCardData);
      set({ matchCard: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error creating match card',
        loading: false
      });
      throw error;
    }
  },

  // Update match card
  updateMatchCard: async (matchCardData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.put('/api/match-cards/me', matchCardData);
      set({ matchCard: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error updating match card',
        loading: false
      });
      throw error;
    }
  },

  // Fetch potential matches
  fetchPotentialMatches: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/api/match-cards/potential-matches');
      set({ potentialMatches: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching potential matches',
        loading: false
      });
      throw error;
    }
  },

  // Accept a match
  acceptMatch: async (matchId) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post(`/api/match-cards/${matchId}/accept`);
      set((state) => ({
        potentialMatches: state.potentialMatches.filter(match => match._id !== matchId),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error accepting match',
        loading: false
      });
      throw error;
    }
  },

  // Reject a match
  rejectMatch: async (matchId) => {
    try {
      set({ loading: true, error: null });
      await axiosInstance.post(`/api/match-cards/${matchId}/reject`);
      set((state) => ({
        potentialMatches: state.potentialMatches.filter(match => match._id !== matchId),
        loading: false
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error rejecting match',
        loading: false
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({
    matchCard: null,
    potentialMatches: [],
    loading: false,
    error: null
  })
}));

export default useMatchStore; 