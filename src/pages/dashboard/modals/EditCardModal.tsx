import { Dispatch, SetStateAction } from "react";
import "react-datepicker/dist/react-datepicker.css";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";
import { Modal } from "@/components/common/ModalPopup";
import CardForm from "@/components/forms/CardForm";
import { ColumnData } from "@/types/column";
import DropdownProgress from "@/components/common/Dropdown/DropdownProgress";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  cardId: number;
  dashboardId: number;
  columnId: number;
  selectedColumnId: number;
  setSelectedColumnId: (id: number) => void;
  selectedAssignee: Assignee | null;
  setSelectedAssignee: (a: Assignee | null) => void;
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
  cardImageUrl: string | null;
  setCardImageUrl: (url: string | null) => void;
  members: Assignee[];
  columns: ColumnData[];
}

const EditCardModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onCancel,
  cardId,
  selectedColumnId,
  setSelectedColumnId,
  selectedAssignee,
  setSelectedAssignee,
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
  cardImageUrl,
  setCardImageUrl,
  members,
  columns,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);
        if (!open) onCancel();
      }}
      ModalOpenButton={null}
      rightHandlerText="수정"
      leftHandlerText="취소"
      rightOnClick={onSubmit}
      leftOnClick={onCancel}
    >
      <div className="w-full">
        <h2 className="tablet:text-2xl-bold text-xl-bold mb-[20px]">
          할 일 수정
        </h2>

        <div className="w-full mb-[16px]">
          <DropdownProgress
            selectedTitle={
              columns.find((col) => col.id === selectedColumnId)?.title ?? ""
            }
            options={columns.map((col) => col.title)}
            onChange={(title) => {
              const selected = columns.find((col) => col.title === title);
              if (selected) {
                setSelectedColumnId(selected.id);
              }
            }}
          />
        </div>

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

export default EditCardModal;
