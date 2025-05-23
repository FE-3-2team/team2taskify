import { ChangeEvent, useEffect, useState } from "react";
import ColorChip from "./common/Chip/Color.chip";
import { editDashboard } from "@/api/dashboard";
import { BaseInput } from "@/components/common/Input/Input";
import { Button } from "./common/Button";
import { AlertModal } from "./ModalContents/AlertModal";

interface Props {
  title: string;
  dashboardId: number;
}
interface dashboardDataType extends Props {
  color: string;
}

export default function EditDashboard({ title, dashboardId }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [message, setMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    dashboardId: 0,
    title: "",
    color: "",
  });
  useEffect(() => {
    if (dashboardId && title) {
      setDashboardData((prev) => ({
        ...prev,
        dashboardId: dashboardId,
      }));
      setCurrentTitle(title);
    }
  }, [dashboardId, title]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    setDashboardData((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleClick = (value: string) => {
    setDashboardData((prev) => ({ ...prev, color: value }));
  };

  const handleSubmit = async (dashboardData: dashboardDataType) => {
    if (dashboardData.title === "") {
      setMessage("대시보드 이름을 입력해 주세요");
      setIsAlert(true);
      return;
    }
    try {
      const { newTitle, newColor } = await editDashboard(dashboardData);
      setCurrentTitle(newTitle);
      setMessage("변경에 성공했습니다");
      setIsAlert(true);
    } catch (error: any) {
      setMessage(error.response.data.message);
      setIsAlert(true);
    }
  };

  return (
    <div className="w-full px-4 py-5 bg-white rounded-lg h-fit tablet:py-8 tablet:px-8">
      <div className="flex flex-col gap-6">
        <p className="text-xl-bold tablet:text-2xl-bold text-black-200">
          {currentTitle}
        </p>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-lg-medium text-black-200">대시보드 이름</p>
            <BaseInput
              type="text"
              maxLength={12}
              placeholder="대시보드 이름을 입력하세요"
              value={currentValue}
              onChange={handleChange}
              className="border-gray-300"
            />
          </div>
          <ColorChip onClick={handleClick} />
        </div>
        <Button onClick={() => handleSubmit(dashboardData)}>변경</Button>
        <AlertModal
          isOpen={isAlert}
          message={message}
          onConfirm={() => setIsAlert(false)}
        ></AlertModal>
      </div>
    </div>
  );
}
