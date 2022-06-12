import axios from "axios";

const API_URL = "http://localhost:8080";

// create new customer
const createCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(`${API_URL}/customer`, customerData, config);

  return response.data;
};

// get all customers
const getAllLeadCustomers = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/customer`, config);

  return response.data;
};

// get customer by id
const getCustomerById = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/customer/${id}`, config);

  return response.data;
};

// delete customer
const deleteCustomer = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${API_URL}/customer/${id}`, config);

  return response.data;
};

const leadsService = {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getAllLeadCustomers,
};

export default leadsService;
