import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "./Column";
import { Dispatch, SetStateAction } from "react";

interface Props {
  column: ColumnData;
  setIsEditColumn: Dispatch<SetStateAction<boolean>>;
}

const SortableColumn = ({ column, setIsEditColumn }: Props) => {
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
      <Column column={column} setIsEditColumn={setIsEditColumn} />
    </div>
  );
};

export default SortableColumn;
