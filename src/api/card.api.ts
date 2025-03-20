import { instance } from "./instance";
export async function getCards(commentId: number) {
  try {
    const res = await instance.delete(`/comments/${commentId}`, {});
    const data = res.data;
  } catch {
    throw new Error();
  }
}
