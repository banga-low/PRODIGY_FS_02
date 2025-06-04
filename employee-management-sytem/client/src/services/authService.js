import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const login = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};