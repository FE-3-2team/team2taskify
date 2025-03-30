import { Modal } from "@/components/common/ModalPopup";
import CardForm from "@/components/forms/CardForm";
import DropdownProgress from "@/components/common/Dropdown/DropdownProgress";
import useDashboardStates from "@/hooks/useDashboardStates";
import { useEditCardSubmit } from "@/hooks/useEditCardSubmit";
import useEditCardForm from "@/hooks/useEditCard";
import { useStore } from "zustand";
import useAuthStore from "@/utils/Zustand/zustand";
import { useFetchColumns } from "@/hooks/useFetchColumns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMember } from "@/api/member";
import { getColumns } from "@/api/column.api";

interface Props {
  isCardEdit: boolean;
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
}
const EditCardModal = ({ isCardEdit, setIsCardEdit }: Props) => {
  const states = useDashboardStates();
  const { handleEditCardSubmit } = useEditCardSubmit();
  const { cardData, setEditedData, resetEditCardForm } = useEditCardForm();

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
  const store = useStore(useAuthStore);
  const { dashboardId } = store;
  const [members, setMembers] = useState<Assignee[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const onSubmit = () => {
    handleEditCardSubmit({
      editCardId: cardData.cardId!,
      editCardColumnId: cardData.columnId!,
      editSelectedAssignee: cardData.assignee!,
      editCardTitle: cardData.title,
      editCardDescription: cardData.description,
      editCardDueDate: cardData.dueDate,
      editCardTags: cardData.tags,
      editCardImageFile: cardData.imageFile,
      editCardImageUrl: cardData.imageUrl,
      fetchColumns,
      resetEditCardForm,
      dashboardId: Number(dashboardId),
      closeModal: () => states.setIsEditCardModalOpen(false),
    });
  };

  const { fetchColumns } = useFetchColumns(
    states.setColumns,
    states.setIsLoading
  );
  const memberLoad = async () => {
    const { members } = await getMember(1, Number(dashboardId));
    setMembers(members);
  };
  const columnsLoad = async () => {
    if (!dashboardId) return;
    const columnsData = await getColumns(Number(dashboardId));
    setColumns(columnsData);
  };

  useEffect(() => {
    if (!dashboardId) return;
    memberLoad();
    columnsLoad();
  }, [dashboardId]);
  return (
    <Modal
      ModalOpenButton={null}
      rightHandlerText="수정"
      rightOnClick={onSubmit}
      isOpen={isCardEdit}
      setIsOpen={setIsCardEdit}
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
