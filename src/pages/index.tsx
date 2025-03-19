import { PlusIconButton, PaginationButton, Button, DashButton } from "@/components/common/Button";
import ColorChip from "@/components/common/Button/ColorChipSmall";
import React, { useState } from "react";
import Image from "next/image";
import CrownIcon from "@/assets/icons/Crown.icon.svg"; // 왕관 아이콘
import PlusIcon from "@/assets/icons/Plus.icon.svg";

export default function Home() {
  const [page, setPage] = useState(1);
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 mt-10 mb-10 text-center">
        <strong className="text-2xl-semibold">대시보드 버튼</strong>
        <div className="flex flex-col items-center justify-center w-full gap-2 mb-10 max-w-[600px]">
          <DashButton size="small" className="flex items-center gap-[12px]" onClick={() => console.log("Clicked!")}>새로운 대시보드 <PlusIconButton /></DashButton>
          <DashButton size="medium" onClick={() => console.log("Clicked!")}>대시보드 삭제하기</DashButton>
          <DashButton size="large" className="flex items-center gap-[12px]" onClick={() => console.log("Clicked!")}>새로운 컬럼 추가하기 <PlusIconButton /></DashButton>
          <DashButton size="small" className="flex items-center gap-[12px]" onClick={() => console.log("Clicked!")}>새로운 대시보드 <PlusIconButton /></DashButton>
          <DashButton className="!py-[6px] !tablet:py-[6px]" onClick={() => console.log("Clicked!")}><PlusIconButton /></DashButton>
          <DashButton size="small" title="비브리지" color="#7AC555" isOwner={true} hasArrow={true} onClick={() => console.log("Clicked!")}/>
          <DashButton size="small" title="코드잇" color="#760DDE" isOwner={false} hasArrow={true} onClick={() => console.log("Clicked!")}/>
          <DashButton size="small" title="3분기 계획" color="#FFA500" isOwner={false} hasArrow={true} onClick={() => console.log("Clicked!")}/>
          <DashButton size="small" title="회의록" color="#76A6EA" isOwner={true} hasArrow={true} onClick={() => console.log("Clicked!")}/>
          <DashButton size="small" title="중요 문서함" color="#E876EA" isOwner={false} hasArrow={true} onClick={() => console.log("Clicked!")}/>
          <div className="flex items-center gap-[8px]"><ColorChip color="#7AC555" /> <span>비브리지</span><Image src={CrownIcon} className="w-[15px] tablet:w-[20px]" alt="왕관" /></div>
          <div className="flex items-center gap-[8px]"><ColorChip color="#760DDE" /> <span>코드잇</span></div>
          <div className="flex items-center gap-[8px]"><ColorChip color="#FFA500" /> <span>3분기 계획</span></div>
          <div className="flex items-center gap-[8px]"><ColorChip color="#76A6EA" /> <span>회의록</span></div>
          <div className="flex items-center gap-[8px]"><ColorChip color="#E876EA" /> <span>중요 문서함</span></div>
        </div>

        <strong className="text-2xl-semibold">기본 버튼</strong>
        <div className="flex flex-col items-center justify-center w-full gap-2 mb-10 max-w-[500px]">
          {/* 로그인 버튼 */}
          <Button size="xlarge" variant="primary">로그인</Button>
          <Button size="xlarge" variant="disabled">로그인</Button>
          {/* 수락 & 거절 버튼 */}
          <div className="flex gap-[12px] w-full max-w-[160px]">
            <Button size="xsmall" variant="primary">수락</Button>
            <Button size="xsmall" variant="secondary">거절</Button>
          </div>
          <div className="flex gap-[12px] w-full max-w-[160px]">
            <Button size="xsmall" variant="primary">수락</Button>
          </div>

          {/* 🔘 삭제 & 입력 버튼 (작은 크기) */}
          <div className="flex items-center justify-center gap-[12px] w-full max-w-[160px]">
            <div className="flex w-full max-w-[160px]">
              <Button size="xsmall" variant="secondary">삭제</Button>
            </div>
            <div className="flex w-full max-w-[160px]">
              <Button size="xxsmall" variant="secondary">입력</Button>
            </div>
          </div>

          {/* 📌 모달 버튼 */}
          <Button size="small" variant="primary">small 확인</Button>
          <Button size="small" variant="outline">small 취소</Button>
          <Button size="medium" variant="primary">large 확인</Button>
          <Button size="medium" variant="outline">large 취소</Button>
        </div>

        <strong className="text-2xl-semibold">페이지네이션</strong>
        <div className="flex flex-col gap-[10px] mb-10 w-full items-center justify-center">
          <PaginationButton hasPrev={true} hasNext={true} size="small" onPrev={() => {}} onNext={() => {}} />
          <PaginationButton hasPrev={false} hasNext={false} size="large" onPrev={() => {}} onNext={() => {}} />
          <PaginationButton hasPrev={page > 1} hasNext={page < 5} size="large" onPrev={() => setPage((prev) => prev - 1)}onNext={() => setPage((prev) => prev + 1)}/>
        </div>

        <strong className="text-2xl-semibold">폰트사이즈</strong>
        <div className="w-full max-w-[800px] flex flex-col items-center justify-center mb-10">
          <p className="text-3xl-bold">Pretendard 3XL Bold (32px / 42px)</p>
          <p className="text-3xl-semibold">Pretendard 3XL Semibold (32px / 42px)</p>

          <p className="text-2xl-bold">Pretendard 2XL Bold (24px / 32px)</p>
          <p className="text-2xl-semibold">Pretendard 2XL Semibold (24px / 32px)</p>
          <p className="text-2xl-medium">Pretendard 2XL Medium (24px / 32px)</p>
          <p className="text-2xl-regular">Pretendard 2XL Regular (24px / 32px)</p>

          <p className="text-xl-bold">Pretendard XL Bold (20px / 32px)</p>
          <p className="text-xl-semibold">Pretendard XL Semibold (20px / 32px)</p>
          <p className="text-xl-medium">Pretendard XL Medium (20px / 32px)</p>
          <p className="text-xl-regular">Pretendard XL Regular (20px / 32px)</p>

          <p className="text-2lg-bold">Pretendard 2LG Bold (18px / 26px)</p>
          <p className="text-2lg-semibold">Pretendard 2LG Semibold (18px / 26px)</p>
          <p className="text-2lg-medium">Pretendard 2LG Medium (18px / 26px)</p>
          <p className="text-2lg-regular">Pretendard 2LG Regular (18px / 26px)</p>

          <p className="text-lg-bold">Pretendard LG Bold (16px / 26px)</p>
          <p className="text-lg-semibold">Pretendard LG Semibold (16px / 26px)</p>
          <p className="text-lg-medium">Pretendard LG Medium (16px / 26px)</p>
          <p className="text-lg-regular">Pretendard LG Regular (16px / 26px)</p>

          <p className="text-md-bold">Pretendard MD Bold (14px / 24px)</p>
          <p className="text-md-semibold">Pretendard MD Semibold (14px / 24px)</p>
          <p className="text-md-medium">Pretendard MD Medium (14px / 24px)</p>
          <p className="text-md-regular">Pretendard MD Regular (14px / 24px)</p>

          <p className="text-sm-semibold">Pretendard SM Semibold (13px / 22px)</p>
          <p className="text-sm-medium">Pretendard SM Medium (13px / 22px)</p>

          <p className="text-xs-semibold">Pretendard XS Semibold (12px / 20px)</p>
          <p className="text-xs-medium">Pretendard XS Medium (12px / 18px)</p>
          <p className="text-xs-regular">Pretendard XS Regular (12px / 18px)</p>
        </div>

        <strong className="text-2xl-semibold">컬러가이드</strong>
        <div className="w-full max-w-[800px] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-400">#000000 black-400</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-300">#171717 black-300</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-200">#333236 black-200</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-100">#4B4B4B black-100</div>

          <div className="flex items-center justify-center w-64 h-12 text-white bg-gray-500">#787486 gray-500</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-400">#9FA6B2 gray-400</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-300">#D9D9D9 gray-300</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-200">#EEEEEE gray-200</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-100">#FAFAFA gray-100</div>

          <div className="flex items-center justify-center w-64 h-12 text-black bg-white">#FFFFFF white</div>

          <div className="flex items-center justify-center w-64 h-12 text-white bg-violet-200">#5534DA violet-200</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-violet-100">#F1EFFD violet-100</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-red">#D6173A red</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-green">#7AC555 green</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-purple">#760DDE purple</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-orange">#FFA500 orange</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-blue">#76A6EA blue</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-pink">#E876EA pink</div>
        </div>
      </div>
    </>
  );
}
