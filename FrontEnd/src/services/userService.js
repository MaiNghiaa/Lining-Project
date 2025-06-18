import api from './api';
export const registerUser = (payload) => {
  return api.post('/users', payload, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const loginUser = (email, password) => {
  return api.post('/auth/login', {
    email,
    password
  });
};