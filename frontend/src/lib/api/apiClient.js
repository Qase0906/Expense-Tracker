import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = "https://expense-tracker-w2f1.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepter to add the authorization header
api.interceptors.request.use((config) => {    
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
