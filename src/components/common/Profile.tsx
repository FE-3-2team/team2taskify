import { Badge } from "./Badge";

interface Props {
  value: User;
}
export default function Profile({ value }: Props) {
  return (
    <div className="flex flex-row items-center gap-3">
      <Badge value={value} />
      <p className="text-base">{value?.nickname}</p>
    </div>
  );
}
