// pages/LoginPage.tsx
import React from "react";
import AuthContainer from "../components/common/Login/AuthContainer";
import LoginForm from "../components/common/Login/LoginForm";
import useLogin from "../hooks/useLogin";
import MainLogo from "../assets/icons/MainLogo.svg";

export default function LoginPage() {
  const { login } = useLogin();

  return (
    <AuthContainer>
      <LoginForm
        logoSrc={MainLogo}
        onLogin={login}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </AuthContainer>
  );
}
