import React, { useState } from "react";
import ColumnModal, { ModalMode } from "../components/ModalContents/NewColoumn";

export default function TestColumnModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [result, setResult] = useState("");

  const handleConfirm = (title?: string) => {
    if (modalMode === "create" && title) {
      setResult(`생성된 프로젝트 제목: ${title}`);
    } else if (modalMode === "delete") {
      setResult("컬럼의 모든 카드가 삭제되었습니다");
    }
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
        생성 모달 열기
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
      {result && <p className="mt-4 text-lg">{result}</p>}
      <ColumnModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
