import { instance } from "./instance";
//

type Props = {
  dashboardId?: string;
};
interface Data {
  title: string;
  color: string;
}
//대시보드 생성
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
//대시보드 상세조회

export async function getDashboardInfo(dashboardId: string) {
  try {
    const res = await instance.get(`/dashboards/${dashboardId}`);
    const { title, color } = res.data;
    return { title, color };
  } catch (error) {
    throw new Error("대시보드 상세 조회 실패");
  }
}

//대시보드 삭제
export async function deleteDashboard(dashboardId: Props) {
  try {
    const res = await instance.delete("/dashboards", {
      params: { dashboardId },
    });
  } catch (error) {
    throw new Error("대시보드 삭제 실패");
  }
}

//대시 보드 수정//
interface editProps extends Props {
  title: string;
  color: string;
}
export async function editDashboard(dashboardData: editProps) {
  const { dashboardId, title, color } = dashboardData;
  console.log(dashboardId);
  try {
    const res = await instance.put(`/dashboards/${dashboardId}`, {
      title,
      color,
    });
    const { title: newTitle, color: newColor } = res.data;
    return { newTitle, newColor };
  } catch (error) {
    throw new Error("대시보드 수정 실패");
  }
}

//대쉬보드 초대 불러오기

interface InvitationsProps {
  getInvitation: {
    dashboardId: string;
    page: number;
    size?: number;
  };
}
export async function getDashboardInvitations({
  getInvitation,
}: InvitationsProps) {
  const { dashboardId, page, size } = getInvitation;
  try {
    const res = await instance.get(`/dashboards/${dashboardId}/invitations`, {
      params: { page, size },
    });
    return res.data;
  } catch (error) {
    throw new Error("대시보드 초대 취소 실패");
  }
}

//대시보드 초대 취소
export async function cancelInvite(dashboardId: string, invitationId: number) {
  try {
    const res = await instance.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`
    );
  } catch (error) {
    throw new Error("대시보드 초대 취소 실패");
  }
}
