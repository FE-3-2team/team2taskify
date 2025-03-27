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
  try {
    const res = await instance.get(`/cards`, {
      params: { columnId },
    });

    // console.log("getCards 응답 결과:", res.data);
    return res.data.cards;
  } catch (err) {
    throw new Error("카드 목록 조회 실패");
  }
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
  assigneeId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  dashboardId: number;
  columnId: number;
  assigneeId: number;
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
      assigneeId,
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
