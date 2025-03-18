import { Badge } from "./Badge";

interface Props {
  value: User;
  isEdit?: boolean;
}
export default function Profile({ value, isEdit }: Props) {
  return (
    <div className="flex flex-row items-center gap-3 w-fit">
      <Badge value={value} />
      <p
        className="hidden text-lg-medium text-black-333236 tablet:block"
        style={{ display: isEdit ? "block" : "none" }}
      >
        {value?.nickname}
      </p>
    </div>
  );
}
