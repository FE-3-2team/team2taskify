import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import UnifiedInput from "../Input";
import Button from "../Button/Button";
import SignupFormLayout from "./AuthFormLayout";

interface SignupFormProps {
  logoSrc: string | StaticImageData;
  logoAlt?: string;
  logoText?: string;
  onSignup: (email: string, nickname: string, password: string) => Promise<any>;
  logoToFormSpacingClass?: string;
  formToButtonSpacingClass?: string;
  buttonToFooterSpacingClass?: string;
}

export default function SignupForm({
  logoSrc,
  logoAlt = "Logo",
  logoText = "회원가입",
  onSignup,
  logoToFormSpacingClass,
  formToButtonSpacingClass,
  buttonToFooterSpacingClass,
}: SignupFormProps) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  // 에러 메시지 상태
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateNickname = (value: string) => {
    if (value && value.length > 10) return "열 자 이하로 작성해주세요.";
    return "";
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value))
      return "이메일 형식으로 작성해 주세요.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (value && value.length < 8) return "8자 이상 입력해주세요.";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (value && value !== password) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const handleNicknameBlur = () => setNicknameError(validateNickname(nickname));
  const handleEmailBlur = () => setEmailError(validateEmail(email));
  const handlePasswordBlur = () => setPasswordError(validatePassword(password));
  const handleConfirmPasswordBlur = () =>
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));

  const isFormValid =
    nickname &&
    email &&
    password &&
    confirmPassword &&
    !nicknameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    terms;

  const handleSignup = async () => {
    setNicknameError(validateNickname(nickname));
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));

    if (!isFormValid) return;
    await onSignup(email, nickname, password);
  };

  const logoSection = (
    <div className="flex flex-col items-center gap-2">
      <button type="button" onClick={() => (window.location.href = "/")}>
        <div className="w-full max-w-[200px]">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={200}
            height={322}
            className="object-contain w-full h-auto"
          />
        </div>
      </button>
      <p className="text-xl-medium text-[#333236]">{logoText}</p>
    </div>
  );

  const formSection = (
    <div className="flex flex-col w-full">
      <div>
        <UnifiedInput
          variant="title"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={setNickname}
          onBlur={handleNicknameBlur}
        />
        {nicknameError && (
          <p className="mt-2 text-sm text-red">{nicknameError}</p>
        )}
      </div>
      <div className="mt-4">
        <UnifiedInput
          variant="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={setEmail}
          onBlur={handleEmailBlur}
        />
        {emailError && <p className="mt-2 text-sm text-red">{emailError}</p>}
      </div>
      <div className="mt-4">
        <UnifiedInput
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={setPassword}
          onBlur={handlePasswordBlur}
        />
        {passwordError && (
          <p className="mt-2 text-sm text-red">{passwordError}</p>
        )}
      </div>
      <div className="mt-4">
        <UnifiedInput
          variant="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={confirmPassword}
          onChange={setConfirmPassword}
          onBlur={handleConfirmPasswordBlur}
        />
        {confirmPasswordError && (
          <p className="mt-2 text-sm text-red">{confirmPasswordError}</p>
        )}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          이용약관에 동의합니다.
        </label>
      </div>
    </div>
  );

  const buttonSection = (
    <div className="w-full">
      <Button
        size="xlarge"
        className={`text-white transition-colors ${
          isFormValid ? "!bg-[#5534da]" : "!bg-[#9FA6B2]"
        } hover:!bg-[#5534da]`}
        onClick={handleSignup}
        disabled={!isFormValid}
      >
        가입하기
      </Button>
    </div>
  );

  const footerSection = (
    <p className="text-center text-gray-600">
      이미 계정이 있으신가요?{" "}
      <Link href="/login">
        <span className="underline cursor-pointer">로그인하기</span>
      </Link>
    </p>
  );

  return (
    <SignupFormLayout
      logoSection={logoSection}
      formSection={formSection}
      buttonSection={buttonSection}
      footerSection={footerSection}
    />
  );
}
