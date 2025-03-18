
import Image from "next/image";
import CrownIcon from "@/assets/icons/Crown.icon.svg"; // 왕관 아이콘
import RightArrowIcon from "@/assets/icons/RightArrow.icon.svg"; // 화살표 아이콘
import ColorChip from "./ColorChipSmall"; // 컬러칩 컴포넌트 불러오기

interface DashboardButtonProps {
  title: string;
  color: string; // 컬러칩 색상
  isOwner?: boolean; // 왕관 아이콘 유무
  hasArrow?: boolean; // 화살표 아이콘 유무
  onClick?: () => void;
}

export default function DashboardButton({
  title,
  color,
  isOwner = false,
  hasArrow = true,
  onClick,
}: DashboardButtonProps) {
  return (
    <button
      className="flex items-center justify-between w-full max-w-[284px] tablet:max-w-full laptop:max-w-[354px] 
                 py-[18px] px-[16px] rounded-[8px] border border-gray-300 bg-white"
      onClick={onClick}
    >
      {/* 왼쪽 컬러칩 & 제목 */}
      <div className="flex items-center gap-[8px]">
        <ColorChip color={color} /> {/* 컬러칩 컴포넌트 사용 */}
        <span className="text-md-semibold tablet:text-lg-semibold text-black-200">{title}</span>
        {isOwner && <Image src={CrownIcon} className="w-[15px] tablet:w-[20px]" alt="왕관" />}
      </div>

      {/* 화살표 아이콘 (필요할 때만 표시) */}
      {hasArrow && <Image src={RightArrowIcon} width={18} alt="화살표" />}
    </button>
  );
}
