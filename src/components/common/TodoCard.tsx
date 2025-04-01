import Image from "next/image";
import { useState } from "react";
import { Tags } from "@/components/common/Chip/Tag.chip";
import useCardImageVisibility from "@/hooks/useCardImageVisibility";
import CalendarIcon from "@/assets/icons/Calendar.svg";
import { Badge } from "./Badge";
import { useFormatDate } from "@/hooks/useFormatDate";
const DEFAULT_IMG = process.env.NEXT_PUBLIC_DEFAULT_IMG;

interface TodoCardProps {
  todoData: Card;
  listeners?: any;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todoData,
  listeners,
}: TodoCardProps) => {
  const [isImageError, setIsImageError] = useState(false);
  const isCardImageVisible = useCardImageVisibility(todoData.imageUrl);
  const formattedDate = useFormatDate(todoData.dueDate);
  const formattedImg =
    todoData.imageUrl === DEFAULT_IMG ? "" : todoData.imageUrl;
  return (
    <div
      {...listeners}
      className="w-full tablet:px-[20px] desktop:py-[16px] tablet:py-[14px] px-[12px] py-[6px] border rounded-[6px] border-gray-300 bg-white flex items-center justify-center cursor-pointer"
    >
      <div className=" desktop:h-fit tablet:h-[64px] flex flex-col desktop:flex-col  tablet:flex-row items-between justify-start gap-[4px] desktop:gap-[16px]">
        {formattedImg && (
          <div className="tablet:mt-[0] mt-[6px] tablet:h-[64px] tablet:w-[92px] rounded-[6px] tablet:rounded-[4px] desktop:rounded-[6px] w-[260px] h-[152px] tablet:mr-[20px] desktop:w-[274px] desktop:h-[160px] overflow-hidden relative">
            <Image
              src={formattedImg}
              alt="task"
              fill
              className="object-cover"
              onError={() => setIsImageError(true)}
              unoptimized
            />
          </div>
        )}

        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-[6px] desktop:gap-[10px] justify-between">
            <div className="flex flex-col gap-[10px]">
              <p className=" tablet:text-lg-medium text-md-semibold">
                {todoData.title}
              </p>
              <Tags tags={todoData.tags} />
            </div>

            <div
              className={`flex flex-col desktop:items-start items-start tablet:items-center desktop:gap-[8px] gap-[6px] justify-between tablet:flex-row  tablet:h-[28px] desktop:flex-col h-fit desktop:h-fit ${todoData.tags.length > 0 ? "tablet:gap-[16px]" : "tablet:gap-[0]"}`}
            >
              <div className="flex flex-row gap-[4px]">
                <div className="tablet:w-[18px] tablet:h-[18px] w-[14px] h-[14px] relative">
                  <Image
                    src={CalendarIcon}
                    alt="calendar"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs-medium text-gray-787486">
                  {todoData.dueDate ? formattedDate : ""}
                </p>
              </div>
            </div>
          </div>
          {todoData.assignee && (
            <Badge
              nickname={todoData.assignee.nickname}
              img={todoData.assignee.profileImageUrl}
              type="column"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
