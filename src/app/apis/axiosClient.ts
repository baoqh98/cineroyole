import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { store } from '../store';

const axiosClient = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/',
  headers: {
    TokenCyberSoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNyIsIkhldEhhblN0cmluZyI6IjIxLzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NDI1OTIwMDAwMCIsIm5iZiI6MTY0NjE1NDAwMCwiZXhwIjoxNjc0NDA2ODAwfQ.5JfRY7XxLBvxphVDGE6br_uBYC9AbkqaSEmNTGvzWtQ',
  },
});

// axiosClient.interceptors.request.use((config) => {
//   const accessToken = store.getState().auth.accessToken;
//   if (accessToken) {
//     config.headers!.Authorization = `Bearer ${accessToken}`;
//   }
// });

axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error: AxiosError) => {
    return Promise.reject((error.response?.data as any).content);
  }
);

export default axiosClient;
