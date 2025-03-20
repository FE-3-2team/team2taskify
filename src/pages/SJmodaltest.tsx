// SJmodaltest.tsx (또는 TestColumnModalPage.tsx)
import React, { useState } from "react";
import ColumnModal, {
  ModalMode,
} from "../components/ModalContents/ColumnModal";
// 수정된 Button 컴포넌트 import
import Button from "../components/common/Button/Button";

export default function TestColumnModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [result, setResult] = useState("");
  const [currentTitle, setCurrentTitle] = useState("기존 컬럼 제목");

  const handleConfirm = (value?: string) => {
    if (modalMode === "create" && value) {
      setResult(`생성된 컬럼 제목: ${value}`);
    } else if (modalMode === "manage" && value) {
      setResult(`변경된 컬럼 제목: ${value}`);
      setCurrentTitle(value);
    } else if (modalMode === "invite" && value) {
      setResult(`입력한 이메일: ${value}`);
    } else if (modalMode === "delete") {
      setResult("컬럼의 모든 카드가 삭제되었습니다");
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setResult("컬럼이 삭제되었습니다");
    setIsModalOpen(false);
  };

  return (
    <div className="container p-4 mx-auto space-y-4">
      <Button
        onClick={() => {
          setModalMode("create");
          setIsModalOpen(true);
        }}
        size="medium"
        variant="primary"
      >
        컬럼 생성 모달 열기
      </Button>
      <Button
        onClick={() => {
          setModalMode("manage");
          setIsModalOpen(true);
        }}
        size="medium"
        variant="secondary"
      >
        관리 모달 열기
      </Button>
      <Button
        onClick={() => {
          setModalMode("delete");
          setIsModalOpen(true);
        }}
        size="medium"
        variant="outline"
      >
        삭제 모달 열기
      </Button>
      <Button
        onClick={() => {
          setModalMode("invite");
          setIsModalOpen(true);
        }}
        size="medium"
        variant="primary"
      >
        초대 모달 열기
      </Button>
      {result && <p className="mt-4 text-lg">{result}</p>}
      <ColumnModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        initialTitle={currentTitle}
      />
    </div>
  );
}
