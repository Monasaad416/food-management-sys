import axios from "axios";

const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";
export const IMAGE_URL = "https://upskilling-egypt.com:3006";
//

export const publicAxiosInstance = axios.create({
  baseURL: BASE_URL,
});
export const privateAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: localStorage.getItem("token") },
});

//  const privateAxiosInstance = axios.create({
//   BASE_URL,
// });

// privateAxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// )
//   export {privateAxiosInstance}
