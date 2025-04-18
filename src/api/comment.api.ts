import { instance } from "./instance";

//댓글 생성 하기

interface Props {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export async function createComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: Props) {
  try {
    const res = await instance.post(`/comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });
    return res.data;
  } catch {
    throw new Error();
  }
}
//댓글 목록 조회

export async function getComments(
  size: number = 5,
  cardId: number,
  cursorId?: number
) {
  cursorId = cursorId === 0 ? undefined : cursorId;
  try {
    const res = await instance.get(`/comments`, {
      params: { size: size, cursorId: cursorId, cardId: cardId },
    });
    return res.data;
  } catch {
    throw new Error();
  }
}
//댓글 수정하기
export async function putComment(commentId: number, content: string) {
  try {
    const res = await instance.put(`/comments/${commentId}`, {
      content,
    });
    return res.data;
  } catch {
    throw new Error();
  }
}
//댓글 삭제 하기
export async function deleteComment(commentId: number) {
  try {
    const res = await instance.delete(`/comments/${commentId}`, {});
    const data = res.data;
  } catch {
    throw new Error();
  }
}
