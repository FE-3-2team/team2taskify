interface Props {
  value: string;
}
/**
 * todo
 * 점 , 배경색 컬러변경, 글씨 색깔, font-
 */

export default function Status({ value }: Props) {
  return (
    <div className=" flex items-center w-fit min-h-[26px] bg-violet-F1EFFD rounded-2xl text-xs-regular px-2 ">
      <div className="gap-[6px] h-fit flex items-center text-violet-5534DA">
        <div className="w-[6px] h-[6px] bg-violet-5534DA  rounded-full" />
        {value}
      </div>
    </div>
  );
}
