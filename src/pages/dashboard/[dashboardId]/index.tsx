import Column from "@/components/common/Column";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getColumns } from "@/api/column.api";
import { getCards } from "@/api/card.api";
import { getDashboardInfo } from "@/api/dashboard";
import { DetailContent } from "@/components/common/ModalPopup";
import CardModal from "@/components/ModalContents/Card.modal";

interface ColumnData {
  id: number;
  title: string;
  cards: Card[];
}

interface ColumnWithCards extends Column {
  cards: Card[];
}

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;

  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchColumns = async (pageId: string) => {
    try {
      setIsLoading(true);

      const dashboardInfo = await getDashboardInfo(pageId);
      const dashboardId = dashboardInfo.id;

      const columnList = await getColumns(String(dashboardId));

      const columnsWithCards: ColumnWithCards[] = await Promise.all(
        columnList.map(async (col): Promise<ColumnWithCards> => {
          const cards = await getCards(col.id);
          // console.log(`Column ${col.id} 카드 수:`, cards.length);
          return { ...col, cards };
        })
      );

      // console.log("최종 columns with cards:", columnsWithCards);
      setColumns(columnsWithCards);
    } catch (err) {
      console.error("컬럼 또는 카드 로딩 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof dashboardId === "string") {
      fetchColumns(dashboardId);
    }
  }, [dashboardId]);

  return (
    <div>
      <Header />
      <>
        <DetailContent ModalOpenButton="테스트 ">
          <CardModal cardId={11808} columnTitle="To do" columnId={46358} />
        </DetailContent>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          columns.map((column) => {
            return (
              <Column
                key={column.id}
                title={column.title}
                cards={column.cards ?? []}
                onAddCard={() => {}}
              />
            );
          })
        )}
      </>
    </div>
  );
}
