import React from "react";
import LoginContainer from "../components/common/Login/LoginContainer";
import LoginForm from "../components/common/Login/LoginForm";
import useLogin from "../hooks/useLogin";
import MainLogo from "../assets/icons/MainLogo.svg";

export default function LoginPage() {
  const { login } = useLogin();

  return (
    <LoginContainer>
      <LoginForm
        logoSrc={MainLogo}
        onLogin={login}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </LoginContainer>
  );
}
