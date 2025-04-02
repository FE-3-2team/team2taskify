import { Modal } from "@/components/common/ModalPopup";
import DropdownProgress from "@/components/common/Dropdown/DropdownProgress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { updateCard } from "@/api/card.api";
import { EditCardData, INITIAL_ASSIGNEE } from "../common/Card/CardValues";
import CardValueForm from "../common/Card/card.form";
import DropdownAssigneeSearch from "../common/Dropdown/DropdownAssigneeSearch";

interface Props {
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
  isCardEdit: boolean;
  cardId: number;
  columnId: number;
  columns: Column[];
  editCardId: number;
  editCardData: EditCardData;
  setCurrentCard: Dispatch<SetStateAction<Card[]>>;
  currentCards: Card[];
}
export default function EditCard({
  setIsCardEdit,
  isCardEdit,
  columnId,
  columns,
  cardId,
  editCardId,
  editCardData,
  setCurrentCard,
  currentCards,
}: Props) {
  const [cardData, setCardData] = useState(editCardData);
  const [currColId, setCurrColId] = useState(columnId);

  const handleCurrentCard = (updatedCard: Card) => {
    const targetCard = currentCards.filter(
      (card) => card.cardId !== editCardId
    );
    setCurrentCard([...targetCard, updatedCard]);
  };
  const handleEditSubmit = async () => {
    if (cardId !== editCardId) return;
    const updatedCard = await updateCard({
      cardId: editCardId,
      assignee: cardData.assignee,
      cardData,
      columnId: currColId,
    });
    handleCurrentCard(updatedCard);
  };
  if (columnId === 0) return null;
  return (
    <Modal
      ModalOpenButton={null}
      rightHandlerText="수정"
      rightOnClick={handleEditSubmit}
      isOpen={isCardEdit}
      setIsOpen={setIsCardEdit}
    >
      <div className="w-full">
        <h2 className="tablet:text-2xl-bold text-xl-bold mb-[32px]">
          할 일 수정
        </h2>
        <div className="w-full flex flex-col tablet:flex-row mb-[16px] tablet:pr-[54px] gap-[32px]">
          <DropdownProgress
            selectedTitle={
              columns.find((col) => col.id === columnId)?.title ?? ""
            }
            options={columns.map((col) => col.title)}
            onChange={(title) => {
              const selected = columns.find((col) => col.title === title);
              if (selected) {
                setCurrColId(selected.id);
              }
            }}
          />
          <DropdownAssigneeSearch
            assignee={editCardData.assignee}
            assignees={editCardData.members}
            onClick={(value) => {
              setCardData((prev) => ({ ...prev, assignee: value }));
            }}
          />
        </div>
        <CardValueForm
          onChange={(value) => {
            setCardData((prev) => ({ ...prev, ...value }));
          }}
          columnId={columnId}
          editCardData={editCardData}
        />
      </div>
    </Modal>
  );
}
