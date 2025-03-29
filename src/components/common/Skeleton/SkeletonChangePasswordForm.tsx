export default function SkeletonChangePasswordForm() {
    return (
      <div className="w-full max-w-[284px] tablet:max-w-[672px] p-[16px] tablet:p-[24px] bg-white rounded-[8px] tablet:rounded-[16px]">
      {/* 제목 */}
      <div className="shimmer-wrapper w-[160px] h-[28px] mb-[40px] tablet:mb-[24px] rounded-[6px]">
        <div className="shimmer" />
      </div>

      {/* 현재 비밀번호 */}
      <div className="shimmer-wrapper w-full h-[60px] mb-[16px] rounded-[6px]">
        <div className="shimmer" />
      </div>

      {/* 새 비밀번호 */}
      <div className="shimmer-wrapper w-full h-[60px] mb-[16px] rounded-[6px]">
        <div className="shimmer" />
      </div>

      {/* 새 비밀번호 확인 */}
      <div className="shimmer-wrapper w-full h-[60px] mb-[24px] rounded-[6px]">
        <div className="shimmer" />
      </div>

      {/* 버튼 */}
      <div className="shimmer-wrapper w-full h-[56px] rounded-[6px]">
        <div className="shimmer" />
      </div>
    </div>
    );
  }
  