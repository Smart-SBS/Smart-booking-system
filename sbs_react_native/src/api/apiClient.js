// src/api/apiClient.js
import axios from 'axios';
import {API_BASE_URL} from '../config/apiConfig';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

export const apiClientMultipart = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'multipart/form-data'},
});

export default apiClient;
