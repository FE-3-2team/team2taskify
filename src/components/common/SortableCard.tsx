import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoCard from "@/components/common/TodoCard";
import DropIndicator from "@/components/common/DropIndicator";

export default function SortableCard({
  card,
  columnId,
  index,
  lastCardRef,
}: {
  card: Card;
  columnId: number;
  index: number;
  lastCardRef?: (node: HTMLDivElement | null) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({
    id: card.cardId,
    data: { cardId: card.cardId, columnId, index, card },
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
    >
      {isOver && !isDragging && <DropIndicator />}

      <TodoCard
        key={`${card.cardId}-${card.updatedAt}`}
        todoData={card}
        listeners={listeners}
      />
    </div>
  );
}
