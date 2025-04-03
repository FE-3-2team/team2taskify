import { useFormatTime } from "@/hooks/useFormatDate";
import Profile from "./common/Profile";

interface AssigneeCardProps {
  assigneeName: string;
  dueDate: string;
  profileImageUrl: string | null;
}

const AssigneeCard: React.FC<AssigneeCardProps> = ({
  assigneeName,
  dueDate,
  profileImageUrl,
}) => {
  const hasDueDate = dueDate ? useFormatTime(dueDate) : "마감일 없음";

  return (
    <div className="w-full tablet:h-[155px] bg-white rounded-[8px] px-[16px] tablet:py-[13px] py-[6px] border border-[#d9d9d9] flex tablet:flex-col justify-between h-[64px]">
      <div className="w-fit tablet:h-[60px] h-[46px] flex flex-col justify-between">
        <h3 className="text-black-000000 text-xs-semibold">담당자</h3>
        <div className="flex items-center justify-start w-fit h-[34px] gap-[8px]">
          <Profile
            nickname={assigneeName}
            profileImageUrl={profileImageUrl}
            type="assignee"
          />
        </div>
      </div>
      <div className="w-fit tablet:h-[50px] h-[46px] flex flex-col justify-between mr-[42px] tablet:mr-[0px]">
        <h3 className="text-black-000000 text-xs-semibold">마감일</h3>
        <p className="tablet:text-md-regular text-xs-regular text-black-333236">
          {hasDueDate}
        </p>
      </div>
    </div>
  );
};

export default AssigneeCard;
