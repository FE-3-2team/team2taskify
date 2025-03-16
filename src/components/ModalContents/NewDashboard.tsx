import { ChangeEvent, useState } from "react";
import ColorChip from "../common/Chip/Color.chip";

/**
 * Todo
 * input 부분 공통 컴포넌트로 변경
 */
export default function NewDashboard() {
  const [newDashboardData, setNewDashboardData] = useState({
    title: "",
    color: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDashboardData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleClick = (value: string) => {
    setNewDashboardData((prev) => ({ ...prev, color: value }));
  };
  console.log(newDashboardData);
  return (
    <div className="w-[327px] tablet:w-[584px]  h-fit px-4 py-5 tablet:py-8 tablet:px-8 rounded-b-2xl">
      <div className="flex flex-col gap-6">
        <p className="text-xl-bold tablet:text-2xl-bold text-black-333236">
          새로운 대시보드
        </p>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-lg-medium text-black-333236">대시보드 이름</p>
            <input onChange={handleChange} type="text"></input>
          </div>
          <ColorChip onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
