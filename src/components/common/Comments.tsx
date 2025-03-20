import { useFormatTime } from "@/hooks/useFormatDate";
import { Badge } from "./Badge";
import { useState } from "react";
import { deleteComment } from "@/api/comment";

/**ToDo
 * input 부분 나중에 바꾸기
 */
interface Props {
  comment: CardComment;
}

export default function Comments({ comment }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const { nickname, profileImageUrl } = comment.author;
  const { updatedAt, id } = comment;
  const formattedDate = useFormatTime(updatedAt);
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleDelete = async () => {
    await deleteComment(id);
  };

  return (
    <div className="flex gap-[10px] px-2 ">
      <div className="w-fit">
        <Badge nickname={nickname} img={profileImageUrl} type="comment" />
      </div>
      <div className="flex flex-col w-full gap-[6px]">
        <div className="flex items-center gap-2">
          <p className="text-md-semibold">{comment.author.nickname}</p>
          <p className="text-gray-400 text-xs-regular">{formattedDate}</p>
        </div>
        {isEdit ? (
          <input type="textarea" value={comment.content}></input>
        ) : (
          <p className="text-md-regular text-black-200 max-h-[80px] overflow-scroll">
            {comment.content}
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
