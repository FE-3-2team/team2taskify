import { instance } from "./instance";
// 대시 보드 멤버 조회
export async function getMember(
  page: number,
  dashboardId: number,
  size: number = 4
) {
  const res = await instance.get(`/members`, {
    params: { size: size, page: page, dashboardId: dashboardId },
  });
  return res.data;
}
// 대시보드 멤버 삭제
export async function deleteMember(memberId: number) {
  if (memberId === 0) return;
  await instance.delete(`/members/${memberId}`);
}
