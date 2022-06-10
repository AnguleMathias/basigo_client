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
  console.log("response.data", response.data);

  return response.data;
};

const leadsService = {
  createLead,
};

export default leadsService;
