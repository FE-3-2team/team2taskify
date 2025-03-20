import React, { useState } from "react";
import ColumnModal, {
  ModalMode,
} from "../components/ModalContents/ColumnModal";

export default function TestModalPage() {
  // 각 모달별 상태 관리
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 기존 새 컬럼 생성 모달
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [result, setResult] = useState("");
  const [currentTitle, setCurrentTitle] = useState("기존 컬럼 제목");

  // 새 컬럼 생성 모달 (투 버튼, 기존 예시)
  const handleCreateConfirm = (value?: string) => {
    if (value) {
      setResult(`생성된 컬럼 제목: ${value}`);
      setCurrentTitle(value);
    }
    setIsCreateModalOpen(false);
  };

  // 컬럼 관리 모달 (투 버튼)
  const handleManageConfirm = (value?: string) => {
    if (value) {
      setResult(`변경된 이름: ${value}`);
    }
    setIsManageModalOpen(false);
  };

  // 초대하기 모달 (원 버튼: 이메일)
  const handleInviteConfirm = (value?: string) => {
    if (value) {
      setResult(`입력한 이메일: ${value}`);
    }
    setIsInviteModalOpen(false);
  };

  // 컬럼 삭제 모달 (투 버튼)
  const handleDeleteConfirm = () => {
    setResult("컬럼의 모든 카드가 삭제되었습니다");
    setIsDeleteModalOpen(false);
  };

  // 비밀번호 불일치 모달 (원 버튼)
  const handlePasswordConfirm = () => {
    setResult("비밀번호가 일치 하지 않습니다 모달에서 확인 클릭");
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="container p-4 space-y-4">
      {/* 테스트용 버튼들 */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        새 컬럼 생성 모달 열기
      </button>
      <button
        onClick={() => setIsManageModalOpen(true)}
        className="px-4 py-2 text-white bg-green-500 rounded"
      >
        컬럼 관리 모달 열기
      </button>
      <button
        onClick={() => setIsInviteModalOpen(true)}
        className="px-4 py-2 text-white bg-purple-500 rounded"
      >
        초대하기 모달 열기
      </button>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="px-4 py-2 text-white bg-red-500 rounded"
      >
        컬럼 삭제 모달 열기
      </button>
      <button
        onClick={() => setIsPasswordModalOpen(true)}
        className="px-4 py-2 text-white bg-orange-500 rounded"
      >
        비밀번호 불일치 모달 열기
      </button>
      {result && <p className="mt-4 text-lg">{result}</p>}

      {/* 1. 새 컬럼 생성 모달 (투 버튼) - 기존 예시 */}
      <ColumnModal
        isOpen={isCreateModalOpen}
        mode="create"
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateConfirm}
        initialTitle={currentTitle}
        texts={{
          create: {
            header: "새 컬럼 생성",
            label: "제목",
            placeholder: "새로운 컬럼",
            confirm: "생성",
          },
          cancel: "취소",
        }}
      />

      {/* 2. 컬럼 관리 모달 (투 버튼) */}
      <ColumnModal
        isOpen={isManageModalOpen}
        mode="manage"
        onClose={() => setIsManageModalOpen(false)}
        onConfirm={handleManageConfirm}
        onDelete={() => setIsManageModalOpen(false)}
        initialTitle="Jonh Doe"
        texts={{
          create: {
            header: "컬럼 관리",
            label: "이름",
            placeholder: "Jonh Doe",
            confirm: "변경",
          },
          manage: {
            header: "컬럼 관리",
            confirm: "변경",
            delete: "취소",
          },
          cancel: "취소",
        }}
      />

      {/* 3. 컬럼 삭제 모달 (투 버튼) */}
      <ColumnModal
        isOpen={isDeleteModalOpen}
        mode="delete"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        initialTitle=""
        texts={{
          create: { header: "컬럼 삭제" }, // header로 사용됨
          delete: {
            message: "컬럼의 모든 카드가 삭제됩니다",
            confirm: "삭제",
          },
          cancel: "취소",
        }}
      />

      {/* 4. 초대하기 모달 (원 버튼: 이메일) */}
      <ColumnModal
        isOpen={isInviteModalOpen}
        mode="invite"
        onClose={() => setIsInviteModalOpen(false)}
        onConfirm={handleInviteConfirm}
        initialTitle=""
        texts={{
          invite: {
            header: "초대하기",
            label: "이메일",
            placeholder: "이메일을 입력해주세요.",
            confirm: "초대",
          },
          cancel: "", // 빈 문자열을 전달하여 단일 버튼 모달로 만듦
        }}
      />

      {/* 5. 비밀번호 불일치 모달 (원 버튼) */}
      <ColumnModal
        isOpen={isPasswordModalOpen}
        mode="delete"
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        initialTitle=""
        texts={{
          create: { header: "알림" },
          delete: {
            message: "비밀번호가 일치 하지 않습니다",
            confirm: "확인",
          },
          cancel: "", // 빈 문자열이므로 단일 버튼
        }}
      />
    </div>
  );
}
