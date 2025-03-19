import PlusIconButton from "./PlusIconButton"; // 새 컴포넌트 import

interface AddColumnButtonProps {
  onClick: () => void;
}

export default function AddColumnButton({ onClick }: AddColumnButtonProps) {
  return (
    <button
      className="w-full max-w-[284px] tablet:max-w-full laptop:max-w-[354px] flex items-center justify-center 
                 py-[20px] rounded-[8px] border border-gray-300 
                 bg-white gap-[12px]"
      onClick={onClick}
    >
      <span className="text-lg-bold tablet:text-2lg-bold text-black-200">새로운 컬럼 추가하기</span>
      <PlusIconButton />
      {/* <div className="w-[20px] h-[20px] tablet:w-[22px] tablet:h-[22px] flex items-center justify-center 
                      rounded-[4px] bg-violet-F1EFFD">
        <Image src={PlusIcon} className="w-[9px] tablet:w-[10px]" alt="추가" />
      </div> */}
    </button>
  );
}
