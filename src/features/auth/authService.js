import axios from "axios";

const API_URL = "http://localhost:8080";

const signUp = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  signUp,
};

export default authService;
