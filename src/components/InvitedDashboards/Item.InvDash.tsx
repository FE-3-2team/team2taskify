interface ItemInvDashProps {
  invitation: Invitation;
  onRespond: (id: number, inviteAccepted: boolean) => void;
}

export default function ItemInvDash({
  invitation,
  onRespond,
}: ItemInvDashProps) {
  return (
    <div className="w-full h-[125px] border-b border-gray-300  tablet:h-[72px]">
      <div className="flex flex-col items-start justify-center w-full tablet:px-7 px-5 laptop:px-19 tablet:items-center tablet:flex-row gap-[14px] tablet:gap-[8px] tablet:justify-between">
        <div className="flex">
          <p className="w-[62px] text-gray-400 tablet:hidden">이름</p>
          <p className="truncate text-black-200 tablet:w-[154px] desktop:w-[254px]">
            {invitation.dashboard.title}
          </p>
        </div>
        <div className="flex">
          <p className="w-[62px] text-gray-400 tablet:hidden">초대자</p>
          <p className=" text-black-200 tablet:w-[100px] text-center">
            {invitation.inviter.nickname}
          </p>
        </div>

        <div className="flex desktop:w-[178px] tablet:w-[154px] justify-between h-8 tablet:text-md-medium text-xs-medium">
          <button
            className=" h-full desktop:w-[84px]  tablet:w-[72px]  w-[104px]  bg-violet-200  text-white rounded-[4px] border border-gray-300"
            onClick={() => onRespond(invitation.id, true)}
          >
            수락
          </button>
          <button
            className="h-full desktop:w-[84px]  tablet:w-[72px]  w-[104px]  bg-white text-violet-200 rounded-[4px] border border-gray-300"
            onClick={() => onRespond(invitation.id, false)}
          >
            거절
          </button>
        </div>
      </div>
    </div>
  );
}
