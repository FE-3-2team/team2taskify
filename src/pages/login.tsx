import React from "react";
import AuthContainer from "../components/Login/AuthContainer";
import LoginForm from "../components/Login/LoginForm";
import MainLogo from "../assets/icons/MainLogo.svg";
import { loginApi } from "@/api/auth";

export default function LoginPage() {
  return (
    <AuthContainer>
      <LoginForm
        logoSrc={MainLogo}
        onLogin={loginApi}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </AuthContainer>
  );
}
