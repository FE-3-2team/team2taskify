import { instance } from "./instance";
//

interface Props {
  dashboardId?: number;
}
interface Data {
  title: string;
  color: string;
}
//대시보드 상세 조회

export async function getDashboardInfo(data: Data) {
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

//대시보드 삭제
export async function deleteDashboard(dashboardId: number) {
  try {
    const res = await instance.post("/dashboards", {
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
export async function editDashboard({ dashboardId, title, color }: editProps) {
  try {
    const res = await instance.put("/dashboards", {
      params: { dashboardId },
      title,
      color,
    });
    const { title: newTitle, color: newColor } = res.data;
    return { newTitle, newColor };
  } catch (error) {
    throw new Error("대시보드 삭제 실패");
  }
}

//대쉬보드 초대 불러오기

interface InvitationsProps extends Props {
  page: number;
  size: number;
}
export async function getDashboardInvitations({
  dashboardId,
  page,
  size = 5,
}: InvitationsProps) {
  try {
    const res = await instance.delete(
      `/dashboards/${dashboardId}/invitations`,
      { params: { page, size } }
    );
    return res.data;
  } catch (error) {
    throw new Error("대시보드 초대 취소 실패");
  }
}

//대시보드 초대 취소
export async function cancelInvite(dashboardId: number, invitationId: number) {
  try {
    const res = await instance.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`
    );
  } catch (error) {
    throw new Error("대시보드 초대 취소 실패");
  }
}
