import { deleteColumn, updateColumn } from "@/api/column.api";
import { Modal } from "@/components/common/ModalPopup";
import Image from "next/image";
import GearIcon from "@/assets/icons/Edit.icon.svg";
import InputModal from "./InputModal";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  title: string;
  columnId: number;
  setCurrentTitle: Dispatch<SetStateAction<string>>;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
};

const ManageColumnModal = ({
  title,
  columnId,
  setCurrentTitle,
  setIsDeleted,
}: Props) => {
  const [newTitle, setNewTitle] = useState(title);

  const onDelete = async () => {
    const confirmDelete = confirm("정말 이 컬럼을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await deleteColumn(columnId);
      setIsDeleted(true);
    } catch (err) {
      alert("컬럼 삭제 실패");
    }
  };
  const onUpdate = async () => {
    try {
      await updateColumn(columnId, newTitle);
      setCurrentTitle(newTitle);
    } catch (err) {
      alert(`컬럼 이름 변경 실패`);
    }
  };
  return (
    <Modal
      className="tablet:w-[24px] bg-white tablet:h-[24px] w-[22px] h-[22px] relative"
      ModalOpenButton={
        <Image src={GearIcon} alt="Setting" fill className="object-contain" />
      }
      rightHandlerText="변경"
      leftHandlerText="삭제"
      rightOnClick={onUpdate}
      leftOnClick={onDelete}
    >
      <InputModal
        title="컬럼 관리"
        defaultValue={newTitle}
        changeValue={(value) => setNewTitle(value)}
        label="이름"
        placeholder="컬럼 이름을 입력해 주세요"
        variant="column"
      />
    </Modal>
  );
};

export default ManageColumnModal;
