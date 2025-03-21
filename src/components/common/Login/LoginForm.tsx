import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import UnifiedInput from "../Input";
import Button from "../Button/Button";
import LoginFormLayout from "./AuthFormLayout";

interface LoginFormProps {
  logoSrc: string | StaticImageData;
  logoAlt?: string;
  logoText?: string;
  onLogin: (email: string, password: string) => Promise<any>;
  logoToFormSpacingClass?: string;
  formToButtonSpacingClass?: string;
  buttonToFooterSpacingClass?: string;
}

export default function LoginForm({
  logoSrc,
  logoAlt = "Logo",
  logoText = "오늘도 만나서 반가워요!",
  onLogin,
  logoToFormSpacingClass,
  formToButtonSpacingClass,
  buttonToFooterSpacingClass,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = email && email.includes("@");
  const passwordValid = password && password.length >= 8;
  const isFormValid = emailValid && passwordValid;

  const handleLogin = async () => {
    if (!isFormValid) return;
    await onLogin(email, password);
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
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="mt-[16px]">
        <UnifiedInput
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={setPassword}
        />
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
        onClick={handleLogin}
      >
        로그인
      </Button>
    </div>
  );

  const footerSection = (
    <p className="text-center text-gray-600">
      회원이 아니신가요?{" "}
      <Link href="/signup">
        <span className="underline cursor-pointer">회원가입하기</span>
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
