export function SkeletonColumn() {
  return (
    <div className="w-[308px] h-full bg-gray-100 px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-start border-r border-gray-200 tablet:h-[calc(100dvh_-_70px)] h-[calc(100dvh_-_60px)]">
      <div className="flex items-center justify-between mb-[24px] w-[144px] h-[22px] bg-gray-200 rounded-[6px] animate-pulse" />
      <div className="bg-gray-200 w-full h-[40px] rounded-[6px] flex items-center justify-center mb-[16px] animate-pulse" />
      <div className="w-full h-[300px] rounded-[6px] bg-gray-200 animate-pulse" />
    </div>
  );
}
