import { CardData } from "@/components/common/Card/CardValues";
import { instance } from "./instance";
import { useFormatTime } from "@/hooks/useFormatDate";
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

//카드 생성
interface CreateCardProps {
  dashboardId: number;
  columnId: number;
  cardData: CardData;
}
export async function createCard({
  dashboardId,
  columnId,
  cardData,
}: CreateCardProps) {
  const { assignee, title, description, dueDate, tags, imageUrl } = cardData;
  const formattedDate = useFormatTime(dueDate);

  const res = await instance.post("/cards", {
    dashboardId,
    columnId,
    assigneeUserId: assignee.id,
    title,
    description,
    dueDate: formattedDate,
    tags,
    imageUrl,
  });
  return res.data;
}

interface Props {
  cardId: number;
  cardData: CardData;
}
export async function updateCard({ cardId, cardData }: Props) {
  const { columnId, assignee, title, description, dueDate, tags, imageUrl } =
    cardData;
  console.log(dueDate);
  const formattedDate = useFormatTime(dueDate);
  console.log(formattedDate);
  const res = await instance.put(`/cards/${cardId}`, {
    columnId,
    assignee: assignee.id,
    title,
    description,
    dueDate: formattedDate,
    tags,
    imageUrl,
  });

  return res.data;
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
