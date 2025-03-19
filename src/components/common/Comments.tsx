import { Badge } from "./Badge";

interface Props {
  comment: Comment;
}

export default function Comments({ comment }: Props) {
  const { nickname, profileImageUrl } = comment.author;
  return (
    <div>
      <div className="">
        <Badge nickname={nickname} img={profileImageUrl} isComment />
      </div>
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
