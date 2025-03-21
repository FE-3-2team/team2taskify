import { instance } from "./instance";

//내가 받은 초대 목록 조회
export async function getInvitations(size: number = 5, cursorId: number = 0) {
  try {
    const res = await instance.get(
      `/invitations?size=${size}&cursorId=${cursorId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(" 조회 실패");
  }
}
