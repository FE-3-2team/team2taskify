import { useState } from "react";
import Image from "next/image";
import Kebab from "@/assets/icons/Kebabmenu.icon.svg";

interface DropdownEditDelProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownEditDel: React.FC<DropdownEditDelProps> = ({
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-[28px] h-[28px] flex items-center justify-center">
      <button
        className="flex items-center justify-center w-full h-full text-gray-600 rounded-full hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={Kebab} alt="menu" className="h-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-[93px] h-[82px] bg-white shadow-md rounded-[6px] p-[6px] border border-gray-200 text-sm-medium z-50">
          <button
            className="w-full h-[32px] mb-[4px] text-center text-black-333236 hover:text-[#5534DA] hover:bg-[#F1EFFD] rounded px-2 py-2"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            className="w-full h-[32px] text-center text-[#333236] hover:text-[#5534DA] hover:bg-[#F1EFFD] rounded px-2 py-2"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownEditDel;
