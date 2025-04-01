import { Modal } from "@/components/common/ModalPopup";
import { useStore } from "zustand";
import useAuthStore from "@/utils/Zustand/zustand";
import { useEffect, useState } from "react";
import { getMember } from "@/api/member";
import { AlertModal } from "./AlertModal";
import { createCard } from "@/api/card.api";
import { CardData, INITIAL_CARD } from "../common/Card/CardValues";
import CardValueForm from "../common/Card/card.form";
import DropdownAssigneeSearch from "../common/Dropdown/DropdownAssigneeSearch";

interface Props {
  columnId: number;
}
export default function CreateCard({ columnId }: Props) {
  const store = useStore(useAuthStore);
  const dashboardId = Number(store.dashboardId);
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD);
  const [members, setMembers] = useState<Assignee[]>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    if (!dashboardId) return;
    try {
      const { members } = await getMember(1, Number(dashboardId));
      setMembers(members);
    } catch (err: any) {
      setMessage(err.response.data.message);
      setIsAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      await createCard({ dashboardId, columnId, cardData });
    } catch (err: any) {
      setMessage(err.response.data.message);
      setIsAlert(true);
    }
  };
  const handleChangeAssignee = (value: Assignee) => {
    setCardData((prev) => ({ ...prev, assignee: value }));
  };
  return (
    <Modal
      ModalOpenButton={<div>카드만들기</div>}
      rightOnClick={handleCreate}
      rightHandlerText="생성"
    >
      <div className="flex flex-col w-full gap-6 tablet:gap-8">
        <h2 className="tablet:text-2xl-bold text-xl-bold">할 일 생성</h2>
        <DropdownAssigneeSearch
          assignee={cardData.assignee}
          assignees={members}
          onSelect={(value) => handleChangeAssignee(value)}
        />
        <CardValueForm
          onChange={(value) => {
            setCardData((prev) => ({ ...prev, ...value }));
          }}
          columnId={columnId}
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
