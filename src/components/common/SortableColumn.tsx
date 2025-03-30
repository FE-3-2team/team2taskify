import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "./Column";
import type { ColumnData } from "@/types/column";
import type { CardData } from "@/types/card";

interface Props {
  column: ColumnData;
  onAddCardClick: (columnId: number) => void;
  onManageColumnClick: (columnId: number, title: string) => void;
  onEditCardClick: (card: CardData) => void;
}

const SortableColumn = ({
  column,
  onAddCardClick,
  onManageColumnClick,
  onEditCardClick,
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
        columnId={column.id}
        title={column.title}
        cards={column.cards}
        onAddCardClick={onAddCardClick}
        onManageColumnClick={onManageColumnClick}
        onEditCardClick={onEditCardClick}
      />
    </div>
  );
};

export default SortableColumn;
