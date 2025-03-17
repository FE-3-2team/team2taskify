import { useState } from "react";
import Image from "next/image";
import Kebab from "@/assets/icons/kebabmenu.icon.svg";

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
        className="w-full h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={Kebab} alt="menu" className="h-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-[93px] h-[82px] bg-white shadow-lg rounded-[6px] p-[6px] border border-gray-200 text-sm z-50">
          <button
            className="w-full text-center text-[#333236] hover:text-[#5534DA] hover:bg-[#F1EFFD] rounded px-2 py-2"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            className="w-full text-center text-[#333236] hover:text-[#5534DA] hover:bg-[#F1EFFD] rounded px-2 py-2"
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
