import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "xsmall" | "small" | "medium" | "large"; // 크기별 스타일 적용
  variant?: "primary" | "secondary" | "danger" | "outline"; // 색상/디자인 적용
  fullWidth?: boolean; // 전체 너비 여부
  grouped?: boolean; // 모달 버튼 등 그룹 버튼 여부
  className?: string; // 추가적인 스타일 확장 가능하도록
}

export default function Button({
  children,
  size = "medium",
  variant = "primary",
  fullWidth = true,
  grouped = false,
  className = "",
  ...rest
}: ButtonProps) {
  
  // 크기별 스타일
  const sizeClasses = {
    xsmall: "text-xs-medium tablet:text-md-medium w-auto py-[7px] px-[9px] tablet:px-[29px] rounded-[4px]",
    small: "text-md-semibold tablet:text-lg-semibold w-full max-w-[284px] tablet:max-w-full laptop:max-w-[354px] px-[16px] py-[18px] tablet:py-[20px]",
    medium: "text-lg-medium tablet:text-2lg-medium w-full tablet:max-w-[320px] py-[16px] tablet:py-[20px]",
    large: "text-lg-bold tablet:text-2lg-bold w-full tablet:max-w-[320px] py-[16px] tablet:py-[20px]",
  };

  // 스타일 종류
  const variantClasses = {
    primary: "bg-violet-200 text-white",
    secondary: "border border-gray-300 bg-white text-gray-500",
    danger: "border border-red-500 bg-red-500 text-white",
    outline: "border border-gray-300 bg-transparent text-black-200",
    input: "border border-gray-300 bg-white text-violet-200",
  };

  return (
    <button
      className={`rounded-[8px] flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
        fullWidth ? "w-full" : "w-auto"
      } ${grouped ? "px-[24px]" : "px-[32px]"}`}
      {...rest}
    >
      {children}
    </button>
  );
}
