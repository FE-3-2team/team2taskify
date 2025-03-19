import { Badge } from "./Badge";
import clsx from "clsx";
interface Props {
  value: User;
  isProfile?: boolean;
}
export default function Profile({ value, isProfile }: Props) {
  return (
    <div className={"flex flex-row items-center gap-3 w-fit"}>
      <Badge nickname={value.nickname} img={value.profileImageUrl} />
      <p
        className={clsx(
          "text-lg-medium text-black-200 ",
          isProfile ? "tablet:block hidden" : "block"
        )}
      >
        {value.nickname}
      </p>
    </div>
  );
}
