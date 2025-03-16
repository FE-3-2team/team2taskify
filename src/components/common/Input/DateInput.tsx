import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import CalendarIcon from "../../../assets/icons/Calendar.svg";

const commonInputStyle: React.CSSProperties = {
  width: "520px",
  height: "50px",
  borderRadius: "8px",
  borderWidth: "1px",
  borderStyle: "solid",
  paddingTop: "15px",
  paddingRight: "16px",
  paddingBottom: "15px",
};

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    const placeholder = value ? "" : "날짜를 입력해 주세요";
    return (
      <div className="relative w-[520px]">
        {/* 인풋은 readOnly이고 onClick을 제거하여 달력이 열리지 않게 함 */}
        <input
          id="deadline-input"
          type="text"
          ref={ref}
          readOnly
          value={value}
          placeholder={placeholder}
          style={commonInputStyle}
          className="w-full border rounded focus:outline-none pl-10 pr-3 border-gray-300"
        />
        {/* 달력 아이콘 버튼에만 onClick 핸들러를 부여 */}
        <button
          type="button"
          onClick={onClick}
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 cursor-pointer hover:opacity-80 focus:outline-none"
        >
          <Image src={CalendarIcon} alt="달력 아이콘" width={20} height={20} />
        </button>
      </div>
    );
  }
);

const DeadlineInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="mb-4">
      <label
        htmlFor="deadline-input"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        마감일
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        customInput={<CustomDateInput />}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default DeadlineInput;
