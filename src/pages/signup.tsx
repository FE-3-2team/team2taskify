import React from "react";
import AuthContainer from "../components/common/Login/AuthContainer";
import SignupForm from "../components/common/Login/SingupForm";
import useSignup from "../hooks/useSign";
import MainLogo from "../assets/icons/MainLogo.svg";

export default function SignupPage() {
  const { signup } = useSignup();

  return (
    <AuthContainer>
      <SignupForm
        logoSrc={MainLogo}
        onSignup={signup}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </AuthContainer>
  );
}
