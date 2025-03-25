import { instance } from "./instance";

export async function getColumns(dashboardId: string): Promise<Column[]> {
  try {
    const res = await instance.get(`/columns`, {
      params: { dashboardId },
    });
    console.log("컬럼 응답 확인:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("getColumns error:", error);
    throw new Error("컬럼 목록 조회 실패");
  }
}

export async function createColumn({
  title,
  dashboardId,
}: {
  title: string;
  dashboardId: number;
}) {
  try {
    const res = await instance.post(`/columns`, {
      title,
      dashboardId,
    });
    return res.data;
  } catch (err) {
    throw new Error("컬럼 생성 실패");
  }
}
