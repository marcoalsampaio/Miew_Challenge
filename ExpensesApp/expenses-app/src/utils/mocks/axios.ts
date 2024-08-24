import axios from 'axios';
import applyMockAdapter from './mock-data'; // Adjust path as needed

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Ensure this matches the base URL
});

// Apply the mock adapter
applyMockAdapter(axiosInstance);

export default axiosInstance;