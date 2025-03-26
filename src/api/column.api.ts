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

export async function uploadCardImage({
  teamId,
  columnId,
  imageFile,
}: {
  teamId: string;
  columnId: number;
  imageFile: File;
}) {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await instance.post(
      `/${teamId}/columns/${columnId}/card-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.imageUrl;
  } catch (err) {
    throw new Error("카드 이미지 업로드 실패");
  }
}
