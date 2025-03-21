import { useState } from "react";
import Check from "@/assets/icons/ColorChip.icons.svg";
import Image from "next/image";
interface Props {
  onClick: (value: string) => void;
  initialSelected?: string;
}

const COLOR_VALUES = ["#7AC555", "#760DDE", "#FFA500", "#76A6EA", "#E876EA"];
const COLORS = ["bg-green", "bg-purple", "bg-orange", "bg-blue", "bg-pink"];
export default function ColorChip({
  onClick,
  initialSelected = "#7AC555",
}: Props) {
  const [selected, setSelected] = useState<string>(initialSelected);

  const handleClick = (value: string, color: string) => {
    setSelected(color);
    onClick(value);
  };
  return (
    <div className="flex items-center gap-[10px] w-fit ">
      {COLORS.map((color, i) => (
        <button
          key={color}
          onClick={() => handleClick(COLOR_VALUES[i], color)}
          className={`flex justify-center h-[30px] w-[30px] rounded-full ${COLORS[i]}`}
        >
          {color === selected && (
            <Image src={Check} height={11} width={15.5} alt="v" />
          )}
        </button>
      ))}
    </div>
  );
}
