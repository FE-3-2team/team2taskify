import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import { Tags } from "../common/Chip/Tag.chip";
import { useEffect, useState } from "react";
import { getCardDetail } from "@/api/card.api";
import CommentsArea from "../Comments";
//
interface Props {
  cardId: number;
  columnTitle: string;
  columnId: number;
}
//
export default function CardModal({ cardId, columnTitle, columnId }: Props) {
  const [card, setCard] = useState<Card>();

  useEffect(() => {
    handleLoad();
  }, []);
  //
  const handleLoad = async () => {
    if (!cardId) return;
    const cardData = await getCardDetail(cardId);
    setCard(cardData);
  };
  //
  return (
    <>
      {card ? (
        <div className="flex flex-col w-full h-[calc(100%-35px)] mt-10 overflow-scroll">
          <div className="mb-4 tablet:hidden">
            <AssigneeCard
              assigneeName={card.assignee.nickname}
              dueDate={card.dueDate}
              profileImageUrl={card.assignee.profileImageUrl}
            />
          </div>
          <div className="flex tablet:gap-[13px] justify-between">
            <div className="flex flex-col justify-center w-full ">
              <div className="flex items-center gap-4 mb-4 tablet:gap-5">
                <Status value={columnTitle} />
                <div className="w-[1px] bg-gray-300 h-[20px]" />
                <Tags tags={card.tags} />
              </div>

              <p className="px-2 py-2 mb-2 text-xs-regular tablet:text-md-regular">
                {card.description}
              </p>

              {card.imageUrl && (
                <img
                  className="max-w-[445px] h-full max-h-[300px] w-full  object-contain mb-6 laptop:mb-4  rounded-[6px]"
                  src={card.imageUrl}
                />
              )}
              <CommentsArea columnId={columnId} cardId={cardId} />
            </div>
            <div className="hidden w-full tablet:block">
              <AssigneeCard
                assigneeName={card.assignee.nickname}
                dueDate={card.dueDate}
                profileImageUrl={card.assignee.profileImageUrl}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>헤헤 카드가 없어용 </div>
      )}
    </>
  );
}
