import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import addIcon from "@/assets/icons/Addbox.icon.svg";
import LogoFull from "@/assets/icons/LogoFull.svg";
import LogoImage from "@/assets/icons/LogoImage.svg";
import DashButton from "./Button/DashButton";
import PaginationButton from "./Button/PaginationButton";

const ITEM_HEIGHT = 50; // DashButton 한 개의 예상 높이(px)

// 🟢 SideMenu Props 타입 정의
interface Dashboard {
  title: string;
  color: string;
  isOwner: boolean;
}

interface SideMenuProps {
  dashboards: Dashboard[];
}

export default function SideMenu({ dashboards }: SideMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHeight, setVisibleHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        const availableHeight = containerRef.current.clientHeight; // 가용 높이 계산
        setVisibleHeight(availableHeight);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const itemsPerPage = Math.floor(visibleHeight / ITEM_HEIGHT) || 1; // 최소 1개는 표시
  const totalPages = Math.ceil(dashboards.length / itemsPerPage);

  const displayedDashboards = dashboards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="fixed z-[10] w-[64px] tablet:w-[160px] laptop:w-[300px] h-screen border-r bg-white flex flex-col pt-[20px] pl-[10px] pr-[10px]">
      {/* 로고 */}
      <Link href="/mydashboard">
        <div className="mb-[30px] flex items-center justify-center tablet:mb-[60px] laptop:justify-start">
          <Image src={LogoImage} alt="로고" className="block tablet:hidden w-[24px]" />
          <Image src={LogoFull} alt="로고" className="hidden tablet:block" />
        </div>
      </Link>

      {/* 대시보드 추가 버튼 */}
      <div className="flex items-center justify-center w-full m-auto mb-4 transition-none tablet:justify-between">
        <div className="hidden tablet:block mr-6 text-[12px] font-bold text-gray-500">Dash Board</div>
        <Image src={addIcon} alt="대시보드 추가 버튼" className="h-[20px] w-[20px] cursor-pointer" />
      </div>

      {/* 대시보드 리스트 (동적 높이 적용) */}
      <div ref={containerRef} className="flex flex-col flex-grow m-auto tablet:ml-[10px] overflow-hidden tablet:w-[90%]">
        {displayedDashboards.map((dashboard, index) => (
          <DashButton
            key={index}
            size="small"
            title={dashboard.title}
            color={dashboard.color}
            isOwner={dashboard.isOwner}
            hasArrow={false}
            hideTextOnMobile={true}
            className="!border-none inline-block tablet:flex !w-fit !py-[10px] justify-start !px-[0]"
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 p-4 border-t">
          <PaginationButton
            hasPrev={currentPage > 1}
            hasNext={currentPage < totalPages}
            size="small"
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </div>
      )}
    </div>
  );
}
