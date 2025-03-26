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

    return res.data.cards;
  } catch (err) {
    throw new Error("카드 목록 조회 실패");
  }
}

export async function createCard({
  teamId,
  dashboardId,
  columnId,
  assigneeId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  teamId: string;
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
