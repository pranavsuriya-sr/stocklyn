import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_ALL_ROUTES,
  withCredentials: true,
});

export const productRoute = axios.create({
  baseURL: "http://localhost:5000/product",
  withCredentials: true,
});

export const categoryRoute = axios.create({
  baseURL: "http://localhost:5000/category",
  withCredentials: true,
});
