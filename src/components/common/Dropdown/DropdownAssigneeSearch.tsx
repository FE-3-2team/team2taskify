import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Assignee {
  profileImageUrl: string | null;
  nickname: string;
}

interface DropdownAssigneeSearchProps {
  assignees: Assignee[];
  onSelect: (assignee: Assignee) => void;
}

const DropdownAssigneeSearch: React.FC<DropdownAssigneeSearchProps> = ({
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
      <div className="font-bold text-lg-regular">담당자</div>
      <div ref={dropdownRef} className="relative w-[217px] h-fit">
        <div
          className="w-full h-[48px] px-[16px] py-[11px] bg-white border border-gray-300 rounded-md flex items-center space-x-3 cursor-text"
          onClick={() => setIsOpen(true)}
        >
          {selectedAssignee ? (
            <div className="flex items-center flex-shrink-0 w-[22px] h-[22px] overflow-hidden rounded-full">
              {selectedAssignee.profileImageUrl ? (
                <Image
                  src={selectedAssignee.profileImageUrl}
                  alt={selectedAssignee.nickname}
                  width={22}
                  height={22}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-[22px] h-[22px] text-sm font-bold text-white bg-green-500 rounded-full">
                  {selectedAssignee.nickname.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ) : null}

          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={searchTerm}
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
            {filteredAssignees.map((assignee) => (
              <button
                key={assignee.nickname}
                className="flex items-center px-[16px] py-[14px] w-full h-[48px] text-left hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(assignee.nickname);
                  setSelectedAssignee(assignee);
                  setIsOpen(false);
                  onSelect(assignee);
                }}
              >
                <div
                  className={`w-[22px] h-[22px] flex items-center justify-center rounded-full text-sm font-bold text-white ${
                    assignee.profileImageUrl ? "" : "bg-green-500"
                  }`}
                  style={
                    assignee.profileImageUrl
                      ? {
                          backgroundImage: `url(${assignee.profileImageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  {!assignee.profileImageUrl &&
                    assignee.nickname.charAt(0).toUpperCase()}
                </div>

                <span className="ml-3 text-gray-800 text-lg-regular">
                  {assignee.nickname}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownAssigneeSearch;
