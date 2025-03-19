import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge"; // 크기별 스타일 적용
  variant?: "primary" | "secondary" | "outline" | "disabled"; // 색상/디자인 적용
  className?: string; // 추가적인 스타일 확장 가능하도록
}

export default function Button({
  children,
  size = "medium",
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center w-full",
        {
          // 크기별 스타일
          "text-xs-medium py-[7px] rounded-[4px]": size === "xxsmall", // 입력 버튼
          "text-xs-medium tablet:text-md-medium py-[7px] rounded-[4px]": size === "xsmall", // 삭제 작은 버튼
          "text-md-semibold tablet:text-lg-semibold py-[12px] rounded-[4px]": size === "small", // 삭제 큰 버튼
          "text-lg-medium tablet:text-2lg-medium py-[14px] rounded-[8px]": size === "medium", // 취소 버튼
          "text-lg-bold tablet:text-2lg-bold py-[14px] rounded-[8px]": size === "large", // 확인 버튼
          "text-2lg-medium py-[14px] rounded-[8px]": size === "xlarge", // 로그인 버튼
        },
        {
          // 스타일 종류
          "bg-violet-200 text-white": variant === "primary",
          "border border-gray-300 bg-white text-violet-200": variant === "secondary",
          "border border-gray-300 bg-white text-gray-500": variant === "outline",
          "bg-gray-400 text-white cursor-not-allowed": variant === "disabled",
        },
        className // 추가적인 스타일 확장 가능
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
