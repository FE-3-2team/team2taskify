import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userId: number | null;
  setUserId: (userId: number) => void;
  profileImageUrl: string | null;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
  userNickname: string;
  setUserNickname: (userNickname: string) => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      //로그인은 isLoggedIn을 true로 만든다
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          profileImageUrl: null,
          userNickname: "",
        }),
      //logout은 다 초기화 시킨다.
      userId: null,
      setUserId: (userId: number) => set({ userId: userId }),
      userNickname: "",
      setUserNickname: (userNickname: string) =>
        set({ userNickname: userNickname }),
      profileImageUrl: null,
      setProfileImageUrl: (profileImageUrl: string | null) =>
        set({ profileImageUrl: profileImageUrl }),
    }),

    { name: "userInfoStorage" }
  )
);
export default useAuthStore;
