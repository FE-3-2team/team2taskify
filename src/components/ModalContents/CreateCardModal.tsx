import { useState } from "react";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@/components/common/ModalPopup";
import CardForm from "@/components/forms/CardForm";
import useCardForm from "@/hooks/useCardForm";
import useCreateCard from "@/hooks/useCreateCard";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  members: Assignee[];
  targetColumnId: number;
  resetNewCardForm: () => void;
  fetchColumns: (dashboardId: number) => void;
};

const CreateCardModal = ({
  isOpen,
  setIsOpen,
  members,
  targetColumnId,
  resetNewCardForm,
  fetchColumns,
}: Props) => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);

  const {
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
  } = useCardForm();

  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const { createCard } = useCreateCard();

  const handleClose = () => {
    setIsOpen(false);
    resetNewCardForm();
  };

  const handleSubmit = async () => {
    try {
      await createCard({
        dashboardId: Number(dashboardId),
        targetColumnId,
        selectedAssignee: selectedAssignee!,
        cardTitle,
        cardDescription,
        cardDueDate,
        cardTags,
        cardImageFile,
      });

      handleClose();
      fetchColumns(dashboardId);
    } catch (err) {
      alert("카드 생성 실패");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);
        if (!open) handleClose();
      }}
      ModalOpenButton={null}
      rightHandlerText="생성"
      leftHandlerText="취소"
      rightOnClick={handleSubmit}
      leftOnClick={handleClose}
    >
      <div>
        <h2 className="tablet:text-2xl-bold text-xl-bold mb-[20px]">
          할 일 생성
        </h2>
        <CardForm
          members={members}
          selectedAssignee={selectedAssignee}
          setSelectedAssignee={setSelectedAssignee}
          cardTitle={cardTitle}
          setCardTitle={setCardTitle}
          cardDescription={cardDescription}
          setCardDescription={setCardDescription}
          cardDueDate={cardDueDate}
          setCardDueDate={setCardDueDate}
          cardTags={cardTags}
          setCardTags={setCardTags}
          cardImageFile={cardImageFile}
          setCardImageFile={setCardImageFile}
          cardImageUrl={cardImageUrl}
          setCardImageUrl={setCardImageUrl}
        />
      </div>
    </Modal>
  );
};

export default CreateCardModal;
