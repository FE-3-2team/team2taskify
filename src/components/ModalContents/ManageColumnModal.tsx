import { deleteColumn, updateColumn } from "@/api/column.api";
import { Modal } from "@/components/common/ModalPopup";
import useDashboardStates from "@/hooks/useDashboardStates";
import { useFetchColumns } from "@/hooks/useFetchColumns";
import useAuthStore from "@/utils/Zustand/zustand";
import { Dispatch, SetStateAction } from "react";
import { useStore } from "zustand";

type Props = {
  isOpen: boolean;
  columnData: {
    id: number;
    title: string;
  };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTitle: (v: string) => void;
};

const ManageColumnModal = ({
  setIsOpen,
  isOpen,
  columnData,
  setTitle,
}: Props) => {
  const authStore = useStore(useAuthStore);
  const dashboardId = Number(authStore.dashboardId);
  const states = useDashboardStates();

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
      isOpen={isOpen}
      ModalOpenButton={null}
      rightHandlerText="변경"
      leftHandlerText="삭제"
      rightOnClick={onUpdate}
      leftOnClick={onDelete}
      setIsOpen={setIsOpen}
    >
      <div>
        <h2 className="tablet:text-2xl-bold text-xl-bold tablet:mb-[24px] mb-[16px]">
          컬럼 관리
        </h2>
        <p className="tablet:text-2lg-medium text-lg-medium mb-[8px]">이름</p>
        <input
          type="text"
          placeholder="컬럼 이름을 입력해주세요"
          className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
          value={columnData.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default ManageColumnModal;
