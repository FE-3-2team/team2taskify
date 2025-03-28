import { Dispatch, SetStateAction, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";
import { Modal } from "@/components/common/ModalPopup";
import CardForm from "@/components/forms/CardForm";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  cardTitle: string;
  setCardTitle: (v: string) => void;
  cardDescription: string;
  setCardDescription: (v: string) => void;
  cardDueDate: Date | null;
  setCardDueDate: (v: Date | null) => void;
  cardTags: string[];
  setCardTags: Dispatch<SetStateAction<string[]>>;
  cardImageFile: File | null;
  setCardImageFile: (file: File | null) => void;
  selectedAssignee: Assignee | null;
  setSelectedAssignee: (a: Assignee | null) => void;
  members: Assignee[];
};

const CreateCardModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onCancel,
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
  members,
}: Props) => {
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);
        if (!open) onCancel();
      }}
      ModalOpenButton={null}
      rightHandlerText="생성"
      leftHandlerText="취소"
      rightOnClick={onSubmit}
      leftOnClick={onCancel}
    >
      <div>
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
