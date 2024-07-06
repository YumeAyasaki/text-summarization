import axios, { AxiosError } from "axios";

export const configuredAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

configuredAxios.interceptors.request.use(
  (config: any) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
