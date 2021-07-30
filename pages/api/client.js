import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.14:4000/api',
  headers: { Accept: 'application/json' },
});

export default apiClient;
