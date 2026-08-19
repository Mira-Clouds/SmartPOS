import axios from "axios";

const API_URL = "http://localhost:8080/dashboard";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDashboardData = async () => {
  return await axios.get(
    API_URL,
    getAuthConfig()
  );
};