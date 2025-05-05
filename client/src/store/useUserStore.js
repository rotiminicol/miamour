import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
	loading: false,

	updateProfile: async (data) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.put("/users/update", data);
			
			// Update the auth user in the auth store
			const updatedUser = res.data.user;
			useAuthStore.getState().setAuthUser(updatedUser);
			
			// Update localStorage
			localStorage.setItem("authUser", JSON.stringify(updatedUser));
			
			toast.success("Profile updated successfully");
			return updatedUser;
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
			throw error;
		} finally {
			set({ loading: false });
		}
	},
}));