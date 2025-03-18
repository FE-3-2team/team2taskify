import React from "react";

interface DashboardDeleteButtonProps {
  text: string;
  onClick: () => void;
}

export default function DashboardDeleteButton({ text, onClick }: DashboardDeleteButtonProps) {
  return (
    <button 
      className="w-full max-w-[284px] tablet:max-w-[320px] bg-white border border-gray-D9D9D9 text-black-333236 text-lg-medium tablet-text-2lg-medium
                 rounded-[8px] py-[16px] tablet:py-[20px] flex items-center justify-center"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
