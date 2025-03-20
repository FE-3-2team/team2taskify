import React, { useState, useEffect } from "react";
import ColumnModal from "../components/ModalContents/ColumnModal";
import Button from "../components/common/Button/Button";
import UnifiedInput from "../components/common/Input";

const OneButtonModal: React.FC<{
  isOpen: boolean;
  headerText?: string;
  content: React.ReactNode;
  confirmText: string;
  onConfirm: () => void;
  onClose: () => void;
}> = ({ isOpen, headerText, content, confirmText, onConfirm, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-lg">
        {headerText && (
          <h2 id="modal-title" className="mb-4 text-2xl font-bold text-left">
            {headerText}
          </h2>
        )}
        <div className="mb-6 text-left">{content}</div>
        <div className="flex justify-end mt-4">
          <Button onClick={onConfirm} variant="primary">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const TestPage: React.FC = () => {
  // Modal visibility states
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  // State for the invite modal input
  const [inviteEmail, setInviteEmail] = useState("");

  // Handlers for Manage Modal (투버튼 모달)
  const handleManageConfirm = (value?: string) => {
    console.log("Manage confirmed with value:", value);
    setIsManageOpen(false);
  };
  const handleManageDelete = () => {
    console.log("Manage cancelled");
    setIsManageOpen(false);
  };

  // Handler for Invite Modal (원버튼 모달, 이메일)
  const handleInviteConfirm = () => {
    console.log("Invite confirmed with email:", inviteEmail);
    setIsInviteOpen(false);
    setInviteEmail("");
  };

  // Handler for Delete Modal (투버튼 모달)
  const handleDeleteConfirm = () => {
    console.log("Delete confirmed");
    setIsDeleteOpen(false);
  };

  // Handler for Alert Modal (원버튼 모달, 단순 메시지)
  const handleAlertConfirm = () => {
    console.log("Alert confirmed");
    setIsAlertOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Modal Test Page</h1>
      <div className="space-y-4">
        <Button onClick={() => setIsManageOpen(true)} variant="primary">
          Open Manage Modal
        </Button>
        <Button onClick={() => setIsInviteOpen(true)} variant="primary">
          Open Invite Modal
        </Button>
        <Button onClick={() => setIsDeleteOpen(true)} variant="primary">
          Open Delete Modal
        </Button>
        <Button onClick={() => setIsAlertOpen(true)} variant="primary">
          Open Alert Modal
        </Button>
      </div>

      {/* 1. 투버튼 모달: Manage Modal */}
      <ColumnModal
        isOpen={isManageOpen}
        mode="manage"
        initialTitle="Initial Name"
        onClose={() => setIsManageOpen(false)}
        onConfirm={handleManageConfirm}
        onDelete={handleManageDelete}
        texts={{
          create: { label: "이름", placeholder: "Jonh Doe" },
          manage: { header: "컬럼 관리", confirm: "변경", delete: "취소" },
          cancel: "취소",
        }}
      />

      {/* 2. 원버튼 모달 (이메일): Invite Modal using OneButtonModal */}
      <OneButtonModal
        isOpen={isInviteOpen}
        headerText="초대하기"
        confirmText="초대"
        onConfirm={handleInviteConfirm}
        onClose={() => {
          setIsInviteOpen(false);
          setInviteEmail("");
        }}
        content={
          <div>
            <label className="block mb-2 text-lg text-gray-700">이메일</label>
            <UnifiedInput
              variant="email"
              label=""
              placeholder="이메일을 입력해주세요."
              value={inviteEmail}
              onChange={setInviteEmail}
            />
          </div>
        }
      />

      {/* 3. 투버튼 모달: Delete Modal */}
      <ColumnModal
        isOpen={isDeleteOpen}
        mode="delete"
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        texts={{
          create: { header: "" }, // Override header to be empty
          delete: { message: "컬럼의 모든 카드가 삭제됩니다", confirm: "삭제" },
          cancel: "취소",
        }}
      />

      {/* 4. 원버튼 모달: Alert Modal for password error using OneButtonModal */}
      <OneButtonModal
        isOpen={isAlertOpen}
        headerText=""
        confirmText="확인"
        onConfirm={handleAlertConfirm}
        onClose={() => setIsAlertOpen(false)}
        content={
          <p className="text-lg text-center">비밀번호가 일치 하지 않습니다</p>
        }
      />
    </div>
  );
};

export default TestPage;
