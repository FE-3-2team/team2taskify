
export default function SkeletonEditProfile() {
    return (
      <div className="w-full max-w-[284px] tablet:max-w-[672px] p-[16px] tablet:p-[24px] bg-white rounded-[8px] tablet:rounded-[16px]">
        {/* 제목 */}
        <div className="shimmer-wrapper w-[100px] h-[28px] mb-[40px] tablet:mb-[24px] rounded-[6px]">
          <div className="shimmer" />
        </div>
  
        <div className="flex flex-col gap-6 tablet:flex-row">
          {/* 프로필 이미지 */}
          <div className="shimmer-wrapper w-[182px] h-[182px] rounded-full overflow-hidden">
            <div className="shimmer" />
          </div>
  
          {/* 입력 영역 */}
          <div className="flex-1 w-full space-y-4">
            <div className="shimmer-wrapper w-full h-[60px] rounded-[6px]">
              <div className="shimmer" />
            </div>
            <div className="shimmer-wrapper w-full h-[60px] rounded-[6px]">
              <div className="shimmer" />
            </div>
            <div className="shimmer-wrapper w-[100px] h-[56px] rounded-[6px] ml-auto">
              <div className="shimmer" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  