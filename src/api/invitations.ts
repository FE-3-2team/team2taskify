import { instance } from "./instance";

export interface InvitationType {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getInvitations(
  size: number = 10,
  cursorId?: number,
  title?: string
) {
  try {
    const params: Record<string, any> = { size };
    if (cursorId !== undefined) params.cursorId = cursorId;
    if (title?.trim()) {
      params.title = title.trim();
    }

    const response = await instance.get(`/invitations`, { params });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "조회 실패");
  }
}

export async function respondToInvitation(
  invitationId: number,
  inviteAccepted: boolean
) {
  try {
    const response = await instance.put(`/invitations/${invitationId}`, {
      inviteAccepted,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "응답 실패");
  }
}
