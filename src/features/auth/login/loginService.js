import axios from "axios";

const API_URL = "http://localhost:8080";

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const loginService = {
  login,
};

export default loginService;
