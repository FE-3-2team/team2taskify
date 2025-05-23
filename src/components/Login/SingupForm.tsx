import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import UnifiedInput from "@/components/common/Input/Input";
import Button from "../common/Button/Button";
import SignupFormLayout from "./AuthFormLayout";
import { useValidation } from "@/hooks/useValidation";
import CheckBox from "@/assets/icons/CheckBox.svg";
import UncheckBox from "@/assets/icons/UnCheckBox.svg";
import { AlertModal } from "../ModalContents/AlertModal";
import { signupApi, loginApi } from "@/api/auth";
import { useRouter } from "next/router";

interface SignupFormProps {
  logoSrc: string | StaticImageData;
  logoAlt?: string;
  logoText?: string;
  logoToFormSpacingClass?: string;
  formToButtonSpacingClass?: string;
  buttonToFooterSpacingClass?: string;
}

export default function SignupForm({
  logoSrc,
  logoAlt = "Logo",
  logoText = "첫 방문을 환영합니다!",
  logoToFormSpacingClass,
  formToButtonSpacingClass,
  buttonToFooterSpacingClass,
}: SignupFormProps) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
    try {
      await signupApi(email, nickname, password);

      const loginData = await loginApi(email, password);

      setIsModalOpen(true);
    } catch (error) {
      console.error("회원가입 또는 로그인 실패", error);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push("/mydashboard");
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
          variant="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="mt-4">
        <UnifiedInput
          variant="title"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={setNickname}
        />
      </div>
      <div className="mt-4">
        <UnifiedInput
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={setPassword}
        />
      </div>
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
      <label htmlFor="terms" className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="hidden"
        />
        <div className="w-5 h-5 mr-2">
          {terms ? (
            <Image src={CheckBox} alt="체크됨" width={20} height={20} />
          ) : (
            <Image
              src={UncheckBox}
              alt="체크되지 않음"
              width={20}
              height={20}
            />
          )}
        </div>
        <label htmlFor="terms" className="text-sm text-gray-700">
          이용약관에 동의합니다.
        </label>
      </label>
    </div>
  );

  const buttonSection = (
    <div className="w-full">
      <Button
        size="xlarge"
        className={`text-white transition-colors ${
          isFormValid ? "!bg-[#5534da]" : "!bg-[#9FA6B2]"
        }`}
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
    <>
      <SignupFormLayout
        logoSection={logoSection}
        formSection={formSection}
        buttonSection={buttonSection}
        footerSection={footerSection}
      />
      <AlertModal
        isOpen={isModalOpen}
        message="회원가입을 축하합니다"
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
