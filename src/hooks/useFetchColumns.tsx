import { getColumns } from "@/api/column.api";
import { getCards } from "@/api/card.api";
import { getDashboardInfo } from "@/api/dashboard";

export function useFetchColumns(setColumns: any, setIsLoading: any) {
  const fetchColumns = async (pageId: number) => {
    try {
      setIsLoading(true);

      const dashboardInfo = await getDashboardInfo(pageId);
      const dashboardId = dashboardInfo.id;

      const columnList = await getColumns(dashboardId);

      const fullColumns = await Promise.all(
        columnList.map(async (col) => {
          try {
            const cards = await getCards(col.id);

            return {
              ...col,
              cards: cards.map((card: any) => ({
                ...card,
                cardId: card.id,
              })),
            };
          } catch (err) {
            console.error(`컬럼 ${col.id}의 카드 로딩 실패`, err);

            return { ...col, cards: [] };
          }
        })
      );

      setColumns(fullColumns);
    } catch (err) {
      console.error("컬럼 목록 로딩 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchColumns };
}
