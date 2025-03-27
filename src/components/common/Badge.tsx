import useWindowSize from "@/hooks/useWindow";
import clsx from "clsx";
interface BadgesProps {
  memberList: Member[];
}

const RANDOM_COLOR = [
  "bg-violet-200",
  "bg-violet-100",
  "bg-red",
  "bg-green",
  "bg-purple",
  "bg-orange",
  "bg-blue",
  "bg-pink",
];

export function Badges({ memberList }: BadgesProps) {
  const device = useWindowSize();
  if (memberList.length < 0) return;
  const memberArray =
    device === "desktop" ? memberList.slice(0, 4) : memberList.slice(0, 2);
  const count = memberArray.length === 2 ? 2 : 4;
  return (
    <div className="relative flex flex-row w-auto h-[38px]">
      {memberArray.map((member, idx) => {
        return (
          <div
            key={member.id}
            className="absolute"
            style={{ left: `${idx * 20}px`, zIndex: 0 + idx }}
          >
            <Badge
              img={member.profileImageUrl}
              nickname={member.nickname}
              type="badges"
            />
          </div>
        );
      })}

      {memberList.length > 3 && (
        <div
          className={`absolute border-2 border-white flex justify-center items-center 
          rounded-full w-[38px] h-[38px] text-pink200 text-md-semibold tablet:text-lg-semibold bg-pink300
          z-10 
          `}
          style={{ left: `${memberArray.length * 20}px` }}
        >
          +{memberList.length - count}
        </div>
      )}
    </div>
  );
}
interface Props {
  nickname: string;
  img: string | null;
  type: "comment" | "assignee" | "badges" | "profile" | "column" | "edit";
}
export function Badge({ nickname, img, type }: Props) {
  const colorNum = nickname.charCodeAt(0) % RANDOM_COLOR.length;
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(nickname);
  const hangulRomanization = require("hangul-romanization");
  if (isKorean) nickname = hangulRomanization.convert(nickname);
  const firstChar = nickname.charAt(0).toUpperCase();

  return (
    <div
      className={clsx(
        "border-2 border-white flex justify-center items-center rounded-full ",
        {
          comment: "w-[34px] h-[34px]",
          column: "w-[22px] h-[22px] tablet:w-[24px] tablet:h-[24px]",
          badges: "w-[38px] h-[38px]",
          profile: "w-[38px] h-[38px]",
          assignee: "w-[26px] h-[26px] tablet:w-[34px] tablet:h-[34px]",
          edit: "w-[34px] h-[34px] tablet:w-[38px] tablet:h-[38px] ",
        }[type],

        RANDOM_COLOR[colorNum]
      )}
    >
      {img ? (
        <img src={img} alt="프로필 이미지" />
      ) : (
        <div className="text-white text-md-semibold tablet:text-lg-semibold">{firstChar}</div>
      )}
    </div>
  );
}
