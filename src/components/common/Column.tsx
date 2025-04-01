import { useRef, useCallback, Dispatch, SetStateAction, useState } from "react";
import SortableCard from "@/components/common/SortableCard";
import { ColumnData } from "@/types/column";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CreateCard from "../ModalContents/CreateCard.modal";
import ManageColumnModal from "../ModalContents/ManageColumnModal";
import useDashboardStates from "@/hooks/useDashboardStates";
import { DetailContent } from "./ModalPopup";
import EditCard from "../ModalContents/EditCard.modal";
import CardCount from "./Chip/CardCount.chip";
import ColorChip from "./Button/ColorChipSmall";

interface ColumnProps {
  column: ColumnData;
  onEditCardClick?: (card: Card) => void;
}
const Column: React.FC<ColumnProps> = ({ column, onEditCardClick }) => {
  const states = useDashboardStates();
  const [isCardEdit, setIsCardEdit] = useState(false);
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
  return (
    <div className="w-full laptop:w-[354px] tablet:max-w-[584px] bg-gray-100 px-[12px] py-[16px] flex flex-col items-center border-r border-gray-200">
      <div className="flex w-full items-center justify-between mb-[24px]  h-[22px]">
        <div className="flex items-center gap-3 justify-between w-fit h-[20px]">
          <ColorChip color="#5534da" />
          <p className="text-black-400 text-lg-bold mr-[12px]">{title}</p>
          <CardCount count={cards.length} />
        </div>
        <ManageColumnModal setTitle={states.setTargetColumnTitle} />
      </div>

      <CreateCard columnId={columnId} />
      <div className="flex w-full flex-col gap-[16px]">
        <SortableContext
          items={cards.map((card) => card.cardId)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card, index) => (
            <>
              <EditCard
                setIsCardEdit={setIsCardEdit}
                isCardEdit={isCardEdit}
                cardId={card.cardId}
              />
              <DetailContent
                columnTitle={states.targetCardColumnTitle}
                cardId={card.cardId}
                columnId={card.columnId}
                cardTitle={card.title}
                ModalOpenButton={
                  <SortableCard
                    key={`card-${card.cardId ?? index}`}
                    card={card}
                    columnId={columnId}
                    index={index}
                    onClick={() => onEditCardClick?.(card)}
                    lastCardRef={
                      index === cards.length - 1 ? lastCardRef : undefined
                    }
                  />
                }
                setIsCardEdit={setIsCardEdit}
              ></DetailContent>
            </>
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
