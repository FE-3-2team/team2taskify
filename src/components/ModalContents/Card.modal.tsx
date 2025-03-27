import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import { Tags } from "../common/Chip/Tag.chip";
import DropdownEditDel from "../common/Dropdown/DropdownEditDel";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteCard, getCardDetail } from "@/api/card.api";
import CommentsArea from "../Comments";
//
interface Props {
  cardId: number;
  columnTitle: string;
  columnId: number;
}
//
export default function CardModal({ cardId, columnTitle, columnId }: Props) {
  const router = useRouter();
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

  const handleCardDelete = async () => {
    await deleteCard(cardId);
  };
  const handleEdit = () => {};

  return (
    <>
      {card ? (
        <div className="w-[327px] tablet:w-[678px] laptop:w-[730px] rounded-[8px] h-[768px] overflow-scroll">
          <div className="flex flex-col">
            <div className="fixed flex items-start justify-between w-[327px] tablet:w-[678px] laptop:w-[730px] h-10 mb-6 bg-white">
              <span className="text-xl-bold tablet:text-2xl-bold max-w-[420px]">
                {card.title}
              </span>
              <div className="flex items-center gap-4 tablet:gap-6">
                <DropdownEditDel
                  onDelete={handleCardDelete}
                  onEdit={handleEdit}
                />
                <div className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-10 ">
              <div className="mb-4 tablet:hidden">
                <AssigneeCard
                  assigneeName={card.assignee.nickname}
                  dueDate={card.dueDate}
                  profileImageUrl={card.assignee.profileImageUrl}
                />
              </div>
              <div className="flex  tablet:gap-[13px] justify-between">
                <div className="flex flex-col justify-center w-full">
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
                      className="w-[290px] mb-6 laptop:mb-4 h-[168px] tablet:w-[420px] tablet:h-[246px] laptop:w-[445px] laptop:h-[260px] rounded-[6px]"
                      src={card.imageUrl}
                    />
                  )}
                  <div>
                    <CommentsArea columnId={columnId} cardId={cardId} />
                  </div>
                </div>
                <div className="hidden w-fit tablet:block">
                  <AssigneeCard
                    assigneeName={card.assignee.nickname}
                    dueDate={card.dueDate}
                    profileImageUrl={card.assignee.profileImageUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>헤헤 카드가 없어용 </div>
      )}
    </>
  );
}
