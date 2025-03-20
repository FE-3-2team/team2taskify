import { ChangeEvent, useState } from "react";
import ColorChip from "../common/Chip/Color.chip";
import { useRouter } from "next/router";
import { createDashboard } from "@/api/dashboard";
import UnifiedInput from "../common/Input";

export default function NewDashboard() {
  const router = useRouter();
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

  const handleSubmit = async () => {
    const { id, title, color, createdAt, updatedAt, userId, createdByMe } =
      await createDashboard(DashboardData);
    router.push(`/dashboard/${id}`);
    // 대시보드 생성시 위의 {} 안의 데이터 리스폰스 옴
    //대시보드 '생성' 버튼을 클릭하면 대시보드가 생성되고 /dashboard/{dashboardid}로 이동하게 하세요.
  };
  return (
    <div className="w-[327px] tablet:w-[584px]  h-fit px-4 py-5 tablet:py-8 tablet:px-8 rounded-b-2xl">
      <div className="flex flex-col gap-6">
        <p className="text-xl-bold tablet:text-2xl-bold text-black-200">
          새로운 대시보드
        </p>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-lg-medium text-black-200">대시보드 이름</p>
            <input onChange={handleChange} type="text" />
            <UnifiedInput
              variant="title"
              label="대시보드 이름"
              placeholder="대시보드 이름을 입력하세요"
              value={DashboardData.title}
              onChange={() => handleChange}
            />
          </div>
          <ColorChip onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
