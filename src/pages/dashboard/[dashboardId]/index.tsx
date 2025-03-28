import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Column from "@/components/common/Column";
import Header from "@/components/common/Header";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";
import { SkeletonColumn } from "@/components/common/Skeleton";
import {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
  uploadCardImage,
} from "@/api/column.api";
import { getCards, updateCard } from "@/api/card.api";
import { getDashboardInfo } from "@/api/dashboard";
import { getMember } from "@/api/member";
import useCreateCard from "@/hooks/useCreateCard";
import CreateCardModal from "@/pages/dashboard/modals/CreateCardModal";
import ManageColumnModal from "@/pages/dashboard/modals/ManageColumnModal";
import AddColumnModal from "@/pages/dashboard/modals/AddColumnModal";
import useCardForm from "@/hooks/useCardForm";
import useColumnForm from "@/hooks/useColumnForm";
import EditCardModal from "@/pages/dashboard/modals/EditCardModal";
import { formatDateTime } from "@/utils/date";

type ColumnData = Column & { cards: Card[] };

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContentType, setModalContentType] = useState<
    "addColumn" | "editColumn" | null
  >(null);
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [editingCardid, setEditingCardId] = useState<number | null>(null);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<number | null>(null);
  const [targetColumnTitle, setTargetColumnTitle] = useState<string>("");
  const [members, setMembers] = useState<Assignee[]>([]);
  const [editCardId, setEditCardId] = useState<number | null>(null);
  const [editCardColumnId, setEditCardColumnId] = useState<number | null>(null);
  const [editSelectedAssignee, setEditSelectedAssignee] =
    useState<Assignee | null>(null);
  const [editCardTitle, setEditCardTitle] = useState("");
  const [editCardDescription, setEditCardDescription] = useState("");
  const [editCardDueDate, setEditCardDueDate] = useState<Date | null>(null);
  const [editCardTags, setEditCardTags] = useState<string[]>([]);
  const [editCardImageFile, setEditCardImageFile] = useState<File | null>(null);
  const [editCardImageUrl, setEditCardImageUrl] = useState<string | null>(null);

  const {
    cardTitle,
    setCardTitle,
    cardDescription,
    setCardDescription,
    cardDueDate,
    setCardDueDate,
    cardTags,
    setCardTags,
    cardImageFile,
    setCardImageFile,
    selectedAssignee,
    setSelectedAssignee,
    resetNewCardForm,
  } = useCardForm();

  const { newColumnTitle, setNewColumnTitle, resetNewColumnForm } =
    useColumnForm();

  const fetchColumns = async (pageId: string) => {
    try {
      setIsLoading(true);

      const dashboardInfo = await getDashboardInfo(pageId);
      const dashboardId = dashboardInfo.id;

      const columnList = await getColumns(String(dashboardId));

      setColumns([]);

      for (const col of columnList) {
        try {
          const cards = await getCards(col.id);

          setColumns((prev) => [...prev, { ...col, cards }]);
        } catch (err) {
          console.error(`컬럼 ${col.id}의 카드 로딩 실패`, err);
          setColumns((prev) => [...prev, { ...col, cards: [] }]);
        }
      }
    } catch (err) {
      console.error("컬럼 목록 로딩 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateColumn = async () => {
    if (!dashboardId || typeof dashboardId !== "string") return;
    if (!newColumnTitle.trim()) return;

    try {
      const createdColumn = await createColumn({
        title: newColumnTitle,
        dashboardId: Number(dashboardId),
      });

      setColumns((prev) => [...prev, { ...createdColumn, cards: [] }]);
      setNewColumnTitle("");
    } catch (err) {
      console.error("컬럼 생성 실패", err);
    }
  };

  const handleEditCardClick = (card: Card) => {
    if (!card.assignee) {
      alert("카드의 담당자가 없습니다.");
      return;
    }

    setEditingCardId(card.id);
    setEditCardId(card.id);
    setEditCardColumnId(card.columnId);
    setEditSelectedAssignee({
      id: card.assignee.id,
      userId: card.assignee.id,
      nickname: card.assignee.nickname,
      profileImageUrl: card.assignee.profileImageUrl,
    });
    setEditCardTitle(card.title);
    setEditCardDescription(card.description);
    setEditCardDueDate(card.dueDate ? new Date(card.dueDate) : null);
    setEditCardTags(card.tags || []);
    setEditCardImageUrl(card.imageUrl ?? null);
    setEditCardImageFile(null);
    setIsEditCardModalOpen(true);
  };

  const { createCard: submitCard } = useCreateCard();

  const resetEditCardForm = () => {
    setEditCardId(null);
    setEditCardColumnId(null);
    setEditSelectedAssignee(null);
    setEditCardTitle("");
    setEditCardDescription("");
    setEditCardDueDate(null);
    setEditCardTags([]);
    setEditCardImageFile(null);
    setEditCardImageUrl(null);
  };

  const handleEditCardSubmit = async () => {
    console.log("수정 시도");

    if (!editCardId) {
      console.error("editCardId is null");
      return;
    }
    if (!editCardColumnId) {
      console.error("editCardColumnId is null");
      return;
    }
    if (!editSelectedAssignee) {
      console.error("editSelectedAssignee is null");
      return;
    }

    let imageUrlToSubmit = editCardImageUrl;

    if (editCardImageFile) {
      try {
        const formData = new FormData();
        formData.append("image", editCardImageFile);

        const imageUrl = await uploadCardImage({
          columnId: editCardColumnId,
          imageFile: editCardImageFile,
        });

        imageUrlToSubmit = imageUrl;
      } catch (err) {
        alert("이미지 업로드 실패");
        return;
      }
    }

    try {
      await updateCard({
        cardId: editCardId,
        data: {
          columnId: editCardColumnId,
          assigneeUserId: editSelectedAssignee.userId,
          title: editCardTitle,
          description: editCardDescription,
          dueDate: editCardDueDate ? formatDateTime(editCardDueDate) : "",
          tags: editCardTags,
          imageUrl: imageUrlToSubmit ?? "",
        },
      });

      alert("카드가 수정되었습니다.");
      setIsEditCardModalOpen(false);
      resetEditCardForm();
      fetchColumns(String(dashboardId));
    } catch (err) {
      console.error(err);
      alert("카드 수정 실패");
    }
  };

  useEffect(() => {
    if (typeof dashboardId === "string") {
      fetchColumns(dashboardId);
    }
  }, [dashboardId]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!dashboardId || typeof dashboardId !== "string") return;
      try {
        const { members } = await getMember(1, Number(dashboardId), 20);
        const formatted = members.map((m: any) => ({
          id: m.id,
          userId: m.userId,
          nickname: m.nickname,
          profileImageUrl: m.profileImageUrl,
        }));
        setMembers(formatted);
      } catch (err) {
        console.error("멤버 조회 실패", err);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  return (
    <>
      <Header />
      <div className="flex desktop:flex-row flex-col desktop:items-start items-center tablet:h-[calc(100dvh_-_70px)] h-[calc(100dvh_-_60px)] w-full desktop:overflow-x-auto">
        {isLoading ? (
          <>
            <SkeletonColumn />
            <SkeletonColumn />
            <SkeletonColumn />
          </>
        ) : (
          columns.map((column) => {
            return (
              <Column
                key={column.id}
                title={column.title}
                cards={column.cards ?? []}
                columnId={column.id}
                onAddCardClick={(columnId) => {
                  setTargetColumnId(columnId);
                  setIsCreateCardModalOpen(true);
                }}
                onManageColumnClick={(columnId, title) => {
                  setTargetColumnId(columnId);
                  setTargetColumnTitle(title);
                  setIsManageColumnModalOpen(true);
                }}
                onEditCardClick={handleEditCardClick}
              />
            );
          })
        )}
        <div className="w-[308px] h-full bg-gray-100 px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-center">
          <div className="desktop:w-[314px] tablet:w-[544px] w-[284px] tablet:h-[70px] h-[66px] mt-[46px]">
            <AddColumnModal
              isOpen={modalContentType === "addColumn"}
              setIsOpen={(open) => {
                if (!open) {
                  setModalContentType(null);
                  resetNewColumnForm();
                }
              }}
              newColumnTitle={newColumnTitle}
              setNewColumnTitle={setNewColumnTitle}
              onCreateColumn={handleCreateColumn}
              onCancel={() => {
                setModalContentType(null);
                resetNewColumnForm();
              }}
            />
          </div>
        </div>
        <CreateCardModal
          isOpen={isCreateCardModalOpen}
          setIsOpen={(open) => {
            setIsCreateCardModalOpen(open);
            if (!open) resetNewCardForm();
          }}
          onSubmit={() =>
            submitCard({
              dashboardId: Number(dashboardId),
              targetColumnId: targetColumnId!,
              selectedAssignee: selectedAssignee!,
              cardTitle,
              cardDescription,
              cardDueDate,
              cardTags,
              cardImageFile,
            })
              .then(() => {
                setIsCreateCardModalOpen(false);
                resetNewCardForm();
                fetchColumns(String(dashboardId));
              })
              .catch(() => {
                alert("카드 생성 실패");
              })
          }
          onCancel={() => {
            setIsCreateCardModalOpen(false);
            resetNewCardForm();
          }}
          cardTitle={cardTitle}
          setCardTitle={setCardTitle}
          cardDescription={cardDescription}
          setCardDescription={setCardDescription}
          cardDueDate={cardDueDate}
          setCardDueDate={setCardDueDate}
          cardTags={cardTags}
          setCardTags={setCardTags}
          cardImageFile={cardImageFile}
          setCardImageFile={setCardImageFile}
          selectedAssignee={selectedAssignee}
          setSelectedAssignee={setSelectedAssignee}
          members={members}
        />
        <EditCardModal
          isOpen={isEditCardModalOpen}
          setIsOpen={(open) => {
            setIsEditCardModalOpen(open);
            if (!open) resetEditCardForm();
          }}
          onSubmit={handleEditCardSubmit}
          onCancel={() => {
            setIsEditCardModalOpen(false);
            resetEditCardForm();
          }}
          cardId={editCardId!}
          dashboardId={Number(dashboardId)}
          columnId={editCardColumnId!}
          selectedColumnId={editCardColumnId!}
          setSelectedColumnId={setEditCardColumnId}
          selectedAssignee={editSelectedAssignee}
          setSelectedAssignee={setEditSelectedAssignee}
          cardTitle={editCardTitle}
          setCardTitle={setEditCardTitle}
          cardDescription={editCardDescription}
          setCardDescription={setEditCardDescription}
          cardDueDate={editCardDueDate}
          setCardDueDate={setEditCardDueDate}
          cardTags={editCardTags}
          setCardTags={setEditCardTags}
          cardImageFile={editCardImageFile}
          setCardImageFile={setEditCardImageFile}
          cardImageUrl={editCardImageUrl}
          setCardImageUrl={setEditCardImageUrl}
          members={members}
          columns={columns}
        />

        {isManageColumnModalOpen && targetColumnId && (
          <ManageColumnModal
            isOpen={isManageColumnModalOpen}
            setIsOpen={(open) => {
              setIsManageColumnModalOpen(open);
              if (!open) {
                setTargetColumnId(null);
                setTargetColumnTitle("");
              }
            }}
            targetColumnId={targetColumnId}
            targetColumnTitle={targetColumnTitle}
            setTargetColumnTitle={setTargetColumnTitle}
            onUpdateColumn={async () => {
              try {
                await updateColumn({
                  columnId: targetColumnId,
                  title: targetColumnTitle,
                });
                setIsManageColumnModalOpen(false);
                fetchColumns(String(dashboardId));
                alert(
                  `컬럼 (${targetColumnId}) 이름을 '${targetColumnTitle}'로 변경`
                );
              } catch (err) {
                alert(`컬럼 (${targetColumnId}) 이름 변경 실패`);
              }
            }}
            onDeleteColumn={async () => {
              const confirmDelete = confirm("정말 이 컬럼을 삭제하시겠습니까?");
              if (!confirmDelete) return;
              try {
                await deleteColumn(targetColumnId);
                setIsManageColumnModalOpen(false);
                fetchColumns(String(dashboardId));
                alert(`컬럼(${targetColumnId}) 삭제`);
              } catch (err) {
                console.error(err);
                alert("컬럼 삭제 실패");
              }
            }}
          />
        )}
      </div>
    </>
  );
}
