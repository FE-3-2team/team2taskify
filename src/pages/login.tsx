// pages/LoginPage.tsx
import React from "react";
import AuthContainer from "../components/Login/AuthContainer";
import LoginForm from "../components/Login/LoginForm";
import MainLogo from "../assets/icons/MainLogo.svg";
import useLogin from "@/hooks/useLogin";
import { AlertModal } from "../components/ModalContents/AlertModal";

export default function LoginPage() {
  const { login, loading, errorModal, errorMessage, closeErrorModal } =
    useLogin();

  const handleLogin = async (email: string, password: string) => {
    return await login(email, password);
  };

  return (
    <AuthContainer>
      {errorModal && (
        <AlertModal
          isOpen={errorModal}
          message={errorMessage}
          onConfirm={closeErrorModal}
        />
      )}
      <LoginForm
        logoSrc={MainLogo}
        onLogin={handleLogin}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </AuthContainer>
  );
}
