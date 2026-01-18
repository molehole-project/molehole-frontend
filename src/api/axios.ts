import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // refreshToken 쿠키
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;