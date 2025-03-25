import { instance } from "./instance";
import useAuthStore from "@/utils/Zustand/zustand";
import { removeItem } from "@/utils/localstorage";
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
    throw new Error("Unexpected status code: " + res.status);
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

    if (res.status === 200 || res.status === 201) {
      useAuthStore.setState({
        isLoggedIn: false,
        userId: null,
        userNickname: "",
        profileImageUrl: null,
        dashboardId: null,
        dashboardTitle: "",
      });
      removeItem("accessToken");
      return res.data;
    }
    throw new Error("Unexpected status code: " + res.status);
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error("회원가입 실패");
  }
}
