import React from "react";
import Image from "next/image";
import PlusIcon from "@/assets/icons/Plus.icon.svg";

export default function PlusIconButton() {
  return (
    <div className="w-[20px] h-[20px] tablet:w-[22px] tablet:h-[22px] flex items-center justify-center 
                    rounded-[4px] bg-violet-F1EFFD">
      <Image src={PlusIcon} className="w-[9px] tablet:w-[10px]" alt="추가" />
    </div>
  );
}
