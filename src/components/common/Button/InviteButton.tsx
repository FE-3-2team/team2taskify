
interface InviteButtonProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function InviteButton({ onAccept, onReject }: InviteButtonProps) {
  return (
    <>
      {/* 수락 버튼 */}
      <button
        className="w-full tablet:max-w-[72px] laptop:max-w-[84px] 
                   text-xs-medium tablet:text-md-medium
                   bg-violet-200 text-white py-[7px] 
                   flex items-center justify-center rounded-[8px]"
        onClick={onAccept}
      >
        수락
      </button>

      {/* 거절 버튼 */}
      <button
        className="w-full tablet:max-w-[72px] laptop:max-w-[84px] 
                   text-xs-medium tablet:text-md-medium
                   border border-gray-300 bg-white text-violet-200 
                   py-[7px] flex items-center justify-center rounded-[8px]"
        onClick={onReject}
      >
        거절
      </button>
    </>
  );
}
