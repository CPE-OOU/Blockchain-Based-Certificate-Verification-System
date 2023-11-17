import axios from "axios";
import { BACKEND_URL } from "../../config/contants";

const register = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/auth/register`, userData, {
    timeout: 5000,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/auth/login`, userData, {
    timeout: 5000,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;
