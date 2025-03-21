import React from "react";

interface LoginContainerProps {
  children: React.ReactNode;
}

export default function LoginContainer({ children }: LoginContainerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[520px] flex flex-col gap-6 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
