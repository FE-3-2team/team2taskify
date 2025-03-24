import { ChangeEvent } from "react";
import Image from "next/image";
import MagnifierIcon from "@/assets/icons/Magnifier.icon.svg";

interface SearchInvDashProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInvDash: React.FC<SearchInvDashProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-[36px] flex items-center justify-left bg-white border border-gray-300 rounded-[6px]  py-[5px]  tablet:py-[6px]">
      <div className="w-[22px] h-[22px] tablet:w-[24px] tablet:h-[24px] hidden tablet:block relative mr-[10px]">
        <Image
          src={MagnifierIcon}
          alt="Search"
          fill
          className="object-contain"
        />
      </div>
      <input
        type="text"
        placeholder="검색"
        value={value}
        onChange={handleChange}
        className="w-full h-full text-black text-md-regular"
      />
    </div>
  );
};

export default SearchInvDash;
