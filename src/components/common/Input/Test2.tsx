import React, { useState, forwardRef } from "react";
import Image from "next/image";
import CalendarIcon from "../../../assets/icons/Calendar.svg";
import EyeCloseIcon from "../../../assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "../../../assets/icons/EyeVisibility_on.svg";

/* 기본 FormField 컴포넌트 */
type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
}) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm text-gray-700 text-lg-regular">
      {label}
    </label>
    {children}
    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
  </div>
);

/* 재사용 가능한 Input 컴포넌트 (forwardRef 적용) */
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, ...rest }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          className={`w-full h-[50px] rounded-[8px] border ${
            icon ? "pl-[56px]" : "pl-[16px]"
          } pr-[16px] focus:outline-none text-lg-regular ${className || ""}`}
        />
      </div>
    );
  }
);

/* 이메일 입력 컴포넌트 */
export const EmailInput: React.FC<{
  email: string;
  setEmail: (email: string) => void;
}> = ({ email, setEmail }) => {
  const [error, setError] = useState("");

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
    <FormField label="이메일" error={error}>
      <Input
        id="email-input"
        type="email"
        placeholder="이메일을 입력 해주세요"
        value={email}
        onChange={handleChange}
        maxLength={25}
        className={error ? "border-red-500" : "border-gray-300"}
      />
    </FormField>
  );
};

/* 비밀번호 입력 컴포넌트 */
export const PasswordInput: React.FC<{
  password: string;
  setPassword: (password: string) => void;
}> = ({ password, setPassword }) => {
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

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <FormField label="비밀번호" error={error}>
      <div className="relative">
        <Input
          id="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력 해주세요"
          value={password}
          onChange={handleChange}
          maxLength={15}
          className={`border ${error ? "border-red-500" : "border-gray-300"}`}
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
    </FormField>
  );
};

/* DatePicker에서 사용할 Custom Date Input (forwardRef 사용) */
type CustomDateInputProps = {
  value?: string;
  onClick?: () => void;
};

export const CustomDateInput = forwardRef<
  HTMLInputElement,
  CustomDateInputProps
>(({ value, onClick }, ref) => (
  <div className="relative w-full">
    <Input
      ref={ref}
      id="deadline-input"
      type="text"
      readOnly
      value={value}
      placeholder={value ? "" : "날짜를 입력해 주세요"}
      onClick={onClick}
      className="border-gray-300 cursor-pointer"
    />
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 cursor-pointer hover:opacity-80 focus:outline-none"
    >
      <Image src={CalendarIcon} alt="달력 아이콘" width={20} height={20} />
    </button>
  </div>
));
