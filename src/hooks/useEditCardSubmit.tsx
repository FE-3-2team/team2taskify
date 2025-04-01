import { uploadCardImage } from "@/api/column.api";
import { updateCard } from "@/api/card.api";
import { formatDateTime } from "@/utils/date";

interface Params {
  editCardId: number;
  editCardColumnId: number;
  editSelectedAssignee: Assignee;
  editCardTitle: string;
  editCardDescription: string;
  editCardDueDate: Date | null;
  editCardTags: string[];
  editCardImageFile: File | null;
  editCardImageUrl: string | null;
  fetchColumns: (pageId: number) => void;
  resetEditCardForm: () => void;
  dashboardId: number;
  closeModal: () => void;
}

export const useEditCardSubmit = () => {
  const handleEditCardSubmit = async ({
    editCardId,
    editCardColumnId,
    editSelectedAssignee,
    editCardTitle,
    editCardDescription,
    editCardDueDate,
    editCardTags,
    editCardImageFile,
    editCardImageUrl,
    fetchColumns,
    resetEditCardForm,
    dashboardId,
    closeModal,
  }: Params) => {
    const assigneeUserId =
      editSelectedAssignee.userId ?? editSelectedAssignee.id;

    if (!editCardId) {
      console.error("editCardId is null");
      return;
    }
    if (!editCardColumnId) {
      console.error("editCardColumnId is null");
      return;
    }
    if (!editSelectedAssignee) {
      console.error("editSelectedAssignee is null");
      return;
    }

    let imageUrlToSubmit = editCardImageUrl;

    if (editCardImageFile) {
      try {
        const formData = new FormData();
        formData.append("image", editCardImageFile);

        const imageUrl = await uploadCardImage({
          columnId: editCardColumnId,
          imageFile: editCardImageFile,
        });

        imageUrlToSubmit = imageUrl;
      } catch (err) {
        alert("이미지 업로드 실패");
        return;
      }
    }

    try {
      await updateCard({
        cardId: editCardId,
        data: {
          columnId: editCardColumnId,
          assigneeUserId,
          title: editCardTitle,
          description: editCardDescription,
          dueDate: editCardDueDate
            ? formatDateTime(new Date(editCardDueDate))
            : "",
          tags: editCardTags,
          imageUrl: imageUrlToSubmit ?? "",
        },
      });

      alert("카드가 수정되었습니다.");
      closeModal();
      resetEditCardForm();
      window.location.reload();
      //fetchColumns(Number(dashboardId));
    } catch (err) {
      console.log("📤 카드 수정 제출", {
        cardId: editCardId,
        columnId: editCardColumnId,
        assigneeUserId,
        title: editCardTitle,
        description: editCardDescription,
        dueDate: editCardDueDate,
        tags: editCardTags,
        imageUrl: imageUrlToSubmit,
      });

      console.error(err);
      alert("카드 수정 실패");
    }
  };

  return { handleEditCardSubmit };
};
