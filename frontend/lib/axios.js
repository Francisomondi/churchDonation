import axios from "axios";

 const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ? "/"
    : "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 25000,
});


export default axiosInstance

