import { useRef, useCallback, useState, useEffect } from "react";
import SortableCard from "@/components/common/SortableCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CreateCard from "../ModalContents/CreateCard.modal";
import ManageColumnModal from "../ModalContents/ManageColumnModal";
import { DetailContent } from "./ModalPopup";
import EditCard from "../ModalContents/EditCard.modal";
import CardCount from "./Chip/CardCount.chip";
import ColorChip from "./Button/ColorChipSmall";

interface ColumnProps {
  column: ColumnData;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [isCardEdit, setIsCardEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(column.title);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentCards, setCurrentCards] = useState(column.cards);

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
    [currentCards.length]
  );
  return (
    <>
      {isDeleted ? null : (
        <div className="w-full laptop:w-[354px] tablet:max-w-[584px] bg-gray-100 px-[12px] py-[16px] flex flex-col items-center border-r border-gray-200">
          <div className="flex w-full items-center justify-between mb-[24px]  h-[22px]">
            <div className="flex items-center gap-3 justify-between w-fit h-[20px]">
              <ColorChip color="#5534da" />
              <p className="text-black-400 text-lg-bold mr-[12px]">
                {currentTitle}
              </p>
              <CardCount count={currentCards.length} />
            </div>
            <ManageColumnModal
              setCurrentTitle={setCurrentTitle}
              columnId={column.id}
              title={currentTitle}
              setIsDeleted={setIsDeleted}
            />
          </div>

          <CreateCard columnId={column.id} setCurrentCards={setCurrentCards} />
          <div className="flex w-full flex-col gap-[16px]">
            <SortableContext
              items={currentCards.map((card) => card.cardId)}
              strategy={verticalListSortingStrategy}
            >
              {currentCards.map((card, index) => (
                <>
                  <DetailContent
                    columnTitle={column.title}
                    cardId={card.cardId}
                    columnId={card.columnId}
                    cardTitle={card.title}
                    ModalOpenButton={
                      <SortableCard
                        key={`card-${card.cardId ?? index}`}
                        card={card}
                        columnId={column.id}
                        index={index}
                        lastCardRef={
                          index === currentCards.length - 1
                            ? lastCardRef
                            : undefined
                        }
                      />
                    }
                    setIsCardEdit={setIsCardEdit}
                    setCurrentCards={setCurrentCards}
                  ></DetailContent>
                  <EditCard
                    setIsCardEdit={setIsCardEdit}
                    isCardEdit={isCardEdit}
                    cardId={card.cardId}
                    columnId={card.columnId}
                  />
                </>
              ))}
            </SortableContext>
          </div>
        </div>
      )}
    </>
  );
};

export default Column;
