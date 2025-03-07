import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-susaf-scrum-production.up.railway.app", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
