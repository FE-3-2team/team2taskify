import Image from "next/image";
import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import X from "@/assets/icons/X.icon.svg";
import { Tags } from "../common/Chip/Tag.chip";
import Comments from "../common/Comments";
import DropdownEditDel from "../common/Dropdown/DropdownEditDel";
import TestImage from "@/assets/test.svg";
//
interface Props {
  card: Card;
  columnTitle: string;
  comments?: CardComment[];
}
//
export default function CardModal({ card, columnTitle, comments }: Props) {
  const { dueDate, assignee } = card;
  const handleDelete = () => {};
  const handleEdit = () => {};
  return (
    <div className=" w-[327px] tablet:w-[678px] laptop:w-[730px] px-4 py-4 tablet:px-[23px] tablet:py-8 rounded-[8px] max-h-[800px] overflow-scroll">
      <div className="flex flex-col">
        <div className="flex items-start justify-between mb-6 ">
          <span className="text-xl-bold tablet:text-2xl-bold max-w-[420px]">
            {card.title}
          </span>
          <div className="flex items-center gap-4 tablet:gap-6">
            <DropdownEditDel onDelete={handleDelete} onEdit={handleEdit} />
            <button>
              <Image src={X} width={32} height={32} alt="X" />
            </button>
          </div>
        </div>
        <div className="mb-4 tablet:hidden">
          <AssigneeCard
            assigneeName={assignee.nickname}
            dueDate={dueDate}
            profileImageUrl={assignee.profileImageUrl}
          />
        </div>
        <div className="flex tablet:gap-[13px] justify-between">
          <div className="flex flex-col items-center">
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
                className="w-[290px] h-[168px] tablet:w-[420px] tablet:h-[246px] laptop:w-[445px] laptop:h-[260px] rounded-[6px]"
                src={card.imageUrl}
              />
            )}
            <div className="w-[290px] h-[168px] tablet:w-[420px] tablet:h-[246px] laptop:w-[445px] laptop:h-[260px]">
              <Image src={TestImage} width={445} height={260} alt="테스ㅡㅌ" />
            </div>

            <div>
              <p>댓글</p>
              <input></input>
            </div>

            <div>
              {comments?.map((comment) => {
                return <Comments comment={comment} />;
              })}
            </div>
          </div>
          <div className="hidden w-fit tablet:block">
            <AssigneeCard
              assigneeName={assignee.nickname}
              dueDate={dueDate}
              profileImageUrl={assignee.profileImageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
