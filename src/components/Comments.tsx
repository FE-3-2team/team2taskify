import { useEffect, useRef, useState } from "react";
import Comment from "./common/Comment.card";
import { createComment, getComments } from "@/api/comment.api";
import UnifiedInput from "./common/Input";
import useAuthStore from "@/utils/Zustand/zustand";
import { useStore } from "zustand";

interface Props {
  cardId: number;
  columnId: number;
}
export default function CommentsArea({ cardId, columnId }: Props) {
  const store = useStore(useAuthStore);
  const [cursor, setCursor] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [currentComment, setCurrentComment] = useState<CardComment[]>([]);
  const [newComment, setNewComment] = useState({
    content: "",
    cardId: cardId,
    columnId: columnId,
    dashboardId: Number(store.dashboardId),
  });
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleLoad = async () => {
    const { cursorId, comments } = await getComments(5, cardId, cursor);
    setCursor(cursorId);
    setCurrentComment((prev) => [...prev, ...comments]);
  };
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);
      });
    };
    const moreComment = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
      rootMargin: "300px",
    });

    if (endRef.current) {
      moreComment.observe(endRef.current);
    }
    if (cursor === 0 || cursor) {
      if (!isIntersecting) return;
      handleLoad();
    }
    return () => {
      if (endRef.current) {
        moreComment.unobserve(endRef.current);
      }
    };
  }, [isIntersecting]);

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
  const handleCommentDelete = (id: number) => {
    const filteredComments = currentComment.filter(
      (comment) => comment.id !== id
    );
    setCurrentComment(filteredComments);
  };
  return (
    <>
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
      {currentComment?.map((comment) => {
        return (
          <Comment onClickDelete={handleCommentDelete} comment={comment} />
        );
      })}
      <div className="h-[100px]" ref={endRef}></div>
    </>
  );
}
