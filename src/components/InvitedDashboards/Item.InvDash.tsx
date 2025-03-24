import { InvitationType } from "@/api/invitations";

interface ItemInvDashProps {
  invitation: InvitationType;
  onRespond: (id: number, inviteAccepted: boolean) => void;
}

export default function ItemInvDash({
  invitation,
  onRespond,
}: ItemInvDashProps) {
  return (
    <div className="w-full h-[125px] border-b border-gray-300 flex flex-col items-start justify-center gap-[14px] tablet:gap-[8px] desktop:gap-[174px] tablet:flex-row tablet:justify-start tablet:items-center tablet:h-[72px]">
      <div className="tablet:text-lg-regular text-md-regular flex flex-col gap-[3px] tablet:flex-row tablet:gap-[8px] desktop:gap-[174px]">
        <div className="flex">
          <p className="w-[62px] text-gray-400 tablet:hidden">이름</p>
          <p className="text-black-200 tablet:w-[154px] desktop:w-[254px]">
            {invitation.dashboard.title}
          </p>
        </div>
        <div className="flex">
          <p className="w-[62px] text-gray-400 tablet:hidden">초대자</p>
          <p className="text-black-200 tablet:w-[100px] text-center">
            {invitation.inviter.nickname}
          </p>
        </div>
      </div>

      <div className="flex gap-[10px] tablet:text-md-medium text-xs-medium">
        <button
          className="desktop:w-[84px] desktop:h-[32px] tablet:w-[72px] tablet:h-[30px] w-[104px] h-[32px] bg-violet-200  text-white rounded-[4px] border border-gray-300"
          onClick={() => onRespond(invitation.id, true)}
        >
          수락
        </button>
        <button
          className="desktop:w-[84px] desktop:h-[32px] tablet:w-[72px] tablet:h-[30px] w-[104px] h-[32px] bg-white text-violet-200 rounded-[4px] border border-gray-300"
          onClick={() => onRespond(invitation.id, false)}
        >
          거절
        </button>
      </div>
    </div>
  );
}
