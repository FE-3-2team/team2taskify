import { CardData } from "@/components/common/Card/CardValues";
import { instance } from "./instance";
import { useFormatTime } from "@/hooks/useFormatDate";
const DEFAULT_IMG = process.env.NEXT_PUBLIC_DEFAULT_IMG;
//카드 상세 조회
export async function getCardDetail(cardId: number) {
  const res = await instance.get(`/cards/${cardId}`);
  return res.data;
}
//카드 목록 조회
export async function getCards(columnId: number): Promise<Card[]> {
  const res = await instance.get(`/cards`, {
    params: { columnId },
  });

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
  assigneeUserId: number;
}
export async function createCard({
  columnId,
  dashboardId,
  cardData,
  assigneeUserId,
}: CreateCardProps) {
  console.log(columnId, dashboardId, cardData);
  const { title, description, dueDate, tags, imageUrl } = cardData;
  const formattedDate = useFormatTime(dueDate);
  const filteredImg = imageUrl === "" ? DEFAULT_IMG : imageUrl;
  const res = await instance.post("/cards", {
    dashboardId,
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate: formattedDate,
    tags,
    imageUrl: filteredImg,
  });
  return res.data;
}

//카드 수정
interface Props {
  cardId: number;
  cardData: CardData;
  columnId: number;
  assignee: Assignee;
}
export async function updateCard({
  columnId,
  assignee,
  cardId,
  cardData,
}: Props) {
  const { title, description, dueDate, tags, imageUrl } = cardData;
  const filteredImg = imageUrl === "" ? DEFAULT_IMG : imageUrl;

  const formattedDate = useFormatTime(dueDate);
  const res = await instance.put(`/cards/${cardId}`, {
    columnId,
    assignee,
    title,
    description,
    dueDate: formattedDate,
    tags,
    imageUrl: filteredImg,
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
