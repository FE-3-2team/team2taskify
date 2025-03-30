import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoCard from "@/components/common/TodoCard";

export default function SortableCard({
  card,
  onClick,
}: {
  card: CardData;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoCard
        key={`${card.id}-${card.updatedAt}`}
        todoData={card}
        onClick={onClick}
      />
    </div>
  );
}
