
interface ModalButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  size?: "small" | "large"; // 추가
  fullWidth?: boolean;
  grouped?: boolean;
  onClick: () => void;
}

export default function ModalButton({
  text,
  variant = "primary",
  size = "large", // 기본값 large
  fullWidth = true,
  grouped = false,
  onClick,
}: ModalButtonProps) {
  return (
    <button
      className={`
        ${fullWidth ? "w-full" : "w-full max-w-[240px]"} 
        ${variant === "primary" ? "bg-violet-5534DA text-white" : "border border-gray-D9D9D9 bg-white-FFFFFF text-gray-787486"}
        ${size === "small" ? "py-[12px] text-md-semibold" : "py-[14px] text-lg-semibold"}
        rounded-[8px] 
        ${grouped ? "px-[24px]" : "px-[32px]"} 
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
