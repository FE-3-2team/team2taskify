import React from "react";
import AuthContainer from "../components/Login/AuthContainer";
import SignupForm from "../components/Login/SingupForm";
import MainLogo from "../assets/icons/MainLogo.svg";
import useSignup from "@/hooks/useSignup";
import { AlertModal } from "../components/ModalContents/AlertModal";

export default function SignupPage() {
  const { signup, loading, modalMessage, closeModal } = useSignup();

  const teamId = "team123";

  const handleSignup = async (
    email: string,
    nickname: string,
    password: string
  ) => {
    return await signup(teamId, email, nickname, password);
  };

  return (
    <AuthContainer>
      {modalMessage && (
        <AlertModal
          isOpen={!!modalMessage}
          message={modalMessage}
          onConfirm={closeModal}
        />
      )}
      <SignupForm
        logoSrc={MainLogo}
        onSignup={handleSignup}
        logoToFormSpacingClass="mt-[36px] md:mt-[30px]"
        formToButtonSpacingClass="mt-[10px] md:mt-[24px]"
      />
    </AuthContainer>
  );
}
