import { ChangeEvent, useState } from "react";
import ColorChip from "../common/Chip/Color.chip";
import { useRouter } from "next/router";
import { createDashboard } from "@/api/dashboard";

/**
 * Todo
 * input 부분 공통 컴포넌트로 변경
 * submit 함수 에러 핸들링
 */
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
  console.log(DashboardData);
  return (
    <div className="w-[327px] tablet:w-[584px]  h-fit px-4 py-5 tablet:py-8 tablet:px-8 rounded-b-2xl">
      <div className="flex flex-col gap-6">
        <p className="text-xl-bold tablet:text-2xl-bold text-black-333236">
          새로운 대시보드
        </p>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-lg-medium text-black-333236">대시보드 이름</p>
            <input onChange={handleChange} type="text" />
          </div>
          <ColorChip onClick={handleClick} />
          <button className="bg-amber-200" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
