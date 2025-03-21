import { useState } from "react";
import { toast } from "react-toastify";

interface LoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const toastId = "loginError";

  const teamId = process.env.NEXT_PUBLIC_TEAM_ID || "13-2";

  const apiUrl = `https://sp-taskify-api.vercel.app/${teamId}/auth/login`;

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse | null> => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        window.location.href = "/mydashboard";
        return data;
      } else {
        if (response.status === 400) {
          const errData = await response.json();
          if (!toast.isActive(toastId)) {
            toast.error(errData.message || "잘못된 요청입니다.", { toastId });
          }
        } else if (response.status === 404) {
          if (!toast.isActive(toastId)) {
            toast.error("존재하지 않는 유저입니다.", { toastId });
          }
        } else if (response.status === 500) {
          if (!toast.isActive(toastId)) {
            toast.error(
              "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
              { toastId }
            );
          }
        } else {
          if (!toast.isActive(toastId)) {
            toast.error("예기치 않은 오류가 발생했습니다.", { toastId });
          }
        }
        return null;
      }
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error("서버와 연결할 수 없습니다. 인터넷 연결을 확인해주세요.", {
          toastId,
        });
      }
      console.error("네트워크 에러:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
