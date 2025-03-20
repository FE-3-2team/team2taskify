import React, {
  useState,
  useEffect,
  ChangeEvent,
  FC,
  forwardRef,
  useReducer,
} from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import Button from "./Button/Button";
import EyeCloseIcon from "../../assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "../../assets/icons/EyeVisibility_on.svg";
import CalendarIcon from "../../assets/icons/Calendar.svg";
import { useDebounce } from "../../hooks/useDebounce";

// 커스텀 훅: useValidation
const useValidation = (
  value: string,
  variant: InputVariant,
  validate: (value: string, variant: InputVariant) => string,
  delay: number = 300
): string => {
  const debouncedValue = useDebounce(value, delay);
  const [error, setError] = useState("");

  useEffect(() => {
    const validationResult = validate(debouncedValue, variant);
    setError(validationResult);
  }, [debouncedValue, variant, validate]);

  return error;
};

export type InputVariant = "email" | "password" | "title" | "comment" | "date";

export interface UnifiedInputProps {
  variant: InputVariant;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  validate?: (value: string, variant: InputVariant) => string;
  onSubmit?: () => Promise<void>;
  className?: string;
  debounceDelay?: number; // 디바운스 딜레이 설정 가능
}

// 기본 최대 글자 수 설정
const defaultMaxLengths: Record<InputVariant, number> = {
  email: 25,
  password: 15,
  title: 12,
  comment: 300,
  date: 0,
};

// 기본 유효성 검사 함수
const defaultValidate = (value: string, variant: InputVariant): string => {
  if (variant === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hangulRegex = /[가-힣]/;
    if (value && hangulRegex.test(value)) return "이메일 형식으로 입력해주세요";
    if (value && !emailRegex.test(value)) return "이메일 형식으로 입력해주세요";
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
      return "비밀번호는 소문자,대문자,특수기호를 포함해야합니다";
    }
  } else if (variant === "title") {
    if (value && (value.length < 2 || value.length > 12))
      return "2 ~ 12자의 제목을 지어주세요";
  } else if (variant === "comment") {
    if (value.length === 300) return "최대 300자 까지 입력 할 수 있습니다.";
  }
  return "";
};

// BaseInput 컴포넌트 (rest props 활용)
interface BaseInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  className?: string;
}

const BaseInput: FC<
  BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  maxLength,
  className = "",
  ...rest
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${className}`}
      {...rest}
    />
  );
};

// 별도의 PasswordToggle 컴포넌트
const PasswordToggleButton: FC<{
  showPassword: boolean;
  toggleShowPassword: () => void;
}> = ({ showPassword, toggleShowPassword }) => (
  <button
    type="button"
    onClick={toggleShowPassword}
    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer hover:opacity-80 focus:outline-none"
    aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
  >
    <Image
      src={showPassword ? EyeOpenIcon : EyeCloseIcon}
      alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      width={20}
      height={20}
    />
  </button>
);

// 에러 메시지 표시 컴포넌트
const ErrorMessage: FC<{ error: string; id: string }> = ({ error, id }) =>
  error ? (
    <p id={id} className="mt-2 text-sm text-red">
      {error}
    </p>
  ) : null;

// CustomDateInput: 날짜 입력 시 커스텀 스타일 적용
type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    const placeholder = value ? "" : "날짜를 입력해 주세요";
    return (
      <div className="relative w-full">
        <input
          id="date-input"
          type="text"
          ref={ref}
          readOnly
          value={value}
          placeholder={placeholder}
          onClick={onClick}
          className="w-full h-[50px] rounded-[8px] border border-gray-300 pt-[15px] pr-[16px] pb-[15px] pl-[56px] focus:outline-none text-lg-regular"
        />
        <button
          type="button"
          onClick={onClick}
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 cursor-pointer hover:opacity-80 focus:outline-none"
          aria-label="달력 열기"
        >
          <Image src={CalendarIcon} alt="달력 아이콘" width={20} height={20} />
        </button>
      </div>
    );
  }
);
CustomDateInput.displayName = "CustomDateInput";

// UnifiedInput 컴포넌트
const UnifiedInput: FC<UnifiedInputProps> = ({
  variant,
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  validate = defaultValidate,
  onSubmit,
  className = "",
  debounceDelay = 300,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = useValidation(value, variant, validate, debounceDelay);
  const inputId = `${variant}-input`;
  const errorId = `${inputId}-error`;
  const finalMaxLength = maxLength || defaultMaxLengths[variant];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  if (variant === "date") {
    const selectedDate = value ? new Date(value) : null;
    const handleDateChange = (date: Date | null) => {
      const formatted = date ? date.toISOString().slice(0, 10) : "";
      onChange(formatted);
    };
    return (
      <div className={`mb-4 ${className}`}>
        <label
          htmlFor="date-input"
          className="block mb-2 text-sm text-gray-700 text-lg-regular"
        >
          {label}
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={<CustomDateInput />}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  }

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        {label}
        {variant === "title" && (
          <>
            {" "}
            {value && !error ? (
              <span className="text-violet-700">*</span>
            ) : (
              <span className="text-gray-700">*</span>
            )}
          </>
        )}
      </label>
      {variant === "comment" ? (
        <div className="w-full rounded-[8px] border border-gray-300 p-4 text-lg-regular">
          <textarea
            id={inputId}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            maxLength={finalMaxLength}
            className="w-full h-[100px] resize-none outline-none border-0 focus:outline-none"
            aria-describedby={error ? errorId : undefined}
          />
          {onSubmit && (
            <div className="flex justify-end mt-2">
              <Button onClick={onSubmit} size="xxsmall" variant="outline">
                입력
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className={variant === "password" ? "relative" : ""}>
          <BaseInput
            id={inputId}
            type={
              variant === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            maxLength={finalMaxLength}
            className={error ? "border-red" : "border-gray-300"}
            aria-describedby={error ? errorId : undefined}
          />
          {variant === "password" && (
            <PasswordToggleButton
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
            />
          )}
        </div>
      )}
      <ErrorMessage error={error} id={errorId} />
    </div>
  );
};

export default UnifiedInput;
