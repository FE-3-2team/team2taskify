import { Modal } from "@/components/common/ModalPopup";
import CardForm from "@/components/forms/CardForm";
import DropdownProgress from "@/components/common/Dropdown/DropdownProgress";
import type { ColumnData } from "@/types/column";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  cardData: Card;
  setEditedData: (data: Partial<Card>) => void;
  members: Assignee[];
  columns: ColumnData[];
}

const EditCardModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onCancel,
  cardData,
  setEditedData,
  members,
  columns,
}: Props) => {
  const {
    columnId,
    title,
    description,
    dueDate,
    tags,
    imageFile,
    imageUrl,
    assignee,
  } = cardData;

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
        <h2 className="tablet:text-2xl-bold text-xl-bold mb-[32px]">
          할 일 수정
        </h2>

        <div className="w-full mb-[16px]">
          <DropdownProgress
            selectedTitle={
              columns.find((col) => col.id === columnId)?.title ?? ""
            }
            options={columns.map((col) => col.title)}
            onChange={(title) => {
              const selected = columns.find((col) => col.title === title);
              if (selected) {
                setEditedData({ columnId: selected.id });
              }
            }}
          />
        </div>

        <CardForm
          members={members}
          selectedAssignee={assignee}
          setSelectedAssignee={(a) => setEditedData({ assignee: a })}
          cardTitle={title}
          setCardTitle={(v) => setEditedData({ title: v })}
          cardDescription={description}
          setCardDescription={(v) => setEditedData({ description: v })}
          cardDueDate={dueDate}
          setCardDueDate={(v) => setEditedData({ dueDate: v })}
          cardTags={tags}
          setCardTags={(v) => {
            const nextTags = typeof v === "function" ? v(tags) : v;
            setEditedData({ tags: nextTags });
          }}
          cardImageFile={imageFile}
          setCardImageFile={(f) => setEditedData({ imageFile: f })}
          cardImageUrl={imageUrl}
          setCardImageUrl={(url) => setEditedData({ imageUrl: url })}
        />
      </div>
    </Modal>
  );
};

export default EditCardModal;
