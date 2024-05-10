import axios from 'axios';
import { apiKey } from '../apiKey';

const apiClient = axios.create({
  baseURL: 'https://v2.api.noroff.dev',
  headers: {
    'Content-Type': 'application/json',
    "X-Noroff-API-Key": apiKey,
  }
});

apiClient.interceptors.request.use(
  config => {
      const userData = localStorage.getItem('userData'); 
      if (userData) {
          const { accessToken } = JSON.parse(userData);
          if (accessToken) {
              config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
      }
      return config;
  },
  error => Promise.reject(error)
);



export default apiClient;
