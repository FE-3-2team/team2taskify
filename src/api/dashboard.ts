import { instance } from "./instance";
//
interface Data {
  title: string;
  color: string;
}
export async function createDashboard(data: Data) {
  const { title, color } = data;
  try {
    const res = await instance.post("/dashboards", {
      title,
      color,
    });
    return res.data;
  } catch (error) {
    throw new Error("대시보드 생성 실패");
  }
}

export async function cancleInvite(dashboardId: number, invitationId: number) {
  try {
    const res = await instance.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`
    );
  } catch (error) {
    throw new Error("초대 취소 실패");
  }
}
