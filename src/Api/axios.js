import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://medical_center.test/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// إضافة التوكن تلقائيًا (اختياري لهلق، نفعله بعد تسجيل الدخول)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
