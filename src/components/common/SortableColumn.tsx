import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "./Column";
import type { ColumnData } from "@/types/column";

interface Props {
  column: ColumnData;
  onAddCardClick: (columnId: number) => void;
  onManageColumnClick: (columnId: number, title: string) => void;
  onCardClick: (card: Card) => void;
  activeCard?: Card | null;
}

const SortableColumn = ({
  column,
  onAddCardClick,
  onManageColumnClick,
  onCardClick: onEditCardClick,
  activeCard,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Column
        column={column}
        onAddCardClick={onAddCardClick}
        onManageColumnClick={onManageColumnClick}
        onEditCardClick={onEditCardClick}
      />
    </div>
  );
};

export default SortableColumn;
