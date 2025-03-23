import { ChangeEvent, useState } from "react";
import ColorChip from "../common/Chip/Color.chip";
import { BaseInput } from "@/components/common/Input";

export default function NewDashboard() {
  const [DashboardData, setDashboardData] = useState({
    title: "",
    color: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDashboardData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleClick = (value: string) => {
    setDashboardData((prev) => ({ ...prev, color: value }));
  };

  return (
    <div className="w-full px-4 py-5 bg-white rounded-lg h-fit tablet:py-8 tablet:px-8">
      <div className="flex flex-col gap-6">
        <p className="text-xl-bold tablet:text-2xl-bold text-black-200">
          새로운 대시보드
        </p>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-lg-medium text-black-200">대시보드 이름</p>
            <BaseInput
              type="text"
              maxLength={12}
              placeholder="대시보드 이름을 입력하세요"
              value={DashboardData.title}
              onChange={() => handleChange}
              className="border-gray-300"
            />
          </div>
          <ColorChip onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
