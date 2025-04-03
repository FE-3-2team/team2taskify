import { create } from "zustand";
import { persist } from "zustand/middleware";

type initialType = {
  isLoggedIn: boolean;
  userNickname: string;
  profileImageUrl: string | null;
  dashboardId: string | null;
  dashboardTitle: string | null;
  isOwner: boolean;
};

const initialValue = {
  isLoggedIn: false,
  userNickname: "",
  profileImageUrl: null,
  dashboardId: null,
  dashboardTitle: null,
  isOwner: true,
};
interface AuthStore extends initialType {
  login: () => void;
  logout: () => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
  setUserNickname: (userNickname: string) => void;
  setDashboardId: (dashboardId: string) => void;
  setDashboardTitle: (dashboardTitles: string) => void;
  setIsOwner: (isOwner: boolean) => void;
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
      setUserNickname: (userNickname: string) =>
        set({ userNickname: userNickname }),
      setProfileImageUrl: (profileImageUrl: string | null) =>
        set({ profileImageUrl: profileImageUrl }),

      setDashboardId: (dashboardId: string) =>
        set({ dashboardId: dashboardId }),
      setDashboardTitle: (dashboardTitle: string) =>
        set({ dashboardTitle: dashboardTitle }),
      setIsOwner: (isOwner: boolean) => set({ isOwner: isOwner }),
    }),

    { name: "userStorage" }
  )
);
export default useAuthStore;
