import Image from "next/image";
import AssigneeCard from "../AssigneeCard";
import Status from "../common/Chip/Status.chip";
import X from "@/assets/icons/X.icon.svg";
import { Tags } from "../common/Chip/Tag.chip";
import Comments from "../common/Comments";
//
interface Props {
  card: Card;
  columnTitle: string;
}
//
export default function CardModal({ card, columnTitle }: Props) {
  const { dueDate, assignee } = card;
  return (
    <div>
      <div>
        <div>
          <div>
            {card.title}
            <div>
              <button></button>
              <button>
                <Image src={X} width={32} height={32} alt="X" />
              </button>
            </div>
          </div>
          <AssigneeCard
            assigneeName={assignee.nickname}
            dueDate={dueDate}
            profileImageUrl={assignee.profileImageUrl}
          />
          <div>
            <Status value={columnTitle} />
            <div />
            <Tags tags={card.tags} />
          </div>
        </div>
        <p>{card.description}</p>
        <img src={card.imageUrl} />
      </div>
      <div>
        <p>댓글</p>
        <div>댓글 부분</div>
      </div>
      {/* <Comments comments={} /> */}
    </div>
  );
}
