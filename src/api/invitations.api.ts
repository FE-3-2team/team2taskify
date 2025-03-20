import { instance } from "./instance";

export async function getInvitations(size: number = 5, cursorId: number = 0) {
  try {
    const res = await instance.get(
      `/invitations?size=${size}&cursorId=${cursorId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("멤버 조회 실패");
  } finally {
    console.log(size, cursorId);
  }
}
