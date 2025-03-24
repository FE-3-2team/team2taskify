import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";

type initialType = {
  isLoggedIn: boolean;
  userNickname: string;
  userId: number | null;
  profileImageUrl: string | null;
  dashboardId: string | null;
  dashboardTitle: string | null;
};

const initialValue = {
  isLoggedIn: false,
  userNickname: "",
  userId: null,
  profileImageUrl: null,
  dashboardId: null,
  dashboardTitle: null,
};
interface AuthStore extends initialType {
  login: () => void;
  logout: () => void;
  setUserId: (userId: number) => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
  setUserNickname: (userNickname: string) => void;
  setDashboardId: (dashboardId: string) => void;
  setDashboardTitle: (dashboardTitles: string) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...initialValue,
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => {
        set(initialValue);
      },
      setUserId: (userId: number) => set({ userId: userId }),
      setUserNickname: (userNickname: string) =>
        set({ userNickname: userNickname }),
      setProfileImageUrl: (profileImageUrl: string | null) =>
        set({ profileImageUrl: profileImageUrl }),

      setDashboardId: (dashboardId: string) =>
        set({ dashboardId: dashboardId }),
      setDashboardTitle: (dashboardTitle: string) =>
        set({ dashboardTitle: dashboardTitle }),
    }),

    { name: "userStorage" }
  )
);
export default useAuthStore;
