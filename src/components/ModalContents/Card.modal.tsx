import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import { Tags } from "../common/Chip/Tag.chip";
import Comments from "../common/Comments";
import DropdownEditDel from "../common/Dropdown/DropdownEditDel";
import UnifiedInput from "../common/Input";
import { useState } from "react";
//
interface Props {
  card: Card;
  columnTitle: string;
  comments?: CardComment[];
}
//
export default function CardModal({ card, columnTitle, comments }: Props) {
  const [newComment, setNewComment] = useState("");
  const { dueDate, assignee } = card;
  const createComment = (value: string) => {
    setNewComment(value);
  };
  const handleDelete = () => {};
  const handleEdit = () => {};
  return (
    <div className="w-[327px] tablet:w-[678px] laptop:w-[730px]  rounded-[8px] max-h-[800px] overflow-scroll">
      <div className="flex flex-col">
        <div className="flex items-start justify-between mb-6 ">
          <span className="text-xl-bold tablet:text-2xl-bold max-w-[420px]">
            {card.title}
          </span>
          <div className="flex items-center gap-4 tablet:gap-6">
            <DropdownEditDel onDelete={handleDelete} onEdit={handleEdit} />
            <div className="w-8 h-8" />
          </div>
        </div>
        <div className="mb-4 tablet:hidden">
          <AssigneeCard
            assigneeName={assignee.nickname}
            dueDate={dueDate}
            profileImageUrl={assignee.profileImageUrl}
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
                onChange={createComment}
                value={newComment}
              />
            </div>

            <div>
              {comments?.map((comment) => {
                return <Comments comment={comment} />;
              })}
            </div>
          </div>
          <div className="hidden w-fit tablet:block">
            <AssigneeCard
              assigneeName={assignee.nickname}
              dueDate={dueDate}
              profileImageUrl={assignee.profileImageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
