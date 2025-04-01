import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/common/Header";
import { SkeletonColumn } from "@/components/common/Skeleton/Skeleton";
import { createColumn, updateColumn, deleteColumn } from "@/api/column.api";
import { moveCardToColumn } from "@/api/card.api";
import CreateCardModal from "@/components/ModalContents/CreateCardModal";
import ManageColumnModal from "@/components/ModalContents/ManageColumnModal";
import { PlusIconButton } from "@/components/common/Button";
import SortableColumn from "@/components/common/SortableColumn";
import TodoCard from "@/components/common/TodoCard";
import CardModal from "@/components/ModalContents/Card.modal";
import useCardForm from "@/hooks/useCardForm";
import useColumnForm from "@/hooks/useColumnForm";
import { useFetchColumns } from "@/hooks/useFetchColumns";
import useEditCardForm from "@/hooks/useEditCard";
import { useEditCardSubmit } from "@/hooks/useEditCardSubmit";
import { useHandleEditCardClick } from "@/hooks/useHandleEditCardClick";
import useDashboardStates from "@/hooks/useDashboardStates";
import { useInitializeDashboard } from "@/hooks/useInitializeDashboard";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  useDndMonitor,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import InputModal from "@/components/ModalContents/InputModal";
import { Modal, DetailContent } from "@/components/common/ModalPopup";
import EditCardModal from "@/components/ModalContents/EditCardModal";

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const router = useRouter();
  const { dashboardId } = router.query;
  const states = useDashboardStates();

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
  const { handleEditCardSubmit } = useEditCardSubmit();

  const sensors = useSensors(useSensor(PointerSensor));
  const columnIds = states.columns.map((col) => col.id);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data?.current?.card) {
      setActiveCard(active.data.current.card);
      setIsDragging(true);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setIsDragging(false);
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const activeCardId = active.id;
    const overCardId = over.id;

    const sourceColumn = states.columns.find((column) =>
      column.cards.some((card) => card.cardId === activeCardId)
    );

    const targetColumn = states.columns.find((column) =>
      column.cards.some((card) => card.cardId === overCardId)
    );

    if (!sourceColumn || !targetColumn) return;

    const activeCard = sourceColumn.cards.find(
      (card) => card.cardId === activeCardId
    );
    if (!activeCard) return;

    if (sourceColumn.id === targetColumn.id) {
      const updatedCards = [...sourceColumn.cards];
      const oldIndex = updatedCards.findIndex(
        (card) => card.cardId === activeCardId
      );
      const newIndex = updatedCards.findIndex(
        (card) => card.cardId === overCardId
      );

      updatedCards.splice(oldIndex, 1);
      updatedCards.splice(newIndex, 0, activeCard);

      const newColumns = states.columns.map((col) =>
        col.id === sourceColumn.id ? { ...col, cards: updatedCards } : col
      );

      states.setColumns(newColumns);
    } else {
      const sourceCards = [...sourceColumn.cards];
      const targetCards = [...targetColumn.cards];

      const newSourceCards = sourceCards.filter(
        (card) => card.cardId !== activeCardId
      );

      const overIndex = targetCards.findIndex(
        (card) => card.cardId === overCardId
      );

      const newTargetCards = [...targetCards];
      newTargetCards.splice(overIndex, 0, activeCard);

      const newColumns = states.columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, cards: newSourceCards };
        }
        if (col.id === targetColumn.id) {
          return { ...col, cards: newTargetCards };
        }
        return col;
      });

      states.setColumns(newColumns);

      try {
        await moveCardToColumn({
          cardId: activeCard.cardId,
          columnId: targetColumn.id,
        });
      } catch (err) {
        console.error("❌ 카드 칼럼 이동 실패", err);
      }
    }
  };

  const handleCreateColumn = async () => {
    if (!dashboardId || isNaN(Number(dashboardId))) {
      return;
    }

    if (!newColumnTitle.trim()) {
      return;
    }

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

  useInitializeDashboard({
    dashboardId:
      typeof dashboardId === "string" ? Number(dashboardId) : undefined,
    fetchColumns,
    setMembers: states.setMembers,
  });

  useEffect(() => {}, [states.isCardDetailModalOpen, states.selectedCard]);
  useEffect(() => {
    if (!states.isCreateCardModalOpen) {
      resetNewCardForm();
    }
  }, [states.isCreateCardModalOpen]);

  return (
    <>
      <Header />
      <div className="flex desktop:flex-row flex-col desktop:items-start items-center tablet:h-[calc(100dvh_-_70px)] h-[calc(100dvh_-_60px)] w-full desktop:overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
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
                    onCardClick={(card) => {
                      states.setSelectedCard(card);
                      states.setTargetCardId(card.cardId);
                      states.setTargetCardColumnId(column.id);
                      states.setTargetCardColumnTitle(column.title);
                      states.setIsCardDetailModalOpen(true);
                    }}
                    activeCard={activeCard}
                  />
                );
              })
            )}
          </SortableContext>

          <DragOverlay>
            {activeCard && (
              <div
                style={{
                  opacity: isDragging ? 0.5 : 1,
                  border: isOver ? "2px dashed #aaa" : "none",
                }}
              >
                <TodoCard todoData={activeCard} onClick={() => {}} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
        <div className="w-[308px] h-full bg-gray-100 px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-center">
          <div className="desktop:w-[314px] tablet:w-[544px] w-[284px] tablet:h-[70px] h-[66px] mt-[46px]">
            <Modal
              rightHandlerText="생성"
              rightOnClick={handleCreateColumn}
              className="bg-white border-gray-300 text-2lg-bold border-[1px]"
              variant={isDuplicate ? "disabled" : "primary"}
              ModalOpenButton={
                <div className="flex items-center gap-[12px] cursor-pointer text-black-400 text-lg-bold tablet:text-2lg-bold">
                  새로운 컬럼 추가하기
                  <PlusIconButton />
                </div>
              }
            >
              <InputModal
                dashboardId={Number(dashboardId)}
                isColumn
                setError={setIsDuplicate}
                label="컬럼 이름"
                placeholder=""
                title="새 컬럼 생성"
                variant="column"
                changeValue={setNewColumnTitle}
              />
            </Modal>
          </div>
        </div>

        {states.isCardDetailModalOpen && states.selectedCard && (
          <DetailContent
            cardId={states.selectedCard.cardId}
            columnId={states.selectedCard.columnId}
            cardTitle={states.selectedCard.title}
            ModalOpenButton={null}
            setIsCardEdit={states.setIsEditCardModalOpen}
            isOpen={states.isCardDetailModalOpen}
            setIsOpen={states.setIsCardDetailModalOpen}
          >
            <CardModal
              cardId={states.selectedCard.cardId}
              columnId={states.selectedCard.columnId}
              columnTitle={states.targetCardColumnTitle}
            />
          </DetailContent>
        )}

        <EditCardModal
          isCardEdit={states.isEditCardModalOpen}
          setIsCardEdit={(open) => {
            states.setIsEditCardModalOpen(open);
            if (!open) resetEditCardForm();
          }}
          selectedCard={states.selectedCard}
        />

        <CreateCardModal
          key={states.isCreateCardModalOpen ? "open" : "closed"}
          isOpen={states.isCreateCardModalOpen}
          setIsOpen={(open) => {
            states.setIsCreateCardModalOpen(open);
            if (!open) resetNewCardForm();
          }}
          members={states.members}
          targetColumnId={states.targetColumnId!}
          resetNewCardForm={resetNewCardForm}
          fetchColumns={fetchColumns}
        />

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
