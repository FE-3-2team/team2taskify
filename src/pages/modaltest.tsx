// pages/modaltest.tsx
import React, { useState } from "react";
import EnhancedModal, {
  ModalInput,
  ModalButton,
} from "../components/ModalContents/Reusablamodal";
import Button from "../components/common/Button/Button";

const ModalTestPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 입력 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  // 입력 필드 배열 구성
  const inputs: ModalInput[] = [
    {
      variant: "title",
      label: "이름",
      placeholder: "이름을 입력해주세요",
      value: name,
      onChange: setName,
    },
    {
      variant: "email",
      label: "이메일",
      placeholder: "이메일을 입력해주세요",
      value: email,
      onChange: setEmail,
    },
    {
      variant: "date",
      label: "날짜",
      placeholder: "날짜를 선택해주세요",
      value: date,
      onChange: setDate,
    },
    {
      variant: "comment",
      label: "세부사항",
      placeholder: "내용을 입력해주세요",
      value: comment,
      onChange: setComment,
    },
  ];

  // 버튼 배열 구성
  const buttons: ModalButton[] = [
    {
      label: "취소",
      variant: "secondary",
      onClick: () => setIsOpen(false),
    },
    {
      label: "생성",
      variant: "primary",
      onClick: () => {
        console.log("생성 데이터:", { name, email, date, comment });
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-100">
      <Button onClick={() => setIsOpen(true)}>새 컬럼 생성</Button>
      <EnhancedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="새 컬럼 생성"
        inputs={inputs}
        buttons={buttons}
      />
    </div>
  );
};

export default ModalTestPage;
