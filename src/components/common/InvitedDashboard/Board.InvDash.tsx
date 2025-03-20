const BoardInvDash: React.FC = () => {
  return (
    <div className="desktop:w-[960px] desktop:min-h-[390px] tablet:w-[504px] tablet:min-h-[390px] w-[260px] min-h-[327px] h-fit rounded-[8px] bg-white px-[20px] tablet:px-[40px] pt-[24px]">
      <div className="w-full h-fit">
        <h2 className="tablet:text-2xl-bold text-md-bold">초대받은 대시보드</h2>
        <div className="tablet:mt-[64px] mt-[105px] flex flex-col items-center justify-center gap-[16px]">
          <div className="bg-[url(@/assets/icons/NoInvitation.icon.svg)] tablet:w-[100px] tablet:h-[100px] w-[60px] h-[60px] bg-contain bg-no-repeat" />
          <p className="text-gray-400 tablet:text-2lg-regular text-xs-regular">
            아직 초대받은 대시보드가 없어요
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardInvDash;
