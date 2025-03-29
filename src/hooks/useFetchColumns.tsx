import { getColumns } from "@/api/column.api";
import { getCards } from "@/api/card.api";
import { getDashboardInfo } from "@/api/dashboard";

export function useFetchColumns(setColumns: any, setIsLoading: any) {
  const fetchColumns = async (pageId: string) => {
    try {
      setIsLoading(true);

      const dashboardInfo = await getDashboardInfo(pageId);
      const dashboardId = dashboardInfo.id;

      const columnList = await getColumns(String(dashboardId));

      setColumns([]);

      for (const col of columnList) {
        try {
          const cards = await getCards(col.id);

          setColumns((prev: any) => [...prev, { ...col, cards }]);
        } catch (err) {
          console.error(`컬럼 ${col.id}의 카드 로딩 실패`, err);
          setColumns((prev: any) => [...prev, { ...col, cards: [] }]);
        }
      }
    } catch (err) {
      console.error("컬럼 목록 로딩 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchColumns };
}
