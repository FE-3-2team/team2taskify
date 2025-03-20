import { Badge } from "./Badge";
import clsx from "clsx";
interface Props {
  nickname: string;
  profileImageUrl: string | null;
  isProfile?: boolean;
}
export default function Profile({
  nickname,
  profileImageUrl,
  isProfile,
}: Props) {
  return (
    <div className={"flex flex-row items-center gap-3 w-fit"}>
      <Badge nickname={nickname} img={profileImageUrl} />
      <p
        className={clsx(
          "text-lg-medium text-black-200 ",
          isProfile ? "tablet:block hidden" : "block"
        )}
      >
        {nickname}
      </p>
    </div>
  );
}
