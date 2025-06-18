import axios from 'axios';
const DEFAULT_TOKEN = '3Skd9EznWm4w2Gt0P5uOt99IMDUTI6Oq';

const api = axios.create({
  baseURL: 'http://localhost:8055/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (DEFAULT_TOKEN) {
      config.headers.Authorization = `Bearer ${DEFAULT_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
