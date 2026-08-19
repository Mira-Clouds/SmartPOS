import axios from "axios";

const API_URL = "http://localhost:8080/reports";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDailySales = async () => {
  return await axios.get(
    `${API_URL}/daily`,
    getAuthConfig()
  );
};

export const getMonthlySales = async () => {
  return await axios.get(
    `${API_URL}/monthly`,
    getAuthConfig()
  );
};