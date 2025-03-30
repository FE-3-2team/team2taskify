import useWindowSize from "@/hooks/useWindow";
import clsx from "clsx";
interface BadgesProps {
  member: MemberData;
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

export function Badges({ member }: BadgesProps) {
  const { members, totalCount } = member;
  const device = useWindowSize();
  if (totalCount < 0) return;
  const memberArray =
    device === "desktop" ? members.slice(0, 4) : members.slice(0, 2);
  const count = memberArray.length === 2 ? 2 : 4;
  return (
    <div className="relative flex flex-row w-auto h-[38px]">
      {memberArray.map((member, idx) => {
        return (
          <div key={member.id} className={idx !== 0 ? "ml-[-10px]" : ""}>
            <Badge
              img={member.profileImageUrl}
              nickname={member.nickname}
              type="badges"
            />
          </div>
        );
      })}

      {members.length > 3 && (
        <div
          className={`border-[2px] border-white flex justify-center items-center 
          rounded-full !w-[38px] h-[38px] text-pink200 text-md-semibold tablet:text-lg-semibold bg-pink300
          z-10 ml-[-10px]
          `}
          style={{ left: `${memberArray.length * 20}px` }}
        >
          +{totalCount - count}
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
        "border-2 border-white flex justify-center items-center overflow-hidden rounded-full ",
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
        <img
          className="object-cover w-full h-full "
          src={img}
          alt="프로필 이미지"
        />
      ) : (
        <div className="text-white text-md-semibold tablet:text-lg-semibold">
          {firstChar}
        </div>
      )}
    </div>
  );
}
