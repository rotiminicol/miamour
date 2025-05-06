import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  // Add a new notification
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },

  // Mark a notification as read
  markAsRead: async (notificationId) => {
    try {
      await axiosInstance.put(`/notifications/${notificationId}/read`);
      set((state) => ({
        notifications: state.notifications.map(notif =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      await axiosInstance.put('/notifications/mark-all-read');
      set((state) => ({
        notifications: state.notifications.map(notif => ({ ...notif, read: true })),
        unreadCount: 0
      }));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  },

  // Fetch notifications
  fetchNotifications: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get('/notifications');
      const unreadCount = res.data.notifications.filter(n => !n.read).length;
      set({ 
        notifications: res.data.notifications,
        unreadCount,
        loading: false 
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      set({ loading: false });
    }
  },

  // Delete a notification
  deleteNotification: async (notificationId) => {
    try {
      await axiosInstance.delete(`/notifications/${notificationId}`);
      set((state) => ({
        notifications: state.notifications.filter(notif => notif._id !== notificationId),
        unreadCount: state.notifications.find(n => n._id === notificationId)?.read 
          ? state.unreadCount 
          : Math.max(0, state.unreadCount - 1)
      }));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  },

  // Clear all notifications
  clearAllNotifications: async () => {
    try {
      await axiosInstance.delete('/notifications/clear-all');
      set({ notifications: [], unreadCount: 0 });
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  }
})); 