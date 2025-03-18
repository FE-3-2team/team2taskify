
interface InputButtonProps {
  onClick: () => void;
}

export default function InputButton({ onClick }: InputButtonProps) {
  return (
    <button
      className="w-auto py-[7px] tablet:py-[9px] px-[31px] 
                 border border-gray-D9D9D9 bg-white-FFFFFF text-violet-5534DA 
                 text-xs-medium rounded-[4px] flex items-center justify-center"
      onClick={onClick}
    >
      입력
    </button>
  );
}
