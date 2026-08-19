import axios from "axios";

const API_URL = "http://localhost:8080/categories";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCategories = async () => {
  return await axios.get(
    API_URL,
    getAuthConfig()
  );
};

export const addCategory = async (category) => {
  return await axios.post(
    API_URL,
    category,
    getAuthConfig()
  );
};