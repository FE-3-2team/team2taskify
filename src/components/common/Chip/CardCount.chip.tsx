interface Props {
  count: number;
}

export default function CardCount({ count }: Props) {
  return (
    <div className="flex justify-center text-gray-787486 w-[20px] h-[20px] bg-gray-EEEEEE rounded-sm text-xs-medium  ">
      {count}
    </div>
  );
}
