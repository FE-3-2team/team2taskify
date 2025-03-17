import instance from "./instance";
//
interface Data {
  title: string;
  color: string;
}
export async function createDashboard(data: Data) {
  const { title, color } = data;
  try {
    const res = await instance.post("/dashboards", {
      params: { title, color },
    });
    return res.data;
  } catch (error) {
    throw new Error("대시보드 생성 실패");
  }
}
