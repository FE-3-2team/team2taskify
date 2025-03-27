import { useState } from "react";
import { instance } from "@/api/instance";
import { Button } from "@/components/common/Button";
import UnifiedInput from "@/components/common/Input";
import { Modal } from "@/components/common/ModalPopup";
import { AlertModal } from "@/components/ModalContents/AlertModal";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const allFilled = currentPassword && newPassword && confirmPassword;
  const isFormValid = newPassword.length >= 8 && newPassword === confirmPassword;

  const handleSubmit = async () => {
    if (!currentPassword) {
      setErrorMessage("현재 비밀번호를 입력해주세요.");
      setErrorModalOpen(true);
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("새 비밀번호는 8자 이상이어야 합니다.");
      setErrorModalOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      setErrorModalOpen(true);
      return;
    }

    try {
      await instance.put(
        `/auth/password`,
        {
          password: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setErrorMessage("비밀번호가 성공적으로 변경되었습니다.");
      setErrorModalOpen(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const message = error?.response?.data?.message || "";
      if (message.toLowerCase().includes("password")) {
        setErrorMessage("현재 비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMessage(message);
      }
      setErrorModalOpen(true);
    }
  };

  return (
    <div className="w-full max-w-[284px] tablet:max-w-[672px] p-[16px] tablet:p-[24px] bg-white rounded-[8px] tablet:rounded-[16px]">
      <h2 className="mb-[40px] tablet:mb-[24px] text-2lg-bold tablet:text-2xl-bold">
        비밀번호 변경
      </h2>

      <UnifiedInput
        variant="password"
        label="현재 비밀번호"
        placeholder="현재 비밀번호 입력"
        value={currentPassword}
        onChange={setCurrentPassword}
      />
      <UnifiedInput
        variant="password"
        label="새 비밀번호"
        placeholder="새 비밀번호 입력"
        value={newPassword}
        onChange={setNewPassword}
      />
      <UnifiedInput
        variant="confirmPassword"
        label="새 비밀번호 확인"
        placeholder="새 비밀번호 입력"
        value={confirmPassword}
        onChange={setConfirmPassword}
        compareWith={newPassword}
      />

      <Button
        size="xlarge"
        className={`text-white ${
          allFilled ? "!bg-violet-200" : "!bg-gray-400"
        }`}
        onClick={handleSubmit}
      >
        변경
      </Button>

      <AlertModal
        isOpen={errorModalOpen}
        message={errorMessage}
        onConfirm={() => setErrorModalOpen(false)}
      />
    </div>
  );
}
