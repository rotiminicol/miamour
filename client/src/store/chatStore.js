import { create } from 'zustand';
import axios from 'axios';

const useChatStore = create((set) => ({
  chats: [],
  currentChat: null,
  messages: [],
  loading: false,
  error: null,

  // Fetch all chats
  fetchChats: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get('/api/chats');
      set({ chats: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching chats',
        loading: false
      });
      throw error;
    }
  },

  // Fetch messages for a specific chat
  fetchMessages: async (chatId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`/api/chats/${chatId}/messages`);
      set({ messages: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching messages',
        loading: false
      });
      throw error;
    }
  },

  // Send a new message
  sendMessage: async (chatId, content) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`/api/chats/${chatId}/messages`, { content });
      set((state) => ({
        messages: [...state.messages, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error sending message',
        loading: false
      });
      throw error;
    }
  },

  // Set current chat
  setCurrentChat: (chat) => set({ currentChat: chat }),

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({
    chats: [],
    currentChat: null,
    messages: [],
    loading: false,
    error: null
  })
}));

export default useChatStore; 