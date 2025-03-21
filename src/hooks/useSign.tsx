import { useState } from "react";
import { toast } from "react-toastify";
import { signupApi } from "../api/auth";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (email: string, nickname: string, password: string) => {
    setLoading(true);
    try {
      const data = await signupApi(email, nickname, password);
      alert("가입이 완료되었습니다");
      window.location.href = "/login";
      return data;
    } catch (error: any) {
      // 중복 이메일 등 에러 메시지에 따른 분기 처리
      if (error.message === "이미 사용중인 이메일입니다.") {
        alert(error.message);
      } else {
        toast.error(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;
