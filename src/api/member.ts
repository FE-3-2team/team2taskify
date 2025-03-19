import { instance } from "./instance";
//
export async function deleteMember(memberId: number) {
  if (memberId === 0) return;
  try {
    await instance.delete(`/members/${memberId}`);
    //리스폰스 nonContent
  } catch (error) {
    throw new Error("멤버 삭제 실패");
  }
}
