import { useState } from "react";
import Image from "next/image";
import EyeCloseIcon from "../../../assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "../../../assets/icons/EyeVisibility_on.svg";

// 이메일 입력 컴포넌트 (EmailInput)
const EmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hangulRegex = /[가-힣]/;
    if (value && hangulRegex.test(value)) {
      setError("이메일 형식으로 입력해주세요");
    } else if (value && !emailRegex.test(value)) {
      setError("이메일 형식으로 입력해주세요");
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="email-input"
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        이메일
      </label>
      <input
        id="email-input"
        type="email"
        placeholder="이메일을 입력 해주세요"
        value={email}
        onChange={handleChange}
        maxLength={25}
        className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// 비밀번호 입력 컴포넌트 (PasswordInput)
const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value && value.length < 8) {
      setError("8 ~ 15자만 입력 가능합니다");
    } else {
      setError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="password-input"
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        비밀번호
      </label>
      <div className="relative w-full">
        <input
          id="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력 해주세요"
          value={password}
          onChange={handleChange}
          maxLength={15}
          className={`w-full h-12 rounded-lg border p-4 pr-10 focus:outline-none text-lg-regular ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer hover:opacity-80 focus:outline-none"
        >
          <Image
            src={showPassword ? EyeOpenIcon : EyeCloseIcon}
            alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            width={20}
            height={20}
          />
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// EmailInput과 PasswordInput을 하나의 컴포넌트로 결합한 AuthForm
const AuthForm: React.FC = () => {
  return (
    <div className="container p-4 mx-auto space-y-4">
      <EmailInput />
      <PasswordInput />
    </div>
  );
};

export default AuthForm;
