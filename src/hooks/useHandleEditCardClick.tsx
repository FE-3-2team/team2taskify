import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";
import type { EditCardData } from "@/hooks/useEditCard";

interface Card {
  id: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl?: string | null;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  } | null;
}

interface UseHandleEditCardClickParams {
  setIsEditCardModalOpen: (open: boolean) => void;
  setEditedData: (partial: Partial<EditCardData>) => void;
}

export const useHandleEditCardClick = ({
  setIsEditCardModalOpen,
  setEditedData,
}: UseHandleEditCardClickParams) => {
  const handleEditCardClick = (card: Card) => {
    if (!card.assignee) {
      alert("카드의 담당자가 없습니다.");
      return;
    }

    setEditedData({
      cardId: card.id,
      columnId: card.columnId,
      title: card.title,
      description: card.description,
      dueDate: card.dueDate ? new Date(card.dueDate) : null,
      tags: card.tags ?? [],
      imageUrl: card.imageUrl ?? null,
      imageFile: null,
      assignee: {
        id: card.assignee.id,
        userId: card.assignee.id,
        nickname: card.assignee.nickname,
        profileImageUrl: card.assignee.profileImageUrl ?? "",
      },
    });

    setIsEditCardModalOpen(true);
  };

  return { handleEditCardClick };
};
