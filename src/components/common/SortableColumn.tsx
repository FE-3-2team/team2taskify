import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "./Column";
import type { ColumnData } from "@/types/column";
import { Dispatch, SetStateAction } from "react";

interface Props {
  column: ColumnData;
  onAddCardClick: (columnId: number) => void;
  onCardClick: (card: Card) => void;
  activeCard?: Card | null;
  setIsEditColumn: Dispatch<SetStateAction<boolean>>;
}

const SortableColumn = ({
  column,
  onAddCardClick,
  setIsEditColumn,
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
        setIsEditColumn={setIsEditColumn}
        onEditCardClick={onEditCardClick}
      />
    </div>
  );
};

export default SortableColumn;
