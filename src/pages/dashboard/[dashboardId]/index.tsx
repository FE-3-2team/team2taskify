import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { SkeletonColumn } from "@/components/common/Skeleton/Skeleton";
import { createColumn } from "@/api/column.api";
import { moveCardToColumn } from "@/api/card.api";
import { PlusIconButton } from "@/components/common/Button";
import SortableColumn from "@/components/common/SortableColumn";
import TodoCard from "@/components/common/TodoCard";
import { useFetchColumns } from "@/hooks/useFetchColumns";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import InputModal from "@/components/ModalContents/InputModal";
import { Modal } from "@/components/common/ModalPopup";
import SideMenu from "@/components/common/SideMenu";
import { useRouter } from "next/router";
import { getDashboardInfo } from "@/api/dashboard";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [columnsData, setColumnsData] = useState<ColumnData[]>([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isDropEnd, setIsDropEnd] = useState(true);
  //

  useEffect(() => {
    if (!isDropEnd) return;
    if (dashboardId) {
      handleLoad();
    }
  }, [dashboardId, isDropEnd]);

  const handleLoad = async () => {
    await getDashboardInfo(Number(dashboardId));
    const { fetchColumns } = useFetchColumns(setColumnsData, setIsLoading);

    await fetchColumns(Number(dashboardId));
    setIsDropEnd(false);
  };

  //드래그앤 드랍 로직
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data?.current?.card) {
      setActiveCard(active.data.current.card);
      setIsDragging(true);
    }
  };

  //끝났을때

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setIsDragging(false);
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const activeCardId = active.id;
    const overCardId = over.id;

    const sourceColumn = columnsData.find((column) =>
      column.cards.some((card) => card.cardId === activeCardId)
    );
    const targetColumn = columnsData.find((column) =>
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

      const newColumns = columnsData.map((col) =>
        col.id === sourceColumn.id ? { ...col, cards: updatedCards } : col
      );
      setColumnsData(newColumns);
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

      const newColumns = columnsData.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, cards: newSourceCards };
        }
        if (col.id === targetColumn.id) {
          return { ...col, cards: newTargetCards };
        }
        return col;
      });

      setColumnsData(newColumns);

      try {
        await moveCardToColumn({
          cardId: activeCard.cardId,
          columnId: targetColumn.id,
        });
        setIsDropEnd(true);
      } catch (err) {
        console.error("❌ 카드 칼럼 이동 실패", err);
      }
    }
  };

  const handleCreateColumn = async () => {
    const title = newColumnTitle ? newColumnTitle : "새로운 컬럼";
    try {
      const createdColumn = await createColumn({
        title,
        dashboardId: Number(dashboardId),
      });
      setColumnsData((prev: any) => [...prev, { ...createdColumn, cards: [] }]);
    } catch (err) {
      console.error("컬럼 생성 실패", err);
    }
  };

  //드래그앤 드랍 로직 끝
  return (
    <>
      <Header />
      <SideMenu />
      <div className="flex laptop:flex-row flex-col  ml-[67px] tablet:ml-40 laptop:ml-[300px] tablet:h-[calc(100dvh_-_70px)] h-[calc(100dvh_-_60px)]  laptop:overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columnsData}
            strategy={horizontalListSortingStrategy}
          >
            {isLoading ? (
              <>
                <SkeletonColumn />
                <SkeletonColumn />
                <SkeletonColumn />
              </>
            ) : (
              columnsData.map((column: any) => {
                return <SortableColumn key={column.id} column={column} />;
              })
            )}
          </SortableContext>

          <DragOverlay>
            {activeCard && (
              <div
                style={{
                  opacity: isDragging ? 0.5 : 1,
                }}
              >
                <TodoCard todoData={activeCard} />
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
                changeValue={(value) => setNewColumnTitle(value)}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
