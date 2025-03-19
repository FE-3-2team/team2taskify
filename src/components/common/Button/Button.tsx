interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    size?: "small" | "medium" | "large"; // 크기별 스타일 적용
    variant?: "primary" | "secondary"; // 색상/디자인 적용
  }
  
  export default function Button({
    onClick,
    children,
    size = "medium",
    variant = "primary",
  }: ButtonProps) {
    const sizeClasses = {
      small: "text-lg-medium tablet:text-2lg-medium w-full tablet:max-w-[320px] py-[16px] tablet:py-[20px]",
      medium: "text-sm px-4 py-2 text-md",
      large: "text-md px-6 py-3 text-lg",
    };
  
    const variantClasses = {
      primary: "border-gray-300 bg-white",
      secondary: "border border-gray-300 bg-white text-violet-200",
    };
  
    return (
      <button
        className={`rounded-[8px] flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  