import axios from "axios";

const API_URL = "http://localhost:8080";

// get all products
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/product`, config);

  return response.data;
};

// get product by id
const getProductById = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/product/${id}`, config);

  return response.data;
};

const productsService = {
  getProducts,
  getProductById,
};

export default productsService;
