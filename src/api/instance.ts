import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const token = "문자열로 토큰값";
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
