// ColumnModal.tsx
import React, { useEffect, useRef, ChangeEvent } from "react";
import GenericModal from "./GenericModal";
import UnifiedInput from "../common/Input/TestInput2";

export type ModalMode = "create" | "delete" | "manage" | "invite";

interface ModalTexts {
  create: {
    header: string;
    label: string;
    placeholder: string;
    confirm: string;
  };
  delete: {
    message: string;
    confirm: string;
  };
  manage: {
    header: string;
    confirm: string;
    delete: string;
  };
  invite: {
    header: string;
    label: string;
    placeholder: string;
    confirm: string;
  };
  cancel: string;
}

interface ColumnModalProps {
  isOpen: boolean;
  mode: ModalMode;
  onClose: () => void;
  onConfirm: (value?: string) => void;
  onDelete?: () => void;
  initialTitle?: string;
  texts?: Partial<{
    create: Partial<ModalTexts["create"]>;
    delete: Partial<ModalTexts["delete"]>;
    manage: Partial<ModalTexts["manage"]>;
    invite: Partial<ModalTexts["invite"]>;
    cancel: string;
  }>;
}

const defaultTexts: ModalTexts = {
  create: {
    header: "새 컬럼 생성",
    label: "제목",
    placeholder: "새로운 컬럼",
    confirm: "생성",
  },
  delete: {
    message: "컬럼의 모든 카드가 삭제됩니다",
    confirm: "삭제",
  },
  manage: {
    header: "컬럼 관리",
    confirm: "변경",
    delete: "삭제",
  },
  invite: {
    header: "초대하기",
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    confirm: "초대",
  },
  cancel: "취소",
};

const ColumnModal: React.FC<ColumnModalProps> = ({
  isOpen,
  mode,
  onClose,
  onConfirm,
  onDelete,
  initialTitle = "",
  texts = {},
}) => {
  const mergedTexts: ModalTexts = {
    create: { ...defaultTexts.create, ...texts.create },
    delete: { ...defaultTexts.delete, ...texts.delete },
    manage: { ...defaultTexts.manage, ...texts.manage },
    invite: { ...defaultTexts.invite, ...texts.invite },
    cancel: texts.cancel || defaultTexts.cancel,
  };

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateTitle = (val: string) => {
    if (val.trim() === "중복된 텍스트") {
      return "중복된 컬럼 입니다";
    }
    if (val && (val.length < 2 || val.length > 12)) {
      return "2 ~ 12자의 제목을 지어주세요";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "이메일을 입력하세요";
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다";
    return "";
  };

  const handleEmailChange = (val: string) => {
    setValue(val);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (mode === "create" || mode === "manage") {
      const validationError = validateTitle(newValue);
      setError(validationError);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    if (mode === "invite") {
      const validationError = validateEmail(value);
      if (validationError) {
        setError(validationError);
        return;
      }
      onConfirm(value);
    } else if (mode === "create" || mode === "manage") {
      if (!value.trim()) {
        setError("제목을 입력하세요");
        return;
      }
      if (error) return;
      onConfirm(value);
    } else if (mode === "delete") {
      onConfirm();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setValue(mode === "create" ? "" : initialTitle);
      setError("");
      if ((mode === "create" || mode === "manage") && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, mode, initialTitle]);

  let modalContent;
  if (mode === "invite") {
    modalContent = (
      <div>
        <UnifiedInput
          variant="email"
          label={mergedTexts.invite.label}
          placeholder={mergedTexts.invite.placeholder}
          value={value}
          onChange={handleEmailChange}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  } else if (mode === "create" || mode === "manage") {
    modalContent = (
      <>
        <label
          htmlFor="column-title"
          className="block mb-2 text-gray-700 text-lg-regular"
        >
          {mergedTexts.create.label}
        </label>
        <input
          id="column-title"
          type="text"
          placeholder={mergedTexts.create.placeholder}
          value={value}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          maxLength={12}
          ref={inputRef}
          className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </>
    );
  } else {
    modalContent = (
      <p className="mb-6 text-center text-gray-800 text-xl-medium">
        {mergedTexts.delete.message}
      </p>
    );
  }

  let headerText = "";
  let confirmText = "";
  let leftButtonText = "";
  let leftButtonAction: () => void = onClose;

  if (mode === "create") {
    headerText = mergedTexts.create.header;
    confirmText = mergedTexts.create.confirm;
    leftButtonText = mergedTexts.cancel;
  } else if (mode === "invite") {
    headerText = mergedTexts.invite.header;
    confirmText = mergedTexts.invite.confirm;
    leftButtonText = mergedTexts.cancel;
  } else if (mode === "delete") {
    headerText = mergedTexts.create.header;
    confirmText = mergedTexts.delete.confirm;
    leftButtonText = mergedTexts.cancel;
  } else if (mode === "manage") {
    headerText = mergedTexts.manage.header;
    confirmText = mergedTexts.manage.confirm;
    leftButtonText = mergedTexts.manage.delete;
    leftButtonAction = onDelete ? onDelete : onClose;
  }

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={headerText}
      content={modalContent}
      confirmText={confirmText}
      cancelText={leftButtonText}
      onConfirm={handleConfirm}
    />
  );
};

export default ColumnModal;
