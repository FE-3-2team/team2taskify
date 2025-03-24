import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export type InputVariant =
  | "email"
  | "password"
  | "confirmPassword"
  | "title"
  | "comment"
  | "date";

// hooks/useValidation.ts
export const defaultValidate = (
  value: string,
  variant: InputVariant,
  compareWith?: string
): string => {
  if (!value) return "";

  if (variant === "email") {
    // 강화된 이메일 정규표현식 사용
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(value)) return "올바른 이메일 형식으로 입력해주세요";
  } else if (variant === "password") {
    if (value.length < 8 || value.length > 16)
      return "비밀번호는 8~16자여야 합니다";
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      !(
        uppercaseRegex.test(value) &&
        lowercaseRegex.test(value) &&
        specialCharRegex.test(value)
      )
    ) {
      return "비밀번호는 소문자, 대문자, 특수기호를 포함해야 합니다";
    }
  } else if (variant === "confirmPassword") {
    if (value !== compareWith) return "비밀번호가 일치하지 않습니다.";
  } else if (variant === "title") {
    // 예: 닉네임은 최소 2글자 이상으로 제한 (추가 조건 필요시 더 추가)
    if (value.length < 2 || value.length > 10)
      return "닉네임은 2자 이상 10자 이하로 작성해주세요.";
    // 추가로 알파벳, 한글, 숫자만 허용하는 경우:
    const nicknameRegex = /^[A-Za-z0-9가-힣]+$/;
    if (!nicknameRegex.test(value))
      return "닉네임에 특수문자는 사용할 수 없습니다.";
  } else if (variant === "comment") {
    if (value.length > 300) return "최대 300자 까지 입력할 수 있습니다.";
  }
  return "";
};

export const useValidation = (
  value: string,
  variant: InputVariant,
  compareWith?: string,
  validate: (
    value: string,
    variant: InputVariant,
    compareWith?: string
  ) => string = defaultValidate,
  delay: number = 50
): string => {
  const debouncedValue = useDebounce(value, delay);
  const [error, setError] = useState("");

  useEffect(() => {
    const validationResult = validate(debouncedValue, variant, compareWith);
    setError(validationResult);
  }, [debouncedValue, variant, compareWith, validate]);

  return error;
};
