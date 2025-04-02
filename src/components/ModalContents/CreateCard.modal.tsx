import { Modal } from "@/components/common/ModalPopup";
import { useStore } from "zustand";
import useAuthStore from "@/utils/Zustand/zustand";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMember } from "@/api/member";
import { createCard } from "@/api/card.api";
import {
  CardData,
  INITIAL_ASSIGNEE,
  INITIAL_CARD,
} from "../common/Card/CardValues";
import CardValueForm from "../common/Card/card.form";
import DropdownAssigneeSearch from "../common/Dropdown/DropdownAssigneeSearch";
import PlusIcon from "@/assets/icons/Plus.icon.svg";
import Image from "next/image";

interface Props {
  columnId: number;
  setCurrentCards: Dispatch<SetStateAction<Card[]>>;
}
export default function CreateCard({ columnId, setCurrentCards }: Props) {
  const store = useStore(useAuthStore);
  const dashboardId = Number(store.dashboardId);
  const [currentAssignee, setCurrentAssignee] =
    useState<Assignee>(INITIAL_ASSIGNEE);
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD);
  const [members, setMembers] = useState<Assignee[]>([]);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    if (!dashboardId) return;
    try {
      const { members } = await getMember(1, Number(dashboardId));
      setMembers(members);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    if (!dashboardId) return;
    try {
      const newCard = await createCard({
        columnId,
        assigneeUserId: currentAssignee.userId,
        dashboardId,
        cardData,
      });
      setCurrentCards((prev) => [...prev, newCard]);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Modal
      className="bg-white border border-gray-300  rounded-[6px] mb-4 h-10"
      ModalOpenButton={
        <div className="relative w-[22px] h-[22px] rounded-[4px] object-contain bg-violet-100">
          <Image
            src={PlusIcon}
            alt="Add new todo"
            fill
            className="object-contain"
          />
        </div>
      }
      rightOnClick={handleCreate}
      rightHandlerText="생성"
    >
      <div className="flex flex-col w-full gap-6 tablet:gap-8">
        <h2 className="tablet:text-2xl-bold text-xl-bold">할 일 생성</h2>
        <DropdownAssigneeSearch
          assignee={currentAssignee}
          assignees={members}
          onClick={(value) => {
            setCurrentAssignee(value);
          }}
        />
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
