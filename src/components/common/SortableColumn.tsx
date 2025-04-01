import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "./Column";
import type { ColumnData } from "@/types/column";
import { Dispatch, SetStateAction } from "react";

interface Props {
  column: ColumnData;
  onAddCardClick: (columnId: number) => void;
  onCardClick: (card: Card) => void;
  setIsEditColumn: Dispatch<SetStateAction<boolean>>;
}

const SortableColumn = ({
  column,
  onAddCardClick,
  setIsEditColumn,
  onCardClick: onEditCardClick,
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
      <Column column={column} onEditCardClick={onEditCardClick} />
    </div>
  );
};

export default SortableColumn;
