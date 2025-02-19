import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
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

export const cartItemRoute = axios.create({
  baseURL: "http://localhost:5000/cartItem",
  withCredentials: true,
});

export const sendEmailRoute = axios.create({
  baseURL: "http://localhost:5000/email",
});

export const addressRoute = axios.create({
  baseURL: "http://localhost:5000/address",
});
