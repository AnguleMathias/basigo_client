import axios from "axios";

const API_URL = "http://localhost:8080";

// create new lead
const createLead = async (leadData, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(`${API_URL}/leads`, leadData, config);

  return response.data;
};

// get all leads
const getLeads = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/leads`, config);

  return response.data;
};

const leadsService = {
  createLead,
  getLeads,
};

export default leadsService;
