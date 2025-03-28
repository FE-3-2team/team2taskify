import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";

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
  setEditCardId: (id: number) => void;
  setEditCardColumnId: (id: number) => void;
  setEditSelectedAssignee: (assignee: Assignee) => void;
  setEditCardTitle: (title: string) => void;
  setEditCardDescription: (desc: string) => void;
  setEditCardDueDate: (date: Date | null) => void;
  setEditCardTags: (tags: string[]) => void;
  setEditCardImageUrl: (url: string | null) => void;
  setEditCardImageFile: (file: File | null) => void;
}

export const useHandleEditCardClick = ({
  setIsEditCardModalOpen,
  setEditCardId,
  setEditCardColumnId,
  setEditSelectedAssignee,
  setEditCardTitle,
  setEditCardDescription,
  setEditCardDueDate,
  setEditCardTags,
  setEditCardImageUrl,
  setEditCardImageFile,
}: UseHandleEditCardClickParams) => {
  const handleEditCardClick = (card: Card) => {
    if (!card.assignee?.profileImageUrl) {
      alert("카드의 담당자가 없습니다.");
      return;
    }

    setEditCardId(card.id);
    setEditCardColumnId(card.columnId);
    setEditSelectedAssignee({
      id: card.assignee.id,
      userId: card.assignee.id,
      nickname: card.assignee.nickname,
      profileImageUrl: card.assignee.profileImageUrl ?? "",
    });
    setEditCardTitle(card.title);
    setEditCardDescription(card.description);
    setEditCardDueDate(card.dueDate ? new Date(card.dueDate) : null);
    setEditCardTags(card.tags || []);
    setEditCardImageUrl(card.imageUrl ?? null);
    setEditCardImageFile(null);
    setIsEditCardModalOpen(true);
  };

  return { handleEditCardClick };
};
