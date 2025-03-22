import { useStore } from "zustand";
import { instance } from "./instance";
import useAuthStore from "@/utils/Zustand/zustand";
import { removeItem } from "@/utils/localstorage";
//
export async function loginApi(email: string, password: string) {
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

export async function signupApi(
  email: string,
  nickname: string,
  password: string
) {
  const store = useStore(useAuthStore, (state) => state);
  try {
    const res = await instance.post("/users", {
      email,
      nickname,
      password,
    });

    if (res.status == 201) {
      store.logout();
      removeItem("accessToken");
    }
  } catch (error) {
    throw new Error("로그인 실패");
  }
}
