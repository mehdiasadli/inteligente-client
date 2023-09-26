import { InternalAxiosRequestConfig } from "axios";

export const base = process.env.REACT_APP_SERVER_URI;

export const addInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (!token) return config;

  config.headers.Authorization = 'Bearer ' + token;
  return config;
};
