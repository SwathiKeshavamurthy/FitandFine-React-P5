import axios from 'axios';

// Set the base URL for all axios requests
const BASE_URL = 'https://fitandfine-drf-be560b223a3b.herokuapp.com/';

// Default axios instance configuration
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create axios instances for request and response
export const axiosReq = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosRes = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosReq.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axiosRes.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosReq.defaults.headers.common['Authorization'];
    delete axiosRes.defaults.headers.common['Authorization'];
  }
};
