import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

// Tickets
export const createTicket = (data) => API.post("/tickets", data);
export const getMyTickets = () => API.get("/tickets/my");

// KB
export const getArticles = () => API.get("/kb");
export const createArticle = (data) => API.post("/kb", data);
