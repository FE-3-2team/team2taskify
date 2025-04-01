import { deleteColumn, updateColumn } from "@/api/column.api";
import { Modal } from "@/components/common/ModalPopup";
import useDashboardStates from "@/hooks/useDashboardStates";
import { useFetchColumns } from "@/hooks/useFetchColumns";
import useAuthStore from "@/utils/Zustand/zustand";
import Image from "next/image";
import { useStore } from "zustand";
import GearIcon from "@/assets/icons/Edit.icon.svg";
import InputModal from "./InputModal";

type Props = {
  setTitle: (v: string) => void;
};

const ManageColumnModal = ({ setTitle }: Props) => {
  const authStore = useStore(useAuthStore);
  const dashboardId = Number(authStore.dashboardId);
  const states = useDashboardStates();

  const columnData = {
    id: states.targetColumnId!,
    title: states.targetColumnTitle,
  };
  const { fetchColumns } = useFetchColumns(
    states.setColumns,
    states.setIsLoading
  );

  const onDelete = async () => {
    const confirmDelete = confirm("정말 이 컬럼을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await deleteColumn(states.targetColumnId!);
      states.setIsManageColumnModalOpen(false);
      fetchColumns(Number(dashboardId));
      alert(`컬럼(${states.targetColumnId}) 삭제`);
    } catch (err) {
      console.error(err);
      alert("컬럼 삭제 실패");
    }
  };
  const onUpdate = async () => {
    try {
      await updateColumn({
        columnId: states.targetColumnId!,
        title: states.targetColumnTitle,
      });
      states.setIsManageColumnModalOpen(false);
      fetchColumns(Number(dashboardId));

      alert(
        `컬럼 (${states.targetColumnId}) 이름을 '${states.targetColumnTitle}'로 변경`
      );
    } catch (err) {
      alert(`컬럼 (${states.targetColumnId}) 이름 변경 실패`);
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
        defaultValue={columnData.title}
        changeValue={(value) => setTitle(value)}
        label="이름"
        placeholder="컬럼 이름을 입력해 주세요"
        variant="column"
      />
    </Modal>
  );
};

export default ManageColumnModal;
