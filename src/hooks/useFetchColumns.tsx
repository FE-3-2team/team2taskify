import { getColumns } from "@/api/column.api";
import { getCards } from "@/api/card.api";
import { getDashboardInfo } from "@/api/dashboard";

export function useFetchColumns(setColumns: any, setIsLoading: any) {
  const fetchColumns = async (pageId: string) => {
    try {
      setIsLoading(true);

      const dashboardInfo = await getDashboardInfo(pageId);
      const dashboardId = dashboardInfo.id;

      const columnList = await getColumns(Number(dashboardId));

      const fullColumns = await Promise.all(
        columnList.map(async (col) => {
          try {
            const cards = await getCards(col.id);
            //아래 진단
            const invalidCards = cards.filter((c: any) => !c.id);
            if (invalidCards.length > 0) {
              console.warn(
                `❗️컬럼 ${col.title}에 ID가 없는 카드 존재`,
                invalidCards
              );
            }
            //위 진단

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
