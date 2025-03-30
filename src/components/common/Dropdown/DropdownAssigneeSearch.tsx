import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CheckIcon from "@/assets/icons/Check.icon.svg";

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
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredAssignees = assignees.filter((assignee) =>
    assignee.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          className="w-full h-[48px] px-[16px] py-[11px] bg-white border border-gray-300 rounded-md flex items-center gap-[6px] cursor-text"
          onClick={() => setIsOpen(true)}
        >
          {assignee ? (
            <div className="flex items-center flex-shrink-0 w-[22px] h-[22px] overflow-hidden rounded-full">
              {assignee.profileImageUrl ? (
                <Image
                  src={assignee.profileImageUrl}
                  alt={assignee.nickname}
                  width={22}
                  height={22}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-[22px] h-[22px] text-sm font-bold text-white bg-green-500 rounded-full">
                  {assignee.nickname.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ) : null}

          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={searchTerm || assignee?.nickname || ""}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(e.target.value.length > 0);
              setSelectedAssignee(null);
            }}
            className="w-full bg-transparent text-lg-regular focus:outline-none"
          />
        </div>

        {isOpen && filteredAssignees.length > 0 && searchTerm.length > 0 && (
          <div className="absolute left-0 w-full  mt-[2px] bg-white border border-gray-300 rounded-md shadow-md top-full z-50">
            {filteredAssignees.map((item) => {
              const isSelected = assignee?.userId === item.userId;

              return (
                <button
                  key={item.nickname}
                  className="flex items-center px-[16px] py-[14px] w-full h-[48px] text-left hover:bg-gray-100"
                  onClick={() => {
                    setSearchTerm(item.nickname);
                    setSelectedAssignee(item);
                    setIsOpen(false);
                    onSelect(item);
                  }}
                >
                  {isSelected ? (
                    <Image
                      src={CheckIcon}
                      alt="selected"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <div className="w-[16px] h-[16px]" />
                  )}
                  <div
                    className={`w-[22px] h-[22px] flex items-center justify-center rounded-full text-sm font-bold text-white ${
                      item.profileImageUrl ? "" : "bg-green-500"
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
