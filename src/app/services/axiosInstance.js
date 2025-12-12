// app/services/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://api.fastpaysave.com/api",
});

export default axiosInstance;
