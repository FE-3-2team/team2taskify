import { createComment, getComments } from "@/api/comment.api";
import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import { Tags } from "../common/Chip/Tag.chip";
import Comments from "../common/Comments";
import DropdownEditDel from "../common/Dropdown/DropdownEditDel";
import UnifiedInput from "../common/Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCards } from "@/api/card.api";
//
interface Props {
  cardId: number;
  columnTitle: string;
  columnId: number;
}
//
export default function CardModal({ cardId, columnTitle, columnId }: Props) {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [card, setCard] = useState<Card>();
  const [currentComment, setCurrentComment] = useState<CardComment[]>([]);
  const [cursor, setCursor] = useState(1);

  const [newComment, setNewComment] = useState({
    content: "",
    cardId: cardId,
    columnId: columnId,
    dashboardId: Number(dashboardId),
  });

  useEffect(() => {
    if (dashboardId) {
      handleLoad();
    }
  }, [dashboardId]);
  //
  const handleLoad = async () => {
    if (!cardId) return;
    const cardData = await getCards(cardId);
    setCard(cardData);
    const { cursorId, comments } = await getComments(5, cursor, cardId);
    setCursor(cursorId);
    setCurrentComment(comments);
  };
  //
  const handleChangeNewComment = (value: string) => {
    setNewComment((prev) => ({
      ...prev,
      content: value,
    }));
  };
  const handleCreateComment = async () => {
    const createdComment = await createComment(newComment);
    setCurrentComment((prev) => [...prev, createdComment]);
    setNewComment((prev) => ({ ...prev, content: "" }));
  };
  const handleCardDelete = () => {};
  const handleCommentDelete = (id: number) => {
    const filteredComments = currentComment.filter(
      (comment) => comment.id !== id
    );
    setCurrentComment(filteredComments);
  };
  const handleEdit = () => {};
  return (
    <>
      {card ? (
        <div className="w-[327px] tablet:w-[678px] laptop:w-[730px] rounded-[8px] max-h-[500px] overflow-scroll">
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-6 ">
              <span className="text-xl-bold tablet:text-2xl-bold max-w-[420px]">
                {card.title}
              </span>
              <div className="flex items-center gap-4 tablet:gap-6">
                <DropdownEditDel
                  onDelete={handleCardDelete}
                  onEdit={handleEdit}
                />
                <div className="w-8 h-8" />
              </div>
            </div>
            <div className="mb-4 tablet:hidden">
              <AssigneeCard
                assigneeName={card.assignee.nickname}
                dueDate={card.dueDate}
                profileImageUrl={card.assignee.profileImageUrl}
              />
            </div>
            <div className="flex  tablet:gap-[13px] justify-between">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-4 mb-4 tablet:gap-5">
                  <Status value={columnTitle} />
                  <div className="w-[1px] bg-gray-300 h-[20px]" />
                  <Tags tags={card.tags} />
                </div>

                <p className="px-2 py-2 mb-2 text-xs-regular tablet:text-md-regular">
                  {card.description}
                </p>

                {card.imageUrl && (
                  <img
                    className="w-[290px] h-[168px] tablet:w-[420px] tablet:h-[246px] laptop:w-[445px] laptop:h-[260px] rounded-[6px]"
                    src={card.imageUrl}
                  />
                )}

                <div>
                  <UnifiedInput
                    label="댓글"
                    placeholder="댓글 작성하기"
                    variant="comment"
                    onChange={handleChangeNewComment}
                    value={newComment.content}
                    onSubmit={handleCreateComment}
                  />
                </div>

                <div>
                  {currentComment?.map((comment) => {
                    return (
                      <Comments
                        onClickDelete={handleCommentDelete}
                        comment={comment}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="hidden w-fit tablet:block">
                <AssigneeCard
                  assigneeName={card.assignee.nickname}
                  dueDate={card.dueDate}
                  profileImageUrl={card.assignee.profileImageUrl}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>헤헤 카드가 없어용 </div>
      )}
    </>
  );
}
