import { Modal } from "@/components/common/ModalPopup";
import DropdownProgress from "@/components/common/Dropdown/DropdownProgress";
import { useStore } from "zustand";
import useAuthStore from "@/utils/Zustand/zustand";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMember } from "@/api/member";
import { getColumns } from "@/api/column.api";
import { getCardDetail, updateCard } from "@/api/card.api";
import {
  CardData,
  INITIAL_ASSIGNEE,
  INITIAL_CARD,
} from "../common/Card/CardValues";
import CardValueForm from "../common/Card/card.form";
import DropdownAssigneeSearch from "../common/Dropdown/DropdownAssigneeSearch";

interface Props {
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
  isCardEdit: boolean;
  cardId: number;
  columnId: number;
}
export default function EditCard({
  setIsCardEdit,
  isCardEdit,
  columnId,
  cardId,
}: Props) {
  const store = useStore(useAuthStore);
  const dashboardId = store.dashboardId;
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD);
  const [members, setMembers] = useState<Assignee[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [currColId, setCurrColId] = useState(columnId);
  const [currentAssignee, setCurrentAssignee] =
    useState<Assignee>(INITIAL_ASSIGNEE);

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    console.log(cardData);
  }, [cardData]);
  const handleLoad = async () => {
    if (!dashboardId) return;
    try {
      const { members } = await getMember(1, Number(dashboardId));
      setMembers(members);
      const columnsData = await getColumns(Number(dashboardId));
      setColumns(columnsData);
      const currentCardData = await getCardDetail(cardId);
      setCurrentAssignee(currentCardData.assignee);
      setCardData(currentCardData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    await updateCard({
      cardId,
      assignee: currentAssignee,
      cardData,
      columnId: currColId,
    });
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
            assignee={currentAssignee}
            assignees={members}
            onClick={(value) => {
              setCurrentAssignee(value);
            }}
          />
        </div>
        <CardValueForm
          onChange={(value) => {
            setCardData((prev) => ({ ...prev, ...value }));
          }}
          columnId={columnId}
          editCardData={cardData}
        />
      </div>
    </Modal>
  );
}
