import { MouseEvent, useState } from "react";
import Check from "@/assets/icons/ColorChip.icons.svg";
import Image from "next/image";
interface Props {
  onClick: (value: string) => void;
}
/**
 * todo
 * 컬러 팔레트 후에 배경색 컬러변경
 */

export default function ColorChip({ onClick }: Props) {
  const [selected, setSelected] = useState<string>("");
  const colors = [
    "bg-green-7AC555",
    "bg-purple-760DDE",
    "bg-orange-FFA500",
    "bg-blue-76A6EA",
    "bg-pink-E876EA",
  ];
  const handleClick = (value: string) => {
    setSelected(value);
    onClick(value);
  };
  return (
    <div className="flex items-center gap-[10px] w-fit ">
      {colors.map((value, i) => (
        <button
          onClick={() => handleClick(value)}
          className={`flex justify-center h-[30px] w-[30px] rounded-full ${colors[i]}`}
          value="green"
        >
          {value === selected && (
            <Image src={Check} height={11} width={15.5} alt="v" />
          )}
        </button>
      ))}
    </div>
  );
}
