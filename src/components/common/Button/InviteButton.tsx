import React from "react";

interface AcceptRejectButtonProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function AcceptRejectButton({ onAccept, onReject }: AcceptRejectButtonProps) {
  return (
    <div className="flex w-full gap-[10px]">
      {/* 수락 버튼 */}
      <button
        className="w-full tablet:max-w-[72px] laptop:max-w-[84px] 
                   text-xs-medium tablet:text-md-medium 
                   bg-violet-5534DA text-white py-[7px] 
                   flex items-center justify-center rounded-[8px]"
        onClick={onAccept}
      >
        수락
      </button>

      {/* 거절 버튼 */}
      <button
        className="w-full tablet:max-w-[72px] laptop:max-w-[84px] 
                   text-xs-medium tablet:text-md-medium 
                   border border-gray-D9D9D9 bg-white-FFFFFF text-violet-5534DA 
                   py-[7px] flex items-center justify-center rounded-[8px]"
        onClick={onReject}
      >
        거절
      </button>
    </div>
  );
}
