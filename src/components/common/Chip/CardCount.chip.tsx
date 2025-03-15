interface Props {
  count: number;
}
/**
 * todo
 *  배경색 컬러변경, 글씨 색깔, font-
 */

export default function CardCount({ count }: Props) {
  return (
    <div className="flex justify-center text-[#787486] w-[20px] h-[20px] bg-[#eeeeee] rounded-sm text-[14px]  ">
      {count}
    </div>
  );
}
