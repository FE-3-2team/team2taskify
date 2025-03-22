import { instance } from "./instance";
import useAuthStore from "@/utils/Zustand/zustand";

export async function Login() {
  const email = "test2@example.com";
  const password = "12345678";
  try {
    const res = await instance.post("/auth/login", {
      email,
      password,
    });

    if (res.status == 201) {
      useAuthStore.setState({
        isLoggedIn: true,
        userId: res.data.user.id,
        userNickname: res.data.user.nickname,
        profileImageUrl: res.data.user.profileImageUrl,
        dashboardId: null,
        dashboardTitle: null,
      });
      return res.data;
    }
  } catch (error) {
    throw new Error("로그인 실패");
  }
}
