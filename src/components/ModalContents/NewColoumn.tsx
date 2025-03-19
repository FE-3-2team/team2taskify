import React, { useState, useEffect, useRef } from "react";
import ModalButton from "../common/Button/ModalButton";

export type ModalMode = "create" | "delete";

interface ColumnModalProps {
  isOpen: boolean;
  mode: ModalMode;
  onClose: () => void;
  onConfirm: (title?: string) => void;
  createHeaderText?: string; // 기본: "새 컬럼 생성"
  createLabelText?: string; // 기본: "제목"
  createPlaceholder?: string; // 기본: "새로운 컬럼"
  createConfirmText?: string; // 기본: "확인"
  deleteMessage?: string; // 기본: "컬럼의 모든 카드가 삭제됩니다"
  deleteConfirmText?: string; // 기본: "삭제"
  cancelText?: string; // 기본: "취소"
}

const ColumnModal: React.FC<ColumnModalProps> = ({
  isOpen,
  mode,
  onClose,
  onConfirm,
  createHeaderText = "새 컬럼 생성",
  createLabelText = "제목",
  createPlaceholder = "새로운 컬럼",
  createConfirmText = "확인",
  deleteMessage = "컬럼의 모든 카드가 삭제됩니다",
  deleteConfirmText = "삭제",
  cancelText = "취소",
}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // handleChange에서 단순히 결과를 받아 설정하도록 함
  const validateTitle = (value: string) => {
    if (value.trim() === "중복된 텍스트") {
      return "중복된 컬럼 입니다";
    }
    if (value && (value.length < 2 || value.length > 12)) {
      return "2 ~ 12자의 제목을 지어주세요";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    const validationError = validateTitle(value);
    setError(validationError);
  };

  // 엔터키 입력 시 확인 동작
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    if (mode === "create") {
      if (!title.trim()) {
        setError("제목을 입력하세요");
        return;
      }
      if (error) return;
      onConfirm(title);
    } else {
      onConfirm();
    }
  };

  // 모달이 열릴 때 상태 초기화, 초기 포커스 설정 및 ESC 키 처리
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setError("");
      if (mode === "create" && inputRef.current) {
        inputRef.current.focus();
      }
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, mode, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* 모달 컨텐츠 */}
      <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-lg">
        {mode === "create" ? (
          <>
            <h2 id="modal-title" className="mb-4 text-2xl-bold">
              {createHeaderText}
            </h2>
            <label
              htmlFor="column-title"
              className="block mb-2 text-gray-700 text-lg-regular"
            >
              {createLabelText}
            </label>
            <input
              id="column-title"
              type="text"
              placeholder={createPlaceholder}
              value={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              maxLength={12}
              ref={inputRef}
              className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </>
        ) : (
          <p className="mb-6 text-center text-gray-800 text-xl-medium">
            {deleteMessage}
          </p>
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <ModalButton
            onClick={onClose}
            text={cancelText}
            variant="secondary"
          />
          <ModalButton
            onClick={handleConfirm}
            text={mode === "create" ? createConfirmText : deleteConfirmText}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnModal;
