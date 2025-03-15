interface AssigneeCardProps {
  assigneeName: string;
  dueDate: string;
  profileImageUrl?: string;
}

const AssigneeCard: React.FC<AssigneeCardProps> = ({
  assigneeName,
  dueDate,
  profileImageUrl,
}) => {
  const initial = assigneeName.charAt(0).toUpperCase();
  const hasProfileImage = Boolean(profileImageUrl);

  return (
    <div className="w-[200px] h-[155px] bg-white rounded-[8px] shadow-md p-4 border border-[#d9d9d9]">
      <div className="mb-3">
        <h3 className="text-gray-500 text-sm">담당자</h3>
        <div className="flex items-center space-x-3 mt-1">
          {hasProfileImage ? (
            <img
              src={profileImageUrl}
              alt={`${assigneeName}의 프로필`}
              className="w-10 h-10 rounded-full border"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-bold">
              {initial}
            </div>
          )}
          <span className="text-gray-800 font-medium">{assigneeName}</span>
        </div>
      </div>

      <div>
        <h3 className="text-gray-500 text-sm">마감일</h3>
        <p className="text-gray-800 font-medium mt-1">{dueDate}</p>
      </div>
    </div>
  );
};

export default AssigneeCard;
