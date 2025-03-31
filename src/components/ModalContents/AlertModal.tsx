import React, { useEffect } from "react";
import { Button } from "../common/Button";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export function AlertModal({ isOpen, message, onConfirm }: AlertModalProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onConfirm();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-400/70">
      <div className="px-4 py-6 relative flex flex-col tablet:px-6 w-[327px] tablet:w-[568px] h-auto bg-white rounded-[8px] z-20 gap-[32px]">
        <div className="text-lg font-medium text-center text-gray-800">
          {message}
        </div>
        <div className="flex justify-center">
          <div className="tablet:w-[256px] h-[54px] w-[144px] z-20">
            <Button variant="primary" onClick={onConfirm}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
