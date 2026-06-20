import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: "https://task-management-mern-v7pe.onrender.com/api",
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
};

export const taskAPI = {
  createTask: (data) => api.post("/tasks", data),
  getTasks: () => api.get("/tasks"),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
