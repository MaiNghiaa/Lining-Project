import api from './api';

export const registerUser = (payload, token) => {
  return api.post('/users', payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

export const loginUser = (email, password) => {
  return api.post('/auth/login', {
    email,
    password
  });
};