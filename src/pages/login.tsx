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
        buttonToFooterSpacingClass="mt-[24px] md:mt-[10px]"
        logoToFormSpacingClass="30px"
        formToButtonSpacingClass="24px"
      />
    </LoginContainer>
  );
}
