import { instance } from "./instance";

export async function getColumns(dashboardId: number): Promise<Column[]> {
  const res = await instance.get(`/columns`, {
    params: { dashboardId },
  });
  // console.log("컬럼 응답 확인:", res.data);
  return res.data.data;
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

export async function updateColumn(columnId: number, title: string) {
  const res = await instance.put(`/columns/${columnId}`, { title });
  return res.data;
}

export async function deleteColumn(columnId: number) {
  const res = await instance.delete(`/columns/${columnId}`);
  return res.data;
}

export async function uploadCardImage({
  columnId,
  imageFile,
}: {
  columnId: number;
  imageFile: File;
}): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await instance.post(
      `/columns/${columnId}/card-image`,
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
