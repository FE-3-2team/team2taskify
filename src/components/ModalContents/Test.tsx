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
import { getCardDetail } from "@/api/card.api";
import { CardData, INITIAL_CARD } from "../common/Card/CardValues";
import CardValueForm from "../common/Card/card.form";
import DropdownAssigneeSearch from "../common/Dropdown/DropdownAssigneeSearch";

interface Props {
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
  isCardEdit: boolean;
  cardId: number;
}
export default function Test({ setIsCardEdit, isCardEdit, cardId }: Props) {
  const states = useDashboardStates();
  // const { handleEditCardSubmit } = useEditCardSubmit();
  const store = useStore(useAuthStore);
  const dashboardId = store.dashboardId;
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD);
  const [members, setMembers] = useState<Assignee[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  //수정에는 대시보드 아이디가 필요없음
  //컬럼들, 멤버들,
  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    if (!dashboardId) return;
    try {
      const { members } = await getMember(1, Number(dashboardId));
      setMembers(members);
      const columnsData = await getColumns(Number(dashboardId));
      setColumns(columnsData);
      const cardData = await getCardDetail(cardId);
      setCardData(cardData);
    } catch (err) {
      setMessage("카드 상세보기에 실패했습니다");
      setIsAlert(true);
    }
  };
  const { fetchColumns } = useFetchColumns(
    states.setColumns,
    states.setIsLoading
  );

  // const onSubmit = () => {
  //   handleEditCardSubmit({
  //     editCardId: cardData.cardId!,
  //     editCardColumnId: cardData.columnId!,
  //     editSelectedAssignee: cardData.assignee!,
  //     editCardTitle: cardData.title,
  //     editCardDescription: cardData.description,
  //     editCardDueDate: cardData.dueDate,
  //     editCardTags: cardData.tags,
  //     editCardImageFile: cardData.imageFile,
  //     editCardImageUrl: cardData.imageUrl,
  //     fetchColumns,
  //     resetEditCardForm,
  //     dashboardId: Number(dashboardId),
  //     closeModal: () => states.setIsEditCardModalOpen(false),
  //   });
  // };

  const handleEditSubmit = async () => {};
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

        <div className="w-full mb-[16px]">
          <DropdownProgress
            selectedTitle={
              columns.find((col) => col.id === cardData.columnId)?.title ?? ""
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
        <CardValueForm columnId={cardData.columnId} editCardData={cardData} />
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
}
