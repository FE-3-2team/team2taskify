import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/common/Header";
import { SkeletonColumn } from "@/components/common/Skeleton/Skeleton";
import { createColumn, updateColumn, deleteColumn } from "@/api/column.api";
import CreateCardModal from "@/components/ModalContents/CreateCardModal";
import ManageColumnModal from "@/components/ModalContents/ManageColumnModal";
import AddColumnModal from "@/components/ModalContents/AddColumnModal";
import useCardForm from "@/hooks/useCardForm";
import useColumnForm from "@/hooks/useColumnForm";
import EditCardModal from "@/components/ModalContents/EditCardModal";
import { useFetchColumns } from "@/hooks/useFetchColumns";
import useEditCardForm from "@/hooks/useEditCard";
import { useEditCardSubmit } from "@/hooks/useEditCardSubmit";
import { useHandleEditCardClick } from "@/hooks/useHandleEditCardClick";
import useDashboardStates from "@/hooks/useDashboardStates";
import { useInitializeDashboard } from "@/hooks/useInitializeDashboard";
import { PlusIconButton } from "@/components/common/Button";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableColumn from "@/components/common/SortableColumn";
import { Dispatch, SetStateAction } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const states = useDashboardStates();

  const sensors = useSensors(useSensor(PointerSensor));
  const columnIds = states.columns.map((col) => col.id);
  const handleDragEnd = (event: DragEndEvent) => {};

  const { resetNewCardForm } = useCardForm();

  const { cardData, setEditedData, resetEditCardForm } = useEditCardForm();

  const { handleEditCardClick } = useHandleEditCardClick({
    setIsEditCardModalOpen: states.setIsEditCardModalOpen,
    setEditedData,
  });

  const { newColumnTitle, setNewColumnTitle, resetNewColumnForm } =
    useColumnForm();

  const { fetchColumns } = useFetchColumns(
    states.setColumns,
    states.setIsLoading
  );

  const handleCreateColumn = async () => {
    if (!dashboardId || typeof dashboardId !== "number") return;
    if (!newColumnTitle.trim()) return;

    try {
      const createdColumn = await createColumn({
        title: newColumnTitle,
        dashboardId: Number(dashboardId),
      });

      states.setColumns((prev: any) => [
        ...prev,
        { ...createdColumn, cards: [] },
      ]);
      setNewColumnTitle("");
    } catch (err) {
      console.error("컬럼 생성 실패", err);
    }
  };

  const { handleEditCardSubmit } = useEditCardSubmit();

  useInitializeDashboard({
    dashboardId:
      typeof dashboardId === "string" ? Number(dashboardId) : undefined,
    fetchColumns,
    setMembers: states.setMembers,
  });

  return (
    <>
      <Header />
      <div className="flex desktop:flex-row flex-col desktop:items-start items-center tablet:h-[calc(100dvh_-_70px)] h-[calc(100dvh_-_60px)] w-full desktop:overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columnIds}
            strategy={horizontalListSortingStrategy}
          >
            {states.isLoading ? (
              <>
                <SkeletonColumn />
                <SkeletonColumn />
                <SkeletonColumn />
              </>
            ) : (
              states.columns.map((column: any) => {
                return (
                  <SortableColumn
                    key={column.id}
                    column={column}
                    onAddCardClick={(columnId) => {
                      states.setTargetColumnId(columnId);
                      states.setIsCreateCardModalOpen(true);
                    }}
                    onManageColumnClick={(columnId, title) => {
                      states.setTargetColumnId(columnId);
                      states.setTargetColumnTitle(title);
                      states.setIsManageColumnModalOpen(true);
                    }}
                    onEditCardClick={handleEditCardClick}
                  />
                );
              })
            )}
          </SortableContext>
        </DndContext>
        <div className="w-[308px] h-full bg-gray-100 px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-center">
          <div className="desktop:w-[314px] tablet:w-[544px] w-[284px] tablet:h-[70px] h-[66px] mt-[46px]">
            <AddColumnModal
              ModalOpenButton={
                <div className="flex items-center gap-[12px] cursor-pointer text-black-400 text-lg-bold tablet:text-2lg-bold">
                  새로운 컬럼 추가하기
                  <PlusIconButton />
                </div>
              }
              isOpen={states.modalContentType === "addColumn"}
              setIsOpen={(open) => {
                states.setModalContentType(open ? "addColumn" : null);
                if (!open) resetNewColumnForm();
              }}
              newColumnTitle={newColumnTitle}
              setNewColumnTitle={setNewColumnTitle}
              onCreateColumn={handleCreateColumn}
              onCancel={() => {
                states.setModalContentType(null);
                resetNewColumnForm();
              }}
            />
          </div>
        </div>
        <CreateCardModal
          isOpen={states.isCreateCardModalOpen}
          setIsOpen={states.setIsCreateCardModalOpen}
          members={states.members}
          targetColumnId={states.targetColumnId!}
          resetNewCardForm={resetNewCardForm}
          fetchColumns={fetchColumns}
        />

        {/*<EditCardModal
          isCardEdit={states.isEditCardModalOpen}
          setIsCardEdit={
            ((open: boolean | ((prev: boolean) => boolean)) => {
              const value =
                typeof open === "function"
                  ? open(states.isEditCardModalOpen)
                  : open;
              states.setIsEditCardModalOpen(value);
              if (!value) resetEditCardForm();
            }) as Dispatch<SetStateAction<boolean>>
          }
        />*/}

        <ManageColumnModal
          isOpen={states.isManageColumnModalOpen}
          setIsOpen={(open) => {
            states.setIsManageColumnModalOpen(open);
            if (!open) states.setTargetColumnTitle("");
          }}
          columnData={{
            id: states.targetColumnId!,
            title: states.targetColumnTitle,
          }}
          setTitle={states.setTargetColumnTitle}
          onUpdate={async () => {
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
          }}
          onDelete={async () => {
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
          }}
        />
      </div>
    </>
  );
}
