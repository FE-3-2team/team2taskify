// EnhancedModal.tsx
import React, { useEffect, useCallback } from "react";
import clsx from "clsx";
import Button from "../common/Button/Button";
import UnifiedInput, { UnifiedInputProps } from "../common/Input";

// 버튼 정보 타입
export interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge";
}

// 입력 필드 정보 타입 (UnifiedInputProps 중 value와 onChange는 외부에서 관리)
export interface ModalInput
  extends Omit<UnifiedInputProps, "onChange" | "value"> {
  value: string;
  onChange: (val: string) => void;
}

// 모달 컴포넌트 Props
interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputs?: ModalInput[];
  buttons?: ModalButton[];
  className?: string;
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({
  isOpen,
  onClose,
  title,
  inputs = [],
  buttons = [],
  className = "",
}) => {
  // ESC 키로 모달 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // body 스크롤 방지
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  // 오버레이 클릭 시 닫기 (모달 내부 클릭은 이벤트 전파 중단)
  const handleOverlayClick = () => onClose();

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300",
        className
      )}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-md p-6 transition-transform duration-300 transform scale-100 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 차단
      >
        {/* 닫기 아이콘 */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700 focus:outline-none"
          aria-label="Close Modal"
        >
          ✕
        </button>
        {/* 모달 제목 */}
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        {/* 입력 필드 영역 */}
        <div className="flex flex-col gap-4 mb-4">
          {inputs.map((inputProps, idx) => (
            <UnifiedInput
              key={idx}
              variant={inputProps.variant}
              label={inputProps.label}
              placeholder={inputProps.placeholder}
              maxLength={inputProps.maxLength}
              validate={inputProps.validate}
              onSubmit={inputProps.onSubmit}
              className={inputProps.className}
              debounceDelay={inputProps.debounceDelay}
              value={inputProps.value}
              onChange={inputProps.onChange}
            />
          ))}
        </div>
        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2">
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              size={btn.size || "medium"}
              variant={btn.variant || "primary"}
              onClick={() => {
                btn.onClick();
                // 선택적: 버튼이 "취소"라면 모달 닫기 처리
                if (btn.label === "취소") {
                  onClose();
                }
              }}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedModal;
