import React from "react";
import AuthContainer from "../components/common/Login/AuthContainer";
import SignupForm from "../components/common/Login/SingupForm";
import MainLogo from "../assets/icons/MainLogo.svg";
import { signupApi } from "@/api/auth";

export default function SignupPage() {
  return (
    <AuthContainer>
      <SignupForm
        logoSrc={MainLogo}
        onSignup={signupApi}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </AuthContainer>
  );
}
