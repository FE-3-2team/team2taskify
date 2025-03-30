import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoCard from "@/components/common/TodoCard";

export default function SortableCard({
  card,
  columnId,
  index,
  onClick,
  lastCardRef,
}: {
  card: Card;
  columnId: number;
  index: number;
  onClick: () => void;
  lastCardRef?: (node: HTMLDivElement | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.cardId,
      data: { cardId: card.cardId, columnId, index },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (lastCardRef) lastCardRef(node);
      }}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TodoCard
        key={`${card.cardId}-${card.updatedAt}`}
        todoData={card}
        onClick={onClick}
      />
    </div>
  );
}
