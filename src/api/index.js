//юазовая настройка аксиос
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://159.255.38.135";

const api = axios.create({
  baseURL: '/',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;
