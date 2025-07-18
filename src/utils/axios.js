// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://medical_center.test/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة التوكن تلقائيًا مع كل طلب
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // أو من Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
