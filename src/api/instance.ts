import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getItem, setItem } from "@/utils/localstorage";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * TODO
 * 로그아웃 로직 작성
 */
export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getItem("accessToken");
    if (config.url === "/login") {
      delete config.headers.Authorization;
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
);
instance.interceptors.response.use((response) => {
  const accessToken = response.data.accessToken;
  if (accessToken) {
    setItem("accessToken", accessToken);
  }
  return response;
});
