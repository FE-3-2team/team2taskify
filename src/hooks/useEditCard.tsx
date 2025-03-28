import { useState } from "react";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";

export default function useEditCardForm() {
  const [editCardId, setEditCardId] = useState<number | null>(null);
  const [editCardColumnId, setEditCardColumnId] = useState<number | null>(null);
  const [editSelectedAssignee, setEditSelectedAssignee] =
    useState<Assignee | null>(null);
  const [editCardTitle, setEditCardTitle] = useState("");
  const [editCardDescription, setEditCardDescription] = useState("");
  const [editCardDueDate, setEditCardDueDate] = useState<Date | null>(null);
  const [editCardTags, setEditCardTags] = useState<string[]>([]);
  const [editCardImageFile, setEditCardImageFile] = useState<File | null>(null);
  const [editCardImageUrl, setEditCardImageUrl] = useState<string | null>(null);

  const resetEditCardForm = () => {
    setEditCardId(null);
    setEditCardColumnId(null);
    setEditSelectedAssignee(null);
    setEditCardTitle("");
    setEditCardDescription("");
    setEditCardDueDate(null);
    setEditCardTags([]);
    setEditCardImageFile(null);
    setEditCardImageUrl(null);
  };

  return {
    editCardId,
    setEditCardId,
    editCardColumnId,
    setEditCardColumnId,
    editSelectedAssignee,
    setEditSelectedAssignee,
    editCardTitle,
    setEditCardTitle,
    editCardDescription,
    setEditCardDescription,
    editCardDueDate,
    setEditCardDueDate,
    editCardTags,
    setEditCardTags,
    editCardImageFile,
    setEditCardImageFile,
    editCardImageUrl,
    setEditCardImageUrl,
    resetEditCardForm,
  };
}
