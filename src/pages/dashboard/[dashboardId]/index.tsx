import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Column from "@/components/common/Column";
import Header from "@/components/common/Header";
import { Modal } from "@/components/common/ModalPopup";
import { PlusIconButton } from "@/components/common/Button";
import DropdownAssigneeSearch from "@/components/common/Dropdown/DropdownAssigneeSearch";
import TagInputField from "@/components/common/TagInputField";
import { getColumns, createColumn, uploadCardImage } from "@/api/column.api";
import { getCards, createCard } from "@/api/card.api";
import { getDashboardInfo } from "@/api/dashboard";
import { getMember } from "@/api/member";
import CalendarIcon from "@/assets/icons/Calendar.svg";
import ImageUploadBox from "@/components/common/ImageUploadBox";

interface ColumnData {
  id: number;
  title: string;
  cards: Card[];
}

interface ColumnWithCards extends Column {
  cards: Card[];
}

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;

  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContentType, setModalContentType] = useState<
    "addColumn" | "invite" | null
  >(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<number | null>(null);
  const [assigneeList, setAssigneeList] = useState<Assignee[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(
    null
  );
  const [members, setMembers] = useState<Assignee[]>([]);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardDueDate, setCardDueDate] = useState<Date | null>(null);
  const [cardTags, setCardTags] = useState<string[]>([]);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string>("");

  const fetchColumns = async (pageId: string) => {
    try {
      setIsLoading(true);

      const dashboardInfo = await getDashboardInfo(pageId);
      const dashboardId = dashboardInfo.id;

      const columnList = await getColumns(String(dashboardId));

      const columnsWithCards: ColumnWithCards[] = await Promise.all(
        columnList.map(async (col): Promise<ColumnWithCards> => {
          const cards = await getCards(col.id);

          return { ...col, cards };
        })
      );

      setColumns(columnsWithCards);
    } catch (err) {
      console.error("컬럼 또는 카드 로딩 실패", err);
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

  const handleSelectAssignee = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
    console.log("[선택된 담당자]", assignee);
  };

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const datePickerRef = useRef<any>(null);

  const handleUploadImage = async (): Promise<string | null> => {
    const columnId = targetColumnId;

    console.log("[이미지 업로드 시도]", {
      dashboardId,
      targetColumnId,
      cardImageFile,
    });

    if (!dashboardId || !targetColumnId || !cardImageFile) {
      console.warn("[이미지 업로드 중단] 필수값 없음", {
        dashboardId,
        targetColumnId,
        cardImageFile,
      });
      return null;
    }

    try {
      const imageUrl = await uploadCardImage({
        columnId: targetColumnId,
        imageFile: cardImageFile,
      });

      console.log("[이미지 업로드 성공]", imageUrl);
      return imageUrl;
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      return null;
    }
  };

  const handleCreateCard = async () => {
    console.log("[카드 생성 시작]");

    let uploadedImageUrl = "";

    if (
      !dashboardId ||
      !targetColumnId ||
      !selectedAssignee ||
      !cardTitle.trim()
    ) {
      console.warn("[필수값 누락]", {
        dashboardId,
        targetColumnId,
        selectedAssignee,
        cardTitle,
      });
      alert("필수 항목을 입력해주세요.");
      return;
    }

    try {
      if (cardImageFile) {
        uploadedImageUrl = await handleUploadImage();
        console.log("[업로드된 이미지 URL]", uploadedImageUrl);
      }

      console.log("[카드 생성 요청 데이터]", {
        assigneeId: selectedAssignee.userId,
        dashboardId: Number(dashboardId),
        columnId: targetColumnId,
        title: cardTitle,
        description: cardDescription,
        dueDate: cardDueDate ? formatDateTime(cardDueDate) : "",
        tags: cardTags,
        imageUrl: uploadedImageUrl,
      });

      const newCard = await createCard({
        dashboardId: Number(dashboardId),
        columnId: targetColumnId,
        assigneeId: selectedAssignee.id,
        title: cardTitle,
        description: cardDescription,
        dueDate: cardDueDate ? formatDateTime(cardDueDate) : "",
        tags: cardTags,
        imageUrl: uploadedImageUrl,
      });

      console.log("[카드 생성 성공]", newCard);

      setCardTitle("");
      setCardDescription("");
      setCardDueDate(null);
      setCardTags([]);
      setCardImageFile(null);
      setCardImageUrl("");
      setSelectedAssignee(null);
      setIsCreateCardModalOpen(false);

      await fetchColumns(String(dashboardId));
    } catch (err) {
      console.error("카드 생성 실패:", err);
    }

    console.log("카드 생성 요청:", {
      assigneeId: selectedAssignee.userId,
      dashboardId: Number(dashboardId),
      columnId: targetColumnId,
      title: cardTitle,
      description: cardDescription,
      dueDate: cardDueDate ? formatDateTime(cardDueDate) : "",
      tags: cardTags,
      imageUrl: uploadedImageUrl,
    });
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
        console.log("[멤버 목록 로드됨]", formatted);
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
          <p>불러오는 중...</p>
        ) : (
          columns.map((column) => {
            return (
              <Column
                key={column.id}
                title={column.title}
                cards={column.cards ?? []}
                columnId={column.id}
                onAddCardClick={(columnId) => {
                  console.log("[카드 추가 버튼 클릭] columnId:", columnId);
                  setTargetColumnId(columnId);
                  setIsCreateCardModalOpen(true);
                }}
              />
            );
          })
        )}
        <div className="w-[308px] h-full bg-gray-100 px-[12px] py-[16px] tablet:w-[584px] desktop:w-[354px] flex flex-col items-center">
          <div className="desktop:w-[314px] tablet:w-[544px] w-[284px] tablet:h-[70px] h-[66px] mt-[46px]">
            <Modal
              ModalOpenButton={
                <div
                  className="flex items-center gap-[12px]"
                  onClick={() => setModalContentType("addColumn")}
                >
                  새로운 컬럼 추가하기 <PlusIconButton />
                </div>
              }
              rightHandlerText="생성"
              rightOnClick={handleCreateColumn}
              leftHandlerText="취소"
              leftOnClick={() => {
                setModalContentType(null);
                setNewColumnTitle("");
              }}
            >
              <div>
                <h2 className="tablet:text-2xl-bold text-xl-bold tablet:mb-[24px] mb-[16px]">
                  새 컬럼 생성
                </h2>
                <p className="tablet:text-2lg-medium text-lg-medium mb-[8px]">
                  이름
                </p>
                <input
                  type="text"
                  placeholder="컬럼 이름을 입력해주세요"
                  className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                />
              </div>
            </Modal>
          </div>
        </div>
        {isCreateCardModalOpen && targetColumnId && (
          <Modal
            isOpen={isCreateCardModalOpen}
            setIsOpen={setIsCreateCardModalOpen}
            ModalOpenButton={null}
            rightHandlerText="생성"
            leftHandlerText="취소"
            rightOnClick={async () => {
              await handleCreateCard();
            }}
            leftOnClick={() => setIsCreateCardModalOpen(false)}
          >
            <div>
              <h2 className="tablet:text-2xl-bold text-xl-bold">할 일 생성</h2>
              <div className="w-full h-fit py-[24px] gap-[24px] flex flex-col items-start">
                <div className="w-full">
                  <DropdownAssigneeSearch
                    assignees={members}
                    onSelect={handleSelectAssignee}
                  />
                </div>
                <div className="w-full">
                  <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
                    제목
                  </p>
                  <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
                    value={cardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
                    설명
                  </p>
                  <input
                    type="text"
                    placeholder="설명을 입력해주세요"
                    className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
                    value={cardDescription}
                    onChange={(e) => setCardDescription(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
                    마감일
                  </p>
                  <div
                    className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200 flex items-center gap-[8px]"
                    onClick={() => datePickerRef.current?.setOpen(true)}
                  >
                    <div className="tablet:w-[18px] tablet:h-[18px] w-[14px] h-[14px] relative">
                      <Image
                        src={CalendarIcon}
                        alt="calendar"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <DatePicker
                      selected={cardDueDate}
                      onChange={(date) => {
                        if (date) setCardDueDate(date);
                      }}
                      dateFormat="yyyy-MM-dd hh:mm"
                      placeholderText="날짜를 선택해주세요"
                      showTimeSelect
                      ref={datePickerRef}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
                    태그
                  </p>
                  <TagInputField tags={cardTags} setTags={setCardTags} />
                </div>
                <div className="w-full">
                  <ImageUploadBox
                    imageFile={cardImageFile}
                    previewUrl={cardImageUrl}
                    onChangeImage={(file, preview) => {
                      setCardImageFile(file);
                      setCardImageUrl(preview);
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
