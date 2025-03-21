import { useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../api/auth";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      localStorage.setItem("accessToken", data.accessToken);
      window.location.href = "/mydashboard";
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
