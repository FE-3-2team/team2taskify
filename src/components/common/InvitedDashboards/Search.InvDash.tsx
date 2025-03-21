import { ChangeEvent } from "react";

interface SearchInvDashProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInvDash: React.FC<SearchInvDashProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-[36px] flex items-center justify-left bg-white border border-gray-300 rounded-[6px] px-[12px] py-[5px] tablet:px-[16px] tablet:py-[6px]">
      <div className="bg-[url(@/assets/icons/Magnifier.icon.svg)] w-[22px] h-[22px] tablet:w-[24px] tablet:h-[24px] bg-center bg-contain bg-no-repeat" />
      <input
        type="text"
        placeholder="검색"
        value={value}
        onChange={handleChange}
        className="w-full h-full ml-[10px] text-md-regular text-black"
      />
    </div>
  );
};

export default SearchInvDash;
