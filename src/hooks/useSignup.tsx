import { useState } from "react";
import { signupApi } from "../api/auth";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const signup = async (email: string, nickname: string, password: string) => {
    setLoading(true);
    try {
      const data = await signupApi(email, nickname, password);
      // 회원가입 성공 시
      setModalMessage("가입을 축하합니다!");
      return data;
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "회원가입에 실패했습니다";
        if (status === 409) {
          setModalMessage("이미 사용중인 이메일입니다.");
        } else if (status === 400) {
          setModalMessage(message);
        } else {
          setModalMessage(message);
        }
      } else {
        setModalMessage("회원가입 중 문제가 발생했습니다.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return { signup, loading, modalMessage, closeModal };
};

export default useSignup;
