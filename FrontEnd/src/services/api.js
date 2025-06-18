import axios from 'axios';

const DEFAULT_TOKEN = 'YQuK4ANYoyf1Zv-BIjf0SDJuzYieV_Cc';

const api = axios.create({
  baseURL: 'http://localhost:8055/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEFAULT_TOKEN}`,
  },
});

const get = (url, config = {}) => api.get(url, config);
const post = (url, data, config = {}) => api.post(url, data, config);
const put = (url, data, config = {}) => api.put(url, data, config);
const del = (url, config = {}) => api.delete(url, config);

export default {
  get,
  post,
  put,
  delete: del,
  instance: api,
}; 
