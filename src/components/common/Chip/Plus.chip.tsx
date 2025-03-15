import Image from "next/image";
import { MouseEvent } from "react";
import Icon from "@/assets/icons/Plus.icon.svg";
interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
/**
 * todo
 *  배경색 컬러변경, 글씨 색깔, font-
 */

export default function Plus({ onClick }: Props) {
  return (
    <div className="flex justify-center items-center  w-[22px] h-[22px] mobile:w-[20px] rounded-sm mobile:h-[20px] bg-[#F1EFFD]  ">
      <Image src={Icon} width={10} height={10} alt="+" />
    </div>
  );
}
