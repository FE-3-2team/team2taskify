import { useState } from "react";
import { loginApi } from "../api/auth";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (teamId: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi(teamId, email, password);
      localStorage.setItem("accessToken", data.accessToken);
      window.location.href = "/mydashboard";
      return data;
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "로그인에 실패했습니다";
        if (status === 404) {
          setErrorMessage("존재하지 않는 유저입니다.");
        } else if (status === 400) {
          setErrorMessage(message); // 예: "이메일 형식으로 작성해주세요."
        } else {
          setErrorMessage(message);
        }
      } else {
        setErrorMessage("로그인 중 문제가 발생했습니다");
      }
      setErrorModal(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => {
    setErrorModal(false);
    setErrorMessage("");
  };

  return { login, loading, errorModal, errorMessage, closeErrorModal };
};

export default useLogin;
