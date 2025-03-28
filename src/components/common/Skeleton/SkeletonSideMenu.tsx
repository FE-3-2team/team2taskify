import Image from "next/image";
import Link from "next/link";
import LogoFull from "@/assets/LogoFull.svg";
import LogoImage from "@/assets/LogoImage.svg";
import addIcon from "@/assets/icons/Addbox.icon.svg";
import { Modal } from "@/components/common/ModalPopup";

export default function SkeletonSideMenu() {
    

    return (
      <div className="fixed left-0 top-0 z-[10] w-[64px] tablet:w-[160px] laptop:w-[300px] h-screen bg-white flex flex-col pt-[20px] pl-[10px] pr-[10px]">
        {/* 로고 영역 (실제 컴포넌트와 동일하게 보여줌) */}
        <Link href="/mydashboard">
        <div className="mb-[30px] flex items-center justify-center tablet:mb-[60px] laptop:justify-start">
          <Image
            src={LogoImage}
            alt="로고"
            className="block tablet:hidden w-[24px]"
          />
          <Image src={LogoFull} alt="로고" className="hidden tablet:block" />
        </div>
      </Link>
  
        {/* 대시보드 텍스트 + 버튼 영역 */}
      <div className="flex items-center justify-center w-full m-auto mb-4 tablet:justify-between">
        <div className="hidden tablet:block mr-6 text-[12px] font-bold text-gray-500">
          Dash Board
        </div>
        <div className="w-[20px] h-[21px] bg-gray-100 rounded" />
      </div>
  
        {/* ✅ 대시보드 리스트 영역 (스켈레톤 처리) */}
        <div className="flex flex-col flex-grow m-auto overflow-hidden gap-[12px] tablet:w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="shimmer-wrapper w-[44px] tablet:w-[120px] laptop:w-[240px] h-[32px] rounded-[6px]"
            >
              <div className="shimmer" />
            </div>
          ))}
        </div>
  
        {/* ✅ 페이지네이션 (스켈레톤 처리) */}
        <div className="flex gap-2 px-2 py-4">
          <div className="shimmer-wrapper w-[24px] h-[24px] rounded-full">
            <div className="shimmer" />
          </div>
          <div className="shimmer-wrapper w-[24px] h-[24px] rounded-full">
            <div className="shimmer" />
          </div>
        </div>
      </div>
    );
  }
  