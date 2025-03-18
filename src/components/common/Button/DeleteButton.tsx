
interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      className="w-auto py-[7px] px-[9px] tablet:px-[29px] 
                 border border-gray-300 bg-white text-violet-200 
                 text-xs-medium tablet:text-md-medium rounded-[4px] flex items-center justify-center"
      onClick={onClick}
    >
      삭제
    </button>
  );
}
