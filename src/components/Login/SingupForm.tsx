import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import UnifiedInput from "../common/Input";
import Button from "../common/Button/Button";
import SignupFormLayout from "./AuthFormLayout";
import { useValidation } from "@/hooks/useValidation";

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
  logoText = "첫 방문을 환영합니다!",
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

  const nicknameError = useValidation(nickname, "title");
  const emailError = useValidation(email, "email");
  const passwordError = useValidation(password, "password");
  const confirmPasswordError = useValidation(
    confirmPassword,
    "confirmPassword",
    password
  );

  const isFormValid =
    nickname.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    !nicknameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    terms;

  const handleSignup = async () => {
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
      {/* 이메일 입력 */}
      <div>
        <UnifiedInput
          variant="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={setEmail}
        />
      </div>

      {/* 닉네임 입력 */}
      <div className="mt-4">
        <UnifiedInput
          variant="title"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={setNickname}
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="mt-4">
        <UnifiedInput
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={setPassword}
        />
      </div>

      {/* 비밀번호 확인 입력 (compareWith 속성으로 password와 비교) */}
      <div className="mt-4">
        <UnifiedInput
          variant="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={confirmPassword}
          onChange={setConfirmPassword}
          compareWith={password}
        />
      </div>

      {/* 이용약관 체크박스 */}
      <div className="flex items-center">
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
        className={`text-white transition-colors ${isFormValid ? "!bg-[#5534da]" : "!bg-[#9FA6B2]"} hover:!bg-[#5534da]`}
        onClick={handleSignup}
        disabled={!isFormValid}
      >
        가입하기
      </Button>
    </div>
  );

  const footerSection = (
    <p className="text-center text-gray-600">
      이미 회원이신가요?{" "}
      <Link href="/login">
        <span className="underline cursor-pointer text-[#5534da]">
          로그인하기
        </span>
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
