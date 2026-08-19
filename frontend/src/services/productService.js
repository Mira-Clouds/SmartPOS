import axios from "axios";

const API_URL = "http://localhost:8080/products";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = async () => {
  return await axios.get(API_URL, getAuthConfig());
};

export const getProductById = async (id) => {
  return await axios.get(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
};

export const addProduct = async (product) => {
  return await axios.post(
    API_URL,
    product,
    getAuthConfig()
  );
};

export const updateProduct = async (id, product) => {
  return await axios.put(
    `${API_URL}/${id}`,
    product,
    getAuthConfig()
  );
};

export const deleteProduct = async (id) => {
  return await axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
};