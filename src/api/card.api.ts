import { instance } from "./instance";
//카드 상세 조회
export async function getCardDetail(cardId: number) {
  try {
    const res = await instance.get(`/cards/${cardId}`);
    return res.data;
  } catch {
    throw new Error();
  }
}
//카드 목록 조회
export async function getCards(columnId: number): Promise<Card[]> {
  const res = await instance.get(`/cards`, {
    params: { columnId },
  });

  // console.log("getCards 응답 결과:", res.data);
  return res.data.cards;
}

//카드 삭제
export async function deleteCard(cardId: number) {
  try {
    await instance.delete(`/cards/${cardId}`);
  } catch {
    throw new Error();
  }
}

export async function createCard({
  dashboardId,
  columnId,
  assigneeUserId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  dashboardId: number;
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}) {
  try {
    const res = await instance.post("/cards", {
      dashboardId,
      columnId,
      assigneeUserId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    });
    return res.data;
  } catch (err) {
    throw new Error("카드 생성 실패");
  }
}

export async function updateCard({
  cardId,
  data,
}: {
  cardId: number;
  data: {
    columnId: number;
    assigneeUserId: number;
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl: string;
  };
}) {
  try {
    const res = await instance.put(`/cards/${cardId}`, data);
    return res.data;
  } catch (err) {
    throw new Error("카드 수정 실패");
  }
}

export async function moveCardToColumn({
  cardId,
  columnId,
}: {
  cardId: number;
  columnId: number;
}) {
  try {
    const res = await instance.put(`/cards/${cardId}`, { columnId });
    return res.data;
  } catch (err) {
    throw new Error("카드 칼럼 이동 실패");
  }
}
