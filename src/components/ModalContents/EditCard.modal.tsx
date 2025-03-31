import { Modal } from "@/components/common/ModalPopup";
import DropdownProgress from "@/components/common/Dropdown/DropdownProgress";
import { useStore } from "zustand";
import useAuthStore from "@/utils/Zustand/zustand";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMember } from "@/api/member";
import { getColumns } from "@/api/column.api";
import { AlertModal } from "./AlertModal";
import { getCardDetail, updateCard } from "@/api/card.api";
import { CardData, INITIAL_CARD } from "../common/Card/CardValues";
import CardValueForm from "../common/Card/card.form";
import DropdownAssigneeSearch from "../common/Dropdown/DropdownAssigneeSearch";

interface Props {
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
  isCardEdit: boolean;
  cardId: number;
}
export default function EditCard({ setIsCardEdit, isCardEdit, cardId }: Props) {
  const store = useStore(useAuthStore);
  const dashboardId = store.dashboardId;
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD);
  const [members, setMembers] = useState<Assignee[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  //수정에는 대시보드 아이디가 필요없음
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
      setMessage("카드 수정 시도에 실패했습니다");
      setIsAlert(true);
    }
  };

  const handleEditSubmit = async () => {
    await updateCard({ cardId, cardData });
  };

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
              columns.find((col) => col.id === cardData.columnId)?.title ?? ""
            }
            options={columns.map((col) => col.title)}
            onChange={(title) => {
              const selected = columns.find((col) => col.title === title);
              if (selected) {
                setCardData((prev) => ({ ...prev, columnId: selected.id }));
              }
            }}
          />
          <DropdownAssigneeSearch
            assignee={cardData.assignee}
            assignees={members}
            onSelect={(value) => {
              setCardData((prev) => ({ ...prev, assignee: value }));
            }}
          />
        </div>
        <CardValueForm
          onChange={(value) => {
            setCardData((prev) => ({ ...prev, ...value }));
          }}
          columnId={cardData.columnId}
          editCardData={cardData}
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
}
