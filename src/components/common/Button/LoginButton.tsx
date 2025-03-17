import React from "react";

interface LoginButtonProps {
  onClick: () => void;
  text?: string;
  size?: "small" | "large"; // 버튼 크기 선택 가능
  disabled?: boolean; // 비활성화 여부
}

export default function LoginButton({
  onClick,
  text = "로그인",
  size = "large", // 기본값 large
  disabled = false, // 기본값 false (활성화 상태)
}: LoginButtonProps) {
  return (
    <button
      className={
        `w-full ${size === "small" ? "max-w-[351px]" : "max-w-[520px]"} px-[14px] py-[14px] 
      ${disabled ? "bg-gray-9FA6B2 cursor-not-allowed" : "bg-violet-5534DA"} text-white text-2lg-medium rounded-[8px] flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled} // 비활성화 여부 적용
    >
      {text}
    </button>
  );
}
