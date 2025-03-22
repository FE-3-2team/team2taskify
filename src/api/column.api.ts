import { instance } from "./instance";

export async function getColumns(dashboardId: string) {
  try {
    const res = await instance.get(`/columns`, {
      params: { dashboardId },
    });
    const data: Column[] = res.data.data;
    return data;
  } catch (error) {
    throw new Error("컬럼 목록 조회 실패");
  }
}
