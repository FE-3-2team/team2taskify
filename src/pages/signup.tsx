import React from "react";
import AuthContainer from "../components/Login/AuthContainer";
import SignupForm from "../components/Login/SingupForm";
import MainLogo from "../assets/icons/MainLogo.svg";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AuthContainer>
        <SignupForm
          logoSrc={MainLogo}
          logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
          formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
        />
      </AuthContainer>
    </div>
  );
}
