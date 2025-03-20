import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "https://miamour-rotiminicol117gmailcoms-projects.vercel.app/api" : "/api";

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});  