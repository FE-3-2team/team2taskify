import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
//
import { getItem, setItem } from "@/utils/localstorage";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// 리퀘스트 인터셉터
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (typeof window === "undefined") return config;
  const accessToken = getItem("accessToken");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const onErrorRequest = (error: AxiosError) => {
  alert("서버 요청이 실패했어요 나중에 다시 시도해 주세요");
  return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onErrorRequest);

//리스폰스 인터셉터

const onResponse = (response: AxiosResponse) => {
  if (typeof window === "undefined") return response;
  const accessToken = response.data.accessToken;
  if (accessToken) {
    setItem("accessToken", accessToken);
  }
  return response;
};

const onErrorResponse = (error: AxiosError) => {
  if (!axios.isAxiosError(error)) return;
  if (error.code === "ERR_AUTH") {
    return Promise.reject(new AxiosError("로그인 필요", "ERR_AUTH")); //커스텀 에러 코드를 catch 로 던져줌
  } else {
    const { status } = error.response as AxiosResponse;
    if (status) {
      return Promise.reject();
    }
  }
};

instance.interceptors.response.use(onResponse, onErrorResponse);
