import { useRef, useCallback } from "react";
import TodoCard from "@/components/common/TodoCard";
import GearIcon from "@/assets/icons/Edit.icon.svg";
import PlusIcon from "@/assets/icons/Plus.icon.svg";
import Image from "next/image";

interface ColumnProps {
  title: string;
  cards: Card[];
  columnId: number;
  onAddCardClick: (columnId: number) => void;
  onManageColumnClick: (columnId: number, title: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  cards,
  columnId,
  onAddCardClick,
  onManageColumnClick,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
        }
      });
      if (node) observer.current.observe(node);
    },
    [cards.length]
  );

  return (
    <div className="w-[308px] h-full bg-gray-100 px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-center border-r border-gray-200">
      <div className="flex items-center justify-between mb-[24px] desktop:w-[314px] tablet:w-[544px] w-[284px] h-[22px]">
        <div className="flex items-center justify-between w-fit h-[20px]">
          <div className="w-[8px] h-[8px] rounded-full bg-violet-200 mr-[8px]" />
          <div className="text-black-400 text-lg-bold mr-[12px]">{title}</div>
          <div className="w-[20px] h-[20px] rounded-[4px] bg-gray-200 text-xs-medium text-center">
            {cards?.length ?? 0}
          </div>
        </div>

        <button
          className="tablet:w-[24px] tablet:h-[24px] w-[22px] h-[22px] relative"
          onClick={() => onManageColumnClick(columnId, title)}
        >
          <Image src={GearIcon} alt="Setting" fill className="object-contain" />
        </button>
      </div>

      <button
        onClick={() => onAddCardClick(columnId)}
        className=" bg-white border border-gray-300 desktop:w-[314px] tablet:w-[544px] w-[284px] h-[40px] rounded-[6px] flex items-center justify-center mb-[16px]"
      >
        <div className="relative w-[22px] h-[22px] rounded-[4px] object-contain bg-violet-100">
          <Image
            src={PlusIcon}
            alt="Add new todo"
            fill
            className="object-contain"
          />
        </div>
      </button>

      <div className="flex flex-col gap-[16px]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={index === cards.length - 1 ? lastCardRef : null}
          >
            <TodoCard todoData={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
