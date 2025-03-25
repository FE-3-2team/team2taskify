import { useFormatTime } from "@/hooks/useFormatDate";
import { Badge } from "./Badge";
import { ChangeEvent, useEffect, useState } from "react";
import { deleteComment, putComment } from "@/api/comment.api";

interface Props {
  comment: CardComment;
  onClickDelete: (id: number) => void;
}

export default function Comment({ comment, onClickDelete }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const { nickname, profileImageUrl } = comment.author;
  const [currentValue, setCurrentValue] = useState(comment.content);
  const { updatedAt, id } = comment;
  const formattedDate = useFormatTime(updatedAt);

  const handleEdit = async () => {
    if (isEdit && comment.content !== currentValue) {
      await putComment(id, currentValue);
    }
    setIsEdit(!isEdit);
  };
  const handleDelete = async () => {
    onClickDelete(id);
    await deleteComment(id);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  return (
    <div className="flex gap-[10px] px-2 py-2 max-h-">
      <div className="w-fit">
        <Badge nickname={nickname} img={profileImageUrl} type="comment" />
      </div>
      <div className="flex flex-col w-full gap-[6px]">
        <div className="flex items-center gap-2">
          <p className="text-md-semibold">{comment.author.nickname}</p>
          <p className="text-gray-400 text-xs-regular">{formattedDate}</p>
        </div>
        {isEdit ? (
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            type="textarea"
            value={currentValue}
            className="text-md-regular text-black-200 h-[40px] max-h-[80px] overflow-scroll border border-gray-300"
          />
        ) : (
          <p className="text-md-regular text-black-200 h-[40px] max-h-[80px] overflow-scroll">
            {currentValue}
          </p>
        )}
        <div className="flex gap-[14px]">
          <button
            onClick={handleEdit}
            className="text-gray-400 underline text-xs-regular"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 underline text-xs-regular"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
