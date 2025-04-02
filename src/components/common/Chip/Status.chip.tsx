interface Props {
  value: string;
}
export default function Status({ value }: Props) {
  return (
    <div className="flex items-center w-fit min-h-[26px] bg-violet-100 rounded-2xl text-xs-regular px-2 ">
      <div className="gap-[6px] h-fit w-fit flex items-center text-violet-200">
        <div className="w-[6px] h-[6px] bg-violet-200  rounded-full" />
        <p className="px-1 w-fit whitespace-nowrap">{value}</p>
      </div>
    </div>
  );
}
