// GenericModal.tsx
import React, { useEffect } from "react";
import Button from "../common/Button/Button"; // 새 버튼 컴포넌트

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerText: React.ReactNode;
  content: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  headerText,
  content,
  confirmText,
  cancelText,
  onConfirm,
}) => {
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
        <h2 id="modal-title" className="mb-4 text-2xl font-bold text-left">
          {headerText}
        </h2>
        <div className="mb-6 text-left">{content}</div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button onClick={onClose} size="medium" variant="secondary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} size="medium" variant="primary">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
