import useAuthStore from "@/utils/Zustand/zustand";
import { instance } from "./instance";
//

type Props = {
  dashboardId?: string;
};

//대시보드 생성
export async function createDashboard(title: string, color: string) {
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
//대시보드 목록 조회
export async function getDashboards(page: number, size = 5) {
  try {
    const res = await instance.get(`/dashboards`, {
      params: { navigationMethod: "pagination", page: page, size: size },
    });
    return res.data;
  } catch (error) {
    throw new Error("대시보드 목록 조회 실패");
  }
}

//대시보드 상세조회

export async function getDashboardInfo(dashboardId: number) {
  try {
    const res = await instance.get(`/dashboards/${dashboardId}`);
    if (res.status == 200) {
      useAuthStore.setState({
        dashboardId: res.data.id,
        dashboardTitle: res.data.title,
      });
    }

    return res.data;
  } catch (error) {
    throw new Error("대시보드 상세 조회 실패");
  }
}

//대시보드 삭제
export async function deleteDashboard(dashboardId: string) {
  try {
    const res = await instance.delete(`/dashboards/${dashboardId}`);
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

  const res = await instance.put(`/dashboards/${dashboardId}`, {
    title,
    color,
  });
  const { title: newTitle, color: newColor } = res.data;
  if (res.status == 200) {
    useAuthStore.setState({
      dashboardTitle: newTitle,
    });
  }
  return { newTitle, newColor };
}
//대쉬보드 초대하기

export async function createInvite(email: string, dashboardId: number) {
  try {
    const res = await instance.post(`/dashboards/${dashboardId}/invitations`, {
      email,
    });
    return res.data;
  } catch (error) {
    throw new Error("대시보드 초대 실패");
  }
}

//대쉬보드 초대 불러오기

export async function getDashboardInvitations(
  page: number,
  dashboardId: string
) {
  try {
    const res = await instance.get(`/dashboards/${dashboardId}/invitations`, {
      params: { page, size: 5 },
    });
    return res.data;
  } catch (error) {
    throw new Error("대시보드 초대 조회 실패");
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
