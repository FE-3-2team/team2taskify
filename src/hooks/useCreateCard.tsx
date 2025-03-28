import { useState } from "react";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";
import { uploadCardImage } from "@/api/column.api";
import { createCard } from "@/api/card.api";
import { formatDateTime } from "@/utils/date";
import createInvisibleImageFile from "@/utils/createInvisibleImageFile";

interface Params {
  dashboardId: number;
  targetColumnId: number;
  selectedAssignee: Assignee | null;
  cardTitle: string;
  cardDescription: string;
  cardDueDate: Date | null;
  cardTags: string[];
  cardImageFile: File | null;
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

export default function useCreateCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const create = async ({
    dashboardId,
    targetColumnId,
    selectedAssignee,
    cardTitle,
    cardDescription,
    cardDueDate,
    cardTags,
    cardImageFile,
    onSuccess,
    onError,
  }: Params) => {
    if (
      !dashboardId ||
      !targetColumnId ||
      !selectedAssignee ||
      !cardTitle.trim()
    ) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedImageUrl = "";

      const imageToUpload = cardImageFile ?? createInvisibleImageFile();

      uploadedImageUrl = await uploadCardImage({
        columnId: targetColumnId,
        imageFile: imageToUpload,
      });

      const newCard = await createCard({
        dashboardId,
        columnId: targetColumnId,
        assigneeUserId: selectedAssignee.userId,
        title: cardTitle,
        description: cardDescription,
        dueDate: cardDueDate ? formatDateTime(cardDueDate) : "",
        tags: cardTags,
        imageUrl: uploadedImageUrl,
      });

      onSuccess?.();
      return newCard;
    } catch (err) {
      onError?.(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createCard: create, isSubmitting };
}
