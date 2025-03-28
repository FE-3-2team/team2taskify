import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getItem } from "./localstorage";
import { instance } from "@/api/instance";

interface AuthContextType {
  myProfile: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  const [myProfile, setMyProfile] = useState({
    id: null,
    email: null,
    nickname: null,
    profileImageUrl: null,
    createdAt: null,
    updatedAt: null,
  });

  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isPublicPath) return;
    if (!window.localStorage.getItem("accessToken")) {
      alert("로그인이 필요한 페이지 입니다.");
      router.push("/login");
      return;
    }

    instance
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setIsValidUser(true);
        setMyProfile(response.data);
      })
      .catch(() => {
        router.push("/login");

        return;
      });
  }, [pathname]);

  if (!isClient) return null;

  if (!isValidUser && !isPublicPath) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ myProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("provider 안에서 사용하세요!");
  }

  return context;
};
