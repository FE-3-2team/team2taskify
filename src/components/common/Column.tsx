import { useState, useRef, useCallback } from "react";
import TodoCard from "@/components/common/TodoCard";
import GearIcon from "@/assets/icons/Edit.icon.svg";
import AddIcon from "@/assets/icons/Plus.icon.svg";
import Image from "next/image";

interface ColumnProps {
  title: string;
  cards: Card[];
  onAddCard: (title: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          //console.log("Reached last card");
        }
      });
      if (node) observer.current.observe(node);
    },
    [cards.length]
  );

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(newCardTitle);
      setNewCardTitle("");
      setIsAdding(false);
    }
  };

  return (
    <div className="w-[308px] h-[100vh] bg-gray-FAFAFA rounded-lg px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-center">
      <div className="flex items-center justify-between mb-[24px] desktop:w-[314px] tablet:w-[544px] w-[284px] h-[22px]">
        <div className="flex items-center justify-between w-fit h-[20px]">
          <div className="w-[8px] h-[8px] rounded-full bg-violet-5534DA mr-[8px]" />
          <div className="text-black-000000 text-lg-bold mr-[12px]">
            {title}
          </div>
          <div className="w-[20px] h-[20px] rounded-[4px] bg-gray-EEEEEE text-xs-medium text-center">
            {cards.length}
          </div>
        </div>

        <button
          className="tablet:w-[24px] tablet:h-[24px] w-[22px] h-[22px] relative"
          onClick={() => {}}
        >
          <Image src={GearIcon} alt="Setting" fill className="object-contain" />
        </button>
      </div>

      {/*임시기능: 새 할 일 추가*/}
      {isAdding ? (
        <div>
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="w-full bg-white-FFFFFF"
            placeholder="새 할 일 입력"
          />
          <div>
            <button
              onClick={handleAddCard}
              className="px-3 py-1 bg-blue-500 text-white-FFFFFF"
            >
              추가
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-white-FFFFFF bg-gray-9FA6B2"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className=" bg-white border border-gray-D9D9D9 desktop:w-[314px] tablet:w-[544px] w-[284px] h-[40px] rounded-[6px] flex items-center justify-center mb-[16px]"
        >
          <div className="relative w-[22px] h-[22px] rounded-[4px] object-contain bg-violet-100">
            <Image
              src={AddIcon}
              alt="Add new todo"
              fill
              className="object-contain"
            />
          </div>
        </button>
      )}

      <div className="flex flex-col gap-[16px] overflow-y-auto max-h-[100vh]">
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
