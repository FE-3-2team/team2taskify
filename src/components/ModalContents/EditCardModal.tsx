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
import { AlertModal } from "./AlertModal";

console.log("🚩 EditCardModal 렌더됨");

interface Props {
  isCardEdit: boolean;
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
  selectedCard: Card | null;
}

const EditCardModal = ({ isCardEdit, setIsCardEdit, selectedCard }: Props) => {
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
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");

  const { fetchColumns } = useFetchColumns(
    states.setColumns,
    states.setIsLoading
  );
  const handleLoad = async () => {
    if (!dashboardId) return;

    try {
      const { members } = await getMember(1, Number(dashboardId));
      setMembers(members);
      const columnsData = await getColumns(Number(dashboardId));
      setColumns(columnsData);

      // Assignee 지정
      if (!cardData.assignee && members.length > 0) {
        setEditedData({ assignee: members[0] });
      }
    } catch (err) {
      setMessage("카드 상세보기에 실패했습니다");
      setIsAlert(true);
    }
  };

  useEffect(() => {
    console.log("🧑‍🤝‍🧑 members from API:", members);
    console.log(
      "🧑‍💻 selected assignee id:",
      selectedCard?.assignee?.userId ?? selectedCard?.assignee?.id
    );
    handleLoad();
  }, []);

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

  useEffect(() => {
    if (!selectedCard) return;

    const patchedAssignee = selectedCard.assignee
      ? {
          ...selectedCard.assignee,
          userId:
            selectedCard.assignee.userId ??
            selectedCard.assignee.id ??
            undefined,
        }
      : null;

    console.log("🐛 selectedCard:", selectedCard);

    console.log("🧪 selectedCard.assignee", selectedCard.assignee);

    setEditedData({
      cardId: selectedCard.cardId,
      columnId: selectedCard.columnId,
      title: selectedCard.title,
      description: selectedCard.description,
      dueDate: selectedCard.dueDate,
      tags: selectedCard.tags,
      assignee: patchedAssignee,
      imageUrl: selectedCard.imageUrl,
      imageFile: undefined,
    });
    console.log("🧪 selectedCard 받음", selectedCard);

    handleLoad();
  }, [selectedCard]);

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
        <AlertModal
          isOpen={isAlert}
          onConfirm={() => {
            setIsAlert(false);
          }}
          message={message}
        />
      </div>
    </Modal>
  );
};

export default EditCardModal;
