import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import UnifiedInput from "../Input";
import Button from "../Button/Button";
import LoginFormLayout from "./LoginFormLayout";
import { defaultValidate } from "../../../hooks/useValidation";

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

interface LoginFormProps {
  logoSrc: string | StaticImageData;
  logoAlt?: string;
  logoText?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  loginButtonText?: string;
  signUpText?: string;
  onLogin: (email: string, password: string) => Promise<LoginResponse | null>;
  logoToFormSpacingClass?: string;
  formToButtonSpacingClass?: string;
  buttonToFooterSpacingClass?: string;
}

export default function LoginForm({
  logoSrc,
  logoAlt = "Logo",
  logoText = "오늘도 만나서 반가워요!",
  emailLabel = "이메일",
  emailPlaceholder = "이메일을 입력해 주세요",
  passwordLabel = "비밀번호",
  passwordPlaceholder = "비밀번호를 입력해 주세요",
  loginButtonText = "로그인",
  signUpText = "회원가입하기",
  onLogin,
  logoToFormSpacingClass,
  formToButtonSpacingClass,
  buttonToFooterSpacingClass,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = email && defaultValidate(email, "email") === "";
  const passwordValid =
    password && defaultValidate(password, "password") === "";
  const isFormValid = emailValid && passwordValid;

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    await onLogin(email, password);
    setLoading(false);
  };

  const logoSection = (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full max-w-[200px]">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={200}
          height={322}
          className="object-contain w-full h-auto"
        />
      </div>
      <p className="text-xl-medium text-[#333236]">{logoText}</p>
    </div>
  );

  const formSection = (
    <div className="flex flex-col w-full">
      <div>
        <UnifiedInput
          variant="email"
          label={emailLabel}
          placeholder={emailPlaceholder}
          value={email}
          onChange={(val) => setEmail(val)}
        />
      </div>
      <div className="mt-[16px]">
        <UnifiedInput
          variant="password"
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          value={password}
          onChange={(val) => setPassword(val)}
        />
      </div>
    </div>
  );

  const buttonSection = (
    <div className="w-full">
      <Button
        size="xlarge"
        // ! 를 붙여서 기존 variant 스타일을 덮어씌우도록 함
        className={`text-white transition-colors ${
          isFormValid ? "!bg-[#5534da]" : "!bg-[#9FA6B2]"
        } hover:!bg-[#5534da]`}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "로그인 중..." : loginButtonText}
      </Button>
    </div>
  );

  const footerSection = (
    <p className="text-center text-gray-600">
      회원이 아니신가요?{" "}
      <Link href="/signup">
        <span className="underline cursor-pointer">{signUpText}</span>
      </Link>
    </p>
  );

  return (
    <LoginFormLayout
      logoSection={logoSection}
      formSection={formSection}
      buttonSection={buttonSection}
      footerSection={footerSection}
      logoToFormSpacingClass={logoToFormSpacingClass}
      formToButtonSpacingClass={formToButtonSpacingClass}
      buttonToFooterSpacingClass={buttonToFooterSpacingClass}
    />
  );
}
