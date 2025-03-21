import { instance } from "./instance";
//

export async function getMember(dashboardId: number) {
  try {
    const res = await instance.get(`/members/${dashboardId}`);
    return res.data.members;
  } catch (error) {
    throw new Error("멤버 조회 실패");
  }
}
export async function deleteMember(memberId: number) {
  if (memberId === 0) return;
  try {
    await instance.delete(`/members/${memberId}`);
    //리스폰스 nonContent
  } catch (error) {
    throw new Error("멤버 삭제 실패");
  }
}
