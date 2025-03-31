import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CheckIcon from "@/assets/icons/Check.icon.svg";
import DownIcon from "@/assets/icons/TriangleDown.icon.svg";
import Profile from "../Profile";

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
    <div className="w-full ">
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
          {!isOpen && assignee?.id && assignee?.nickname ? (
            <div className="flex items-center justify-between w-full">
              <Profile
                nickname={assignee.nickname}
                profileImageUrl={assignee.profileImageUrl}
                type="assignee"
              />
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
              const isSelected = assignee?.id === item.id;

              return (
                <button
                  key={item.id}
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
                  <Profile
                    nickname={item.nickname}
                    profileImageUrl={item.profileImageUrl}
                    type="assignee"
                  />
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
