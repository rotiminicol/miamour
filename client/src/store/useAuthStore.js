import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
	authUser: JSON.parse(localStorage.getItem("authUser")) || null,
	checkingAuth: true,
	loading: false,

	signup: async (signupData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/signup", signupData);
			const user = res.data.user;
			set({ authUser: user });
			localStorage.setItem("authUser", JSON.stringify(user)); // Save user to localStorage
			initializeSocket(user._id);

			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	login: async (loginData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/login", loginData);
			const user = res.data.user;
			set({ authUser: user });
			localStorage.setItem("authUser", JSON.stringify(user)); // Save user to localStorage
			initializeSocket(user._id);

			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	logout: async () => {
		try {
			const res = await axiosInstance.post("/auth/logout");
			disconnectSocket();
			if (res.status === 200) {
				set({ authUser: null });
				localStorage.removeItem("authUser"); // Remove user from localStorage
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		}
	},

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/me");
			const user = res.data.user;
			set({ authUser: user });
			localStorage.setItem("authUser", JSON.stringify(user)); // Save user to localStorage
			initializeSocket(user._id);
		} catch (error) {
			set({ authUser: null });
			localStorage.removeItem("authUser"); // Remove if not authenticated
			console.log(error);
		} finally {
			set({ checkingAuth: false });
		}
	},

	setAuthUser: (user) => {
		set({ authUser: user });
		localStorage.setItem("authUser", JSON.stringify(user)); // Save manually if needed
	},
}));
