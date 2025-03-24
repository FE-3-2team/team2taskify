import { instance } from "./instance";

export async function getCards(columnId: number): Promise<Card[]> {
  try {
    const res = await instance.get(`/cards`, {
      params: { columnId },
    });

    console.log("getCards 응답 결과:", res.data);
    return res.data.cards;
  } catch (err) {
    throw new Error("카드 목록 조회 실패");
  }
}
