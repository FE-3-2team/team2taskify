import { useRef, useCallback, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import SortableCard from "@/components/common/SortableCard";
import DropIndicator from "@/components/common/DropIndicator";
import useDashboardStates from "@/hooks/useDashboardStates";
import { ColumnData } from "@/types/column";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import GearIcon from "@/assets/icons/Edit.icon.svg";
import PlusIcon from "@/assets/icons/Plus.icon.svg";

interface ColumnProps {
  column: ColumnData;
  onAddCardClick: (columnId: number) => void;
  onEditCardClick?: (card: Card) => void;
  activeCard?: Card | null;
  setIsEditColumn: Dispatch<SetStateAction<boolean>>;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onAddCardClick,
  onEditCardClick,
  setIsEditColumn,
  activeCard,
}) => {
  const { id: columnId, title, cards } = column;
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
  const states = useDashboardStates();

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
          onClick={() => setIsEditColumn(true)}
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
        <SortableContext
          items={cards.map((card) => card.cardId)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card, index) => (
            <SortableCard
              key={`card-${card.cardId ?? index}`}
              card={card}
              columnId={columnId}
              index={index}
              onClick={() => onEditCardClick?.(card)}
              lastCardRef={index === cards.length - 1 ? lastCardRef : undefined}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
