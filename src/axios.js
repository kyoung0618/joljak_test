// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.236.148.165:8000',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export default instance;
