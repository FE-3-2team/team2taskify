import Image from "next/image";
import { MouseEvent } from "react";
import PlusIcon from "@/assets/icons/Plus.icon.svg";
interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Plus({ onClick }: Props) {
  return (
    <div
      onClick={() => onClick}
      className="flex justify-center items-center  tablet:w-[22px] tablet:h-[22px] w-[20px] rounded-sm h-[20px] bg-violet-F1EFFD  "
    >
      <Image src={PlusIcon} width={10} height={10} alt="+" />
    </div>
  );
}
