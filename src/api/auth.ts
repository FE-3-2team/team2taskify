import { instance } from "./instance";
import useAuthStore from "@/utils/Zustand/zustand";
//

export async function loginApi(email: string, password: string) {
  try {
    const res = await instance.post(`/auth/login`, {
      email,
      password,
    });

    if (res.status === 201) {
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
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error("로그인 실패");
  }
}

export async function signupApi(
  email: string,
  nickname: string,
  password: string
) {
  try {
    const res = await instance.post(`/users`, {
      email,
      nickname,
      password,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error("회원가입 실패");
  }
}
