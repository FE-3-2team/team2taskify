import { useState } from "react";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";

export interface EditCardData {
  cardId: number | null;
  columnId: number | null;
  assignee: Assignee | null;
  title: string;
  description: string;
  dueDate: Date | null;
  tags: string[];
  imageFile: File | null;
  imageUrl: string | null;
}

export default function useEditCardForm() {
  const [cardData, setCardData] = useState<EditCardData>({
    cardId: null,
    columnId: null,
    assignee: null,
    title: "",
    description: "",
    dueDate: null,
    tags: [],
    imageFile: null,
    imageUrl: null,
  });

  const resetEditCardForm = () => {
    setCardData({
      cardId: null,
      columnId: null,
      assignee: null,
      title: "",
      description: "",
      dueDate: null,
      tags: [],
      imageFile: null,
      imageUrl: null,
    });
  };

  const setEditedData = (partial: Partial<EditCardData>) => {
    setCardData((prev) => ({ ...prev, ...partial }));
  };

  return {
    cardData,
    setEditedData,
    resetEditCardForm,
  };
}
