import { useState } from "react";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";

const useCardFrom = () => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardDueDate, setCardDueDate] = useState<Date | null>(null);
  const [cardTags, setCardTags] = useState<string[]>([]);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(
    null
  );

  const resetNewCardForm = () => {
    setCardTitle("");
    setCardDescription("");
    setCardDueDate(null);
    setCardTags([]);
    setCardImageFile(null);
    setSelectedAssignee(null);
  };

  return {
    cardTitle,
    setCardTitle,
    cardDescription,
    setCardDescription,
    cardDueDate,
    setCardDueDate,
    cardTags,
    setCardTags,
    cardImageFile,
    setCardImageFile,
    selectedAssignee,
    setSelectedAssignee,
    resetNewCardForm,
  };
};

export default useCardFrom;
