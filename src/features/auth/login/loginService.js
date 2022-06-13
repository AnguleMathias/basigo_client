import axios from "axios";

const API_URL = "http://basigo.herokuapp.com";

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const loginService = {
  login,
  logout,
};

export default loginService;
