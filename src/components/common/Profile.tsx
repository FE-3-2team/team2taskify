import { Badge } from "./Badge";

interface Props {
  value: Member;
}
export default function ({ value }: Props) {
  return (
    <div>
      <Badge value={value} />
      <p>{value.nickname}</p>
    </div>
  );
}
