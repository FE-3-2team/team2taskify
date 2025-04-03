interface Props {
  count: number;
}

export default function CardCount({ count }: Props) {
  return (
    <div className="flex justify-center text-gray-500 w-[20px] h-[20px] bg-gray-200 rounded-sm text-xs-medium ">
      {count}
    </div>
  );
}
