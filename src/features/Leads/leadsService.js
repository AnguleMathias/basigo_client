import axios from "axios";

const API_URL = "http://basigo.herokuapp.com";

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

// get lead by id
const getLeadById = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/leads/${id}`, config);

  return response.data;
};

// delete lead
const deleteLead = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${API_URL}/leads/${id}`, config);

  return response.data;
};

const leadsService = {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
};

export default leadsService;
