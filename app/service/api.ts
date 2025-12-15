import axios from 'axios';

// GANTI IP INI CUKUP DI SINI SAJA
<<<<<<< Updated upstream
const BASE_URL = 'http://10.23.34.62:3000/api'; 
=======

const BASE_URL = 'http://172.20.10.2:3000/api'; 

>>>>>>> Stashed changes

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Opsional: timeout jika server lama merespon
});

export default api;