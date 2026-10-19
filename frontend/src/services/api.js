import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  getDashboard: () => axios.get(`${API_BASE_URL}/dashboard`),
  getContracts: () => axios.get(`${API_BASE_URL}/contracts`),
  getContractDetail: (id) => axios.get(`${API_BASE_URL}/contracts/${id}`),
  uploadContract: (formData) => axios.post(`${API_BASE_URL}/contracts/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getPolicyRules: () => axios.get(`${API_BASE_URL}/policy-rules`),
  sendChatMessage: (data) => axios.post(`${API_BASE_URL}/chat`, data),
};