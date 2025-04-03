
import Image from "next/image";
import LeftArrowIcon from "@/assets/icons/LeftArrow.icon.svg"; // 좌측 화살표 아이콘
import RightArrowIcon from "@/assets/icons/RightArrow.icon.svg"; // 우측 화살표 아이콘

interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  size?: "small" | "large"; // 크기 조절 추가
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ hasPrev, hasNext, size = "small", onPrev, onNext }: PaginationProps) {
  // 버튼 크기 설정
  const buttonSize = size === "small" ? "w-[36px] h-[36px]" : "w-[40px] h-[40px]";

  return (
    <div className="flex border border-gray-300 rounded-[8px] overflow-hidden">
      {/* 이전 버튼 */}
      <button
        className={`
          flex items-center justify-center ${buttonSize} bg-white
          ${hasPrev ? "cursor-pointer" : "cursor-default"}
        `}
        onClick={hasPrev ? onPrev : undefined}
        disabled={!hasPrev}
      >
        <Image 
          src={LeftArrowIcon} 
          alt="이전" 
          className={`${hasPrev ? "opacity-100" : "opacity-60 grayscale contrast-0 brightness-75"}`} 
        />
      </button>

      {/* 구분선 */}
      <div className="w-[1px] bg-gray-300" />

      {/* 다음 버튼 */}
      <button 
        className={`
          flex items-center justify-center ${buttonSize} bg-white
          ${hasNext ? "cursor-pointer" : "cursor-default"}
        `}
        onClick={hasNext ? onNext : undefined}
        disabled={!hasNext}
      >
        <Image 
          src={RightArrowIcon} 
          alt="다음" 
          className={`${hasNext ? "opacity-100" : "opacity-60 grayscale contrast-0 brightness-75"}`} 
        />
      </button>
    </div>
  );
}
