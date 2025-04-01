import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CheckIcon from "@/assets/icons/Check.icon.svg";
import DownIcon from "@/assets/icons/TriangleDown.icon.svg";

interface DropdownAssigneeSearchProps {
  assignee: Assignee | null;
  assignees: Assignee[];
  onSelect: (assignee: Assignee) => void;
}

const DropdownAssigneeSearch: React.FC<DropdownAssigneeSearchProps> = ({
  assignee,
  assignees,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredAssignees = searchTerm
    ? assignees.filter((a) =>
        a.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : assignees;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="font-bold text-lg-regular mb-[10px]">담당자</div>
      <div ref={dropdownRef} className="relative w-full h-fit">
        <div
          className="w-full h-[48px] px-[16px] py-[11px] bg-white border border-gray-300 rounded-md flex items-center justify-between gap-[6px] cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setSearchTerm("");
          }}
        >
          {/* 조건: 드롭다운 닫힘 + assignee 존재 → 프로필 + 이름 + 아이콘 */}
          {!isOpen && assignee?.userId && assignee?.nickname ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-[8px]">
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
                  {assignee.profileImageUrl ? (
                    <Image
                      src={assignee.profileImageUrl}
                      alt={assignee.nickname}
                      width={22}
                      height={22}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-[22px] h-[22px] bg-[#A3C4A2] text-white font-bold text-sm flex items-center justify-center rounded-full">
                      {assignee.nickname.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-black text-lg-regular">
                  {assignee.nickname}
                </span>
              </div>
              <Image
                src={DownIcon}
                alt="드롭다운 열기"
                width={26}
                height={26}
              />
            </div>
          ) : (
            // 그 외의 경우: 항상 input 보여줌
            <input
              type="text"
              placeholder="이름을 입력해 주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-lg-regular focus:outline-none"
            />
          )}
        </div>

        {isOpen && filteredAssignees.length > 0 && (
          <div className="absolute left-0 w-full mt-[2px] bg-white border border-gray-300 rounded-md shadow-md top-full z-50 max-h-[240px] overflow-y-auto">
            {filteredAssignees.map((item) => {
              const selectedId = assignee?.userId ?? assignee?.id;
              const itemId = item.userId ?? item.id;
              const isSelected = selectedId === itemId;

              return (
                <button
                  key={item.userId}
                  className="flex items-center px-[16px] py-[14px] w-full h-[48px] text-left hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm("");
                    onSelect(item);
                  }}
                >
                  <div className="w-[16px]">
                    {isSelected ? (
                      <Image
                        src={CheckIcon}
                        alt="selected"
                        width={16}
                        height={16}
                      />
                    ) : null}
                  </div>
                  <div
                    className={`w-[22px] h-[22px] flex items-center justify-center rounded-full text-sm font-bold text-white ml-2 ${
                      item.profileImageUrl ? "" : "bg-[#A3C4A2]"
                    }`}
                    style={
                      item.profileImageUrl
                        ? {
                            backgroundImage: `url(${item.profileImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {}
                    }
                  >
                    {!item.profileImageUrl &&
                      item.nickname.charAt(0).toUpperCase()}
                  </div>

                  <span className="ml-3 text-gray-800 text-lg-regular">
                    {item.nickname}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownAssigneeSearch;
