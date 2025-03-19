import React, { useState } from "react";
import ColumnModal, {
  ModalMode,
} from "../components/ModalContents/ColumnModal";

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
      <button
        onClick={() => {
          setModalMode("create");
          setIsModalOpen(true);
        }}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        컬럼 생성 모달 열기
      </button>
      <button
        onClick={() => {
          setModalMode("manage");
          setIsModalOpen(true);
        }}
        className="px-4 py-2 text-white bg-green-500 rounded"
      >
        관리 모달 열기
      </button>
      <button
        onClick={() => {
          setModalMode("delete");
          setIsModalOpen(true);
        }}
        className="px-4 py-2 text-white bg-red-500 rounded"
      >
        삭제 모달 열기
      </button>
      <button
        onClick={() => {
          setModalMode("invite");
          setIsModalOpen(true);
        }}
        className="px-4 py-2 text-white bg-purple-500 rounded"
      >
        초대 모달 열기
      </button>
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
