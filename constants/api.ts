export const API_BASE_URL = 'http://10.10.25.180:5001';

import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default api; 