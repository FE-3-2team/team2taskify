import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Image from "next/image";
import CrownIcon from "@/assets/icons/Crown.icon.svg"; // 왕관 아이콘
import RightArrowIcon from "@/assets/icons/RightArrow.icon.svg"; // 화살표 아이콘
import ColorChip from "./ColorChipSmall"; // 컬러칩 컴포넌트 불러오기

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: "small" | "medium" | "large"; // 크기별 스타일 적용
  className?: string; // 추가적인 스타일 확장 가능하도록
  title?: string; // 대시보드 버튼 제목
  color?: string; // 컬러칩 색상
  isOwner?: boolean; // 왕관 아이콘 유무
  hasArrow?: boolean; // 화살표 아이콘 유무
  hideTextOnMobile?: boolean; // 모바일에서 제목, 왕관, 화살표 숨김 여부
}

export default function DashButton({
  children,
  size = "medium",
  className = "",
  title,
  color,
  isOwner = false,
  hasArrow = true,
  hideTextOnMobile = false, // 기본값 false (숨기지 않음)
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-[8px] flex items-center justify-center px-[16px] py-[16px] tablet:py-[20px] border border-gray-300 bg-white text-black-200 w-full",
        {
          small: "text-md-semibold tablet:text-lg-semibold",
          medium: "text-lg-medium tablet:text-2lg-medium",
          large: "text-lg-bold tablet:text-2lg-bold",
        }[size],
        className
      )}
      {...rest}
    >
      {/* 기존 버튼 내부 요소가 있으면 children을 출력 */}
      {children}

      {/* 컬러칩은 항상 표시 */}
      {color && <ColorChip color={color} />}

      {/* 만약 title이 존재하면 DashCardButton 스타일 적용 */}
      {title && (
        <div className="flex items-center justify-between w-full ml-[8px]">
          {/* hideTextOnMobile이 true이면 모바일에서는 숨김, tablet 이상에서는 보임 */}
          <div className={clsx("flex items-center gap-[8px]", { "hidden tablet:flex": hideTextOnMobile })}>
            <span className="block w-full overflow-hidden text-left text-md-semibold tablet:text-lg-semibold whitespace-nowrap text-ellipsis max-w-[80px] laptop:max-w-[200px]">{title}</span>
            {isOwner && <Image src={CrownIcon} className="w-[15px] tablet:w-[20px]" alt="왕관" />}
          </div>

          {/* 화살표 아이콘 (필요할 때만 표시) */}
          {hasArrow && (
            <Image
              src={RightArrowIcon}
              width={18}
              alt="화살표"
              className={clsx({ "hidden tablet:block": hideTextOnMobile })}
            />
          )}
        </div>
      )}
    </button>
  );
}