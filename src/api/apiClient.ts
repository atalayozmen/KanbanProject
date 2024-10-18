// /api/apiClient.ts
import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const addAccessTokenInterceptor = (getAccessTokenSilently: any) => {
  apiClient.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient
