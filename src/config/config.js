import axios from 'axios';

export const API = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'https://library-dw18lsfsq.herokuapp.com/api/v1',
});

export const setToken = (token) => {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
};

export const imageURL = 'https://res.cloudinary.com/nuraskiah/image/upload';

export const fileURL =
  'https://res.cloudinary.com/nuraskiah/raw/upload/library/files';
