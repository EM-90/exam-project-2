import axios from 'axios';
import { apiKey } from '../apiKey';

const apiClient = axios.create({
  baseURL: 'https://v2.api.noroff.dev',
  headers: {
    'Content-Type': 'application/json',
    "X-Noroff-API-Key": apiKey,
  }
});

export default apiClient;
