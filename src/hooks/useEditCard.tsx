import { useState } from "react";

export default function useEditCardForm() {
  const [cardData, setCardData] = useState<Card>({
    cardId: 0,
    columnId: 0,
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
      cardId: 0,
      columnId: 0,
      assignee: null,
      title: "",
      description: "",
      dueDate: null,
      tags: [],
      imageFile: null,
      imageUrl: null,
    });
  };

  const setEditedData = (partial: Partial<Card>) => {
    setCardData((prev) => ({ ...prev, ...partial }));
  };

  return {
    cardData,
    setEditedData,
    resetEditCardForm,
  };
}
