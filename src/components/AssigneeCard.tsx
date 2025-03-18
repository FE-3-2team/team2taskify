interface AssigneeCardProps {
  assigneeName: string;
  dueDate: string | null;
  profileImageUrl: string | null;
}

const AssigneeCard: React.FC<AssigneeCardProps> = ({
  assigneeName,
  dueDate,
  profileImageUrl,
}) => {
  const initial = assigneeName.charAt(0).toUpperCase();
  const hasProfileImage = profileImageUrl !== null && profileImageUrl !== "";
  const hasDueDate = dueDate ? dueDate : "마감일 없음";

  return (
    <div className="tablet:w-[200px] tablet:h-[155px] bg-white rounded-[8px] px-[16px] tablet:py-[13px] py-[6px] border border-[#d9d9d9] flex flex-row tablet:flex-col justify-between w-[295px] h-[64px]">
      <div className="w-fit tablet:h-[60px] h-[46px] flex flex-col justify-between">
        <h3 className="text-black-000000 text-xs-semibold">담당자</h3>
        <div className="flex items-center justify-start w-fit h-[34px] gap-[8px]">
          <div
            className={`tablet:w-[34px] tablet:h-[34px] w-[26px] h-[26px] flex items-center justify-center rounded-full border-[2px] border-white text-lg-semibold text-white ${
              hasProfileImage ? "" : "bg-green-500"
            }`}
            style={
              hasProfileImage
                ? {
                    backgroundImage: `url(${profileImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {!hasProfileImage && initial}
          </div>
          <span className="text-black-333236 tablet:text-md-regular text-xs-regular">
            {assigneeName}
          </span>
        </div>
      </div>

      <div className="w-fit tablet:h-[50px] h-[46px] flex flex-col justify-between">
        <h3 className="text-black-000000 text-xs-semibold">마감일</h3>
        <p className="tablet:text-md-regular text-xs-regular text-black-333236">
          {hasDueDate}
        </p>
      </div>
    </div>
  );
};

export default AssigneeCard;
