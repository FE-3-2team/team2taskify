import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import { Tags } from "../common/Chip/Tag.chip";
import { useEffect, useState } from "react";
import { getCardDetail } from "@/api/card.api";
import CommentsArea from "../Comments";
import { AlertModal } from "./AlertModal";
//
const DEFAULT_IMG = process.env.NEXT_PUBLIC_DEFAULT_IMG;

interface Props {
  cardId: number;
  columnTitle: string;
  columnId: number;
}
//
export default function CardModal({ cardId, columnTitle, columnId }: Props) {
  const [card, setCard] = useState<Card>();
  const [message, setMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const formattedImg = card?.imageUrl === DEFAULT_IMG ? null : card?.imageUrl;
  useEffect(() => {
    handleLoad();
  }, [cardId]);
  //
  const handleLoad = async () => {
    if (!cardId) return;
    try {
      const cardData = await getCardDetail(cardId);
      setCard(cardData);
    } catch (err: any) {
      setMessage(err.response.data.message);
      setIsAlert(true);
    }
  };
  //
  return (
    <>
      {card ? (
        <div className="flex flex-col w-full h-[calc(100%-35px)] pt-10 overflow-y-auto">
          <div className="mb-4 tablet:hidden">
            {card.assignee && (
              <AssigneeCard
                assigneeName={card.assignee.nickname}
                dueDate={card.dueDate}
                profileImageUrl={card.assignee.profileImageUrl}
              />
            )}
          </div>
          <AlertModal
            onConfirm={() => {
              setIsAlert(false);
            }}
            message={message}
            isOpen={isAlert}
          />
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
              <div className="flex items-center justify-center mb-6 laptop:mb-4">
                {formattedImg && (
                  <img
                    className="max-w-[445px] h-full max-h-[300px] w-full  object-contain   rounded-[6px]"
                    src={formattedImg}
                  />
                )}
              </div>
              <CommentsArea columnId={columnId} cardId={cardId} />
            </div>
            <div className="hidden w-full max-w-[200px] tablet:block">
              {card.assignee && (
                <AssigneeCard
                  assigneeName={card.assignee.nickname}
                  dueDate={card.dueDate}
                  profileImageUrl={card.assignee.profileImageUrl}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>헤헤 카드가 없어용 </div>
      )}
    </>
  );
}
