interface Props {
  comments: Comment;
}

export default function Comments({ comments }: Props) {
  return (
    <div>
      <img src={comments.author.profileImageUrl} />
      <div>
        <div>
          <p>{comments.author.nickname}</p>
          <p>{comments.createdAt}</p>
        </div>
        {comments.content}
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
}
