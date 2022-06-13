import axios from "axios";

const API_URL = "http://basigo.herokuapp.com";

const signUp = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);

  return response.data;
};

const signupService = {
  signUp,
};

export default signupService;
