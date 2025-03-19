import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getItem, setItem } from "@/utils/localstorage";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const isClient = typeof window !== "undefined";
    if (!isClient) return config;
    //서버에서 실행중인지 브라우져에서 실행중인지
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
  const isClient = typeof window !== "undefined";
  if (!isClient) return response;
  const accessToken = response.data.accessToken;
  if (isClient && accessToken) {
    setItem("accessToken", accessToken);
  }
  return response;
});
