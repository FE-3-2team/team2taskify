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
    <div className="w-[200px] h-[155px] bg-white rounded-[8px] p-4 border border-[#d9d9d9]">
      <div className="mb-3">
        <h3 className="text-sm text-gray-500">담당자</h3>
        <div className="flex items-center mt-1 space-x-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold text-white ${
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
          <span className="font-medium text-gray-800">{assigneeName}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm text-gray-500">마감일</h3>
        <p className="mt-1 font-medium text-gray-800">{hasDueDate}</p>
      </div>
    </div>
  );
};

export default AssigneeCard;
