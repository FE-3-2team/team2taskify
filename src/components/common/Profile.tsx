import { Badge } from "./Badge";
import clsx from "clsx";
interface Props {
  nickname: string;
  profileImageUrl: string | null;
  type: "profile" | "assignee" | "edit";
}
export default function Profile({ nickname, profileImageUrl, type }: Props) {
  return (
    <div className={"flex flex-row items-center gap-3 w-fit"}>
      <Badge nickname={nickname} img={profileImageUrl} type={type} />
      <p
        className={clsx(
          "text-lg-medium text-black-200  ",
          {
            profile: " hidden tablet:block ",
            assignee: "text-xs-regular tablet:text-md-regular ",
            edit: "text-lg-regular",
          }[type]
        )}
      >
        {nickname}
      </p>
    </div>
  );
}
