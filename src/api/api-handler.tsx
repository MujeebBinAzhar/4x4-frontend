/* eslint-disable linebreak-style */
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

console.log(process.env.NEXT_PUBLIC_REST_API_ENDPOINT);

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'https://backend.all4x4test.shop/api/website', // Replace with your API base URL
    timeout: 5000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json', // Optional: Set default headers
    },
});

// Optional: Add interceptors with full typing
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => Promise.reject(error),
);
export default axiosInstance;
