import React, {
  useState,
  ChangeEvent,
  FC,
  forwardRef,
  FocusEvent,
} from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import EyeCloseIcon from "@/assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "@/assets/icons/EyeVisibility_on.svg";
import CalendarIcon from "@/assets/icons/Calendar.svg";
import {
  useValidation,
  defaultValidate,
  InputVariant,
} from "@/hooks/useValidation";
import clsx from "clsx";

export interface BaseInputProps {
  id?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  className?: string;
}

export const BaseInput: FC<
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

const ErrorMessage: FC<{ error: string; id: string }> = ({ error, id }) =>
  error ? (
    <p id={id} className="mt-2 text-sm text-red">
      {error}
    </p>
  ) : null;

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

export interface UnifiedInputProps {
  variant: InputVariant;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  validate?: (
    value: string,
    variant: InputVariant,
    compareWith?: string
  ) => string;
  onSubmit?: () => Promise<void>;
  className?: string;
  debounceDelay?: number;
  onBlur?: () => void;
  compareWith?: string;
  readOnly?: boolean;
  disable?: boolean;
  hideAsterisk?: boolean;
}

const defaultMaxLengths: Record<InputVariant, number> = {
  email: 25,
  password: 15,
  title: 11,
  comment: 300,
  date: 0,
  confirmPassword: 15,
  column: 8,
};

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
  onBlur,
  compareWith,
  readOnly,
  disable,
  hideAsterisk,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // 입력 필드가 포커스를 잃은 후에만 오류 메시지를 보여주기 위한 상태
  const [isTouched, setIsTouched] = useState(false);
  const validationError = useValidation(
    value,
    variant,
    variant === "confirmPassword" ? compareWith : undefined,
    validate,
    debounceDelay
  );
  const error = isTouched ? validationError : "";
  const inputId = `${variant}-input`;
  const errorId = `${inputId}-error`;
  const finalMaxLength = maxLength || defaultMaxLengths[variant];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    if (onBlur) onBlur();
  };

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
          className="block mb-2 text-sm text-gray-700 text-md-medium tablet:text-2lg-medium"
        >
          {label}
          <span className={selectedDate ? "text-violet-200" : "text-gray-700"}>
            *
          </span>
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
        className="flex items-center gap-[2px] mb-2 text-sm text-gray-700 text-md-medium tablet:text-2lg-medium"
      >
        {label}
        {variant === "title" && !hideAsterisk && (
          <span
            className={clsx(
              value && !error ? "text-violet-200" : "text-gray-700"
            )}
          >
            *
          </span>
        )}
      </label>
      {variant === "comment" ? (
        <div className="w-full h-[72px] relative tablet:h-[110px] rounded-[8px] border border-gray-300 p-4 text-lg-regular">
          <textarea
            id={inputId}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            maxLength={finalMaxLength}
            className="w-full h-full border-0 outline-none resize-none focus:outline-none"
            aria-describedby={error ? errorId : undefined}
          />
          {onSubmit && (
            <div className="absolute flex mt-2 w-21 h-7 right-5 bottom-3 tablet:right-4 tablet:bottom-4">
              <Button onClick={onSubmit} size="xxsmall" variant="secondary">
                입력
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={
            variant === "password" || variant === "confirmPassword"
              ? "relative"
              : ""
          }
        >
          <BaseInput
            id={inputId}
            type={
              variant === "password" || variant === "confirmPassword"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            maxLength={finalMaxLength}
            disabled={disable}
            className={`${
              disable || readOnly
                ? "border-gray-300"
                : value && !error
                  ? "border-[#5534da]"
                  : error
                    ? "border-red"
                    : "border-gray-300"
            } ${disable ? "bg-gray-200 cursor-not-allowed" : ""}`}
            aria-describedby={error ? errorId : undefined}
            onBlur={handleBlur}
          />
          {(variant === "password" || variant === "confirmPassword") && (
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
