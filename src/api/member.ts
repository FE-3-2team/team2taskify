import { instance } from "./instance";
// 대시 보드 멤버 조회
export async function getMember(dashboardId: string) {
  try {
    const res = await instance.get(`/members`, {
      params: { dashboardId: dashboardId },
    });
    return res.data.members;
  } catch (error) {
    throw new Error("멤버 조회 실패");
  }
}
// 대시보드 멤버 삭제
export async function deleteMember(memberId: number) {
  if (memberId === 0) return;
  try {
    await instance.delete(`/members/${memberId}`);
  } catch (error) {
    throw new Error("멤버 삭제 실패");
  }
}
