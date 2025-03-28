import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
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
  const accessToken = getItem("accessToken");

  if (typeof window !== "undefined" && accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
};

const onErrorRequest = (error: AxiosError) => {
  switch (true) {
    case Boolean(error.config):
      alert("서버 요청이 실패했어요 다음에 다시 오셔야 할 것 같아요");
      break;
    case Boolean(error.request):
      alert("서버 요청이 실패했어요 다음에 다시 오셔야 할 것 같아요");
      break;
    default:
      alert("숨돌리고 다시 시도해 주세요");
      break;
  }
  return Promise.reject(error);
};
instance.interceptors.request.use(onRequest, onErrorRequest);

//리스폰스 인터셉터
const onError = (status: number, message: string) => {
  const error = { status, message };
  if (status === 401) {
    alert(`로그인이 필요한 서비스 입니다.`);
  }
  alert(`${message}`);
  throw error;
};
const onResponse = (response: AxiosResponse) => {
  const accessToken = response.data.accessToken;
  if (typeof window !== "undefined" && accessToken) {
    setItem("accessToken", accessToken);
  }
  return response;
};

const onErrorResponse = (error: AxiosError) => {
  if (!axios.isAxiosError(error)) return;
  const { status } = error.response as AxiosResponse;
  if (status) {
    return Promise.reject("instance에러");
  }
  // }
};

instance.interceptors.response.use(onResponse, onErrorResponse);
