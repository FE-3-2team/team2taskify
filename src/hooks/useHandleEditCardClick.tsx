interface UseHandleEditCardClickParams {
  setIsEditCardModalOpen: (open: boolean) => void;
  setEditedData: (partial: Partial<Card>) => void;
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
      cardId: card.cardId,
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
