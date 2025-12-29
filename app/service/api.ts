import axios from 'axios';

// GANTI IP INI CUKUP DI SINI SAJA

const BASE_URL = 'https://smarttime-backend-production.up.railway.app/api';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Opsional: timeout jika server lama merespon
});

export default api;