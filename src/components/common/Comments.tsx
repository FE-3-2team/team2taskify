import { Badge } from "./Badge";

interface Props {
  comment: Comment;
}

export default function Comment({ comment }: Props) {
  return (
    <div>
      {}
      <img src={comment.author.profileImageUrl} />

      <div>
        <div>
          <p>{comment.author.nickname}</p>
          <p>{comment.createdAt}</p>
        </div>
        {comment.content}
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
}
