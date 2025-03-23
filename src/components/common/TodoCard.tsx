import Image from "next/image";
import { Tags } from "./Chip/Tag.chip";
import CalendarIcon from "@/assets/icons/Calendar.svg";

interface TodoCardProps {
  todoData: Card;
}

const TodoCard: React.FC<TodoCardProps> = ({ todoData }) => {
  return (
    <div className="desktop:w-[314px] tablet:w-[544px] w-[284px] tablet:px-[20px] desktop:py-[16px] tablet:py-[14px] px-[12px] py-[6px] border rounded-[6px] border-gray-D9D9D9 bg-white flex items-center justify-center">
      <div className="tablet:w-[504px] w-[260px] desktop:h-fit tablet:h-[64px] flex flex-col desktop:flex-col tablet:flex-row items-between justify-start gap-[4px] desktop:gap-[16px]">
        {todoData.imageUrl && (
          <div className="tablet:mt-[0] mt-[6px] tablet:h-[64px] tablet:w-[92px] rounded-[6px] tablet:rounded-[4px] desktop:rounded-[6px] w-[260px] h-[152px] tablet:mr-[20px] desktop:w-[274px] desktop:h-[160px] overflow-hidden relative">
            <Image
              src={todoData.imageUrl}
              alt="task"
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-[6px] desktop:gap-[10px] justify-between">
            <div className="font-semibold tablet:leading-[40px] desktop:leading-[16px] leading-[16px] tablet:text-lg-medium text-md-medium">
              {todoData.title}
            </div>
            <div
              className={`flex flex-col desktop:items-start items-start tablet:items-center desktop:gap-[8px] gap-[6px] justify-between tablet:flex-row  tablet:h-[28px] desktop:flex-col h-fit desktop:h-fit ${todoData.tags.length > 0 ? "tablet:gap-[16px]" : "tablet:gap-[0]"}`}
            >
              <Tags tags={todoData.tags} />
              <div className="flex flex-row gap-[4px]">
                <div className="w-[18px] h-[18px] w-[14px] h-[14px] relative">
                  <Image
                    src={CalendarIcon}
                    alt="calendar"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs-medium text-gray-787486">
                  {todoData.dueDate}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-full bg-green tablet:w-[24px] tablet:h-[24px] w-[22px] h-[22px] flex items-center justify-center text-xs-semibold text-white-FFFFFF">
            P
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
