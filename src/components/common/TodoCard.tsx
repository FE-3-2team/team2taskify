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
      className="w-full  h-fit tablet:py-[14px] desktop:py-[16px]  px-3 py-3 laptop:px-4 laptop:py-5 border rounded-[6px] border-gray-300 bg-white flex items-center justify-center cursor-pointer"
    >
      <div className="flex w-full flex-col laptop:flex-col tablet:justify-between  tablet:flex-row  gap-[4px] desktop:gap-[16px]">
        {formattedImg && (
          <div className="w-full tablet:w-[91px] laptop:w-full relative h-[152px] tablet:h-[53px] laptop:h-[160px] rounded-[6px] tablet:rounded-[4px]  overflow-hidden ">
            <Image
              fill
              src={formattedImg}
              alt="task"
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="flex w-full flex-col  gap-[6px]">
          <p className="text-start tablet:text-lg-medium text-md-semibold">
            {todoData.title}
          </p>
          <div className="flex w-full flex-col tablet:flex-row tablet:gap-4 gap-[10px] laptop:gap-[10px] ">
            <Tags tags={todoData.tags} />

            <div className={`flex  w-full justify-between  `}>
              <div className="flex flex-row gap-[2px] ">
                <Image
                  src={CalendarIcon}
                  alt="calendar"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <p className="text-xs-medium text-gray-787486">
                  {todoData.dueDate ? formattedDate : ""}
                </p>
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
      </div>
    </div>
  );
};

export default TodoCard;
