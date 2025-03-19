import useWindowSize from "@/hooks/useWindow";

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
  if (memberList.length < 1) return;
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
            <Badge value={member} />
          </div>
        );
      })}

      {memberList.length > 3 && (
        <div
          className={`absolute border-2 border-white flex justify-center items-center 
          rounded-full w-[38px] h-[38px] text-pink200 text-lg-semibold bg-pink300
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
  value: User | Member;
}

export function Badge({ value }: Props) {
  const randomNum = Math.floor(Math.random() * RANDOM_COLOR.length);
  const { email, profileImageUrl } = value;
  const firstChar = email.charAt(0).toUpperCase();

  return (
    <div
      className={` border-2 border-white  flex justify-center items-center rounded-full w-[38px] h-[38px] ${RANDOM_COLOR[randomNum]} `}
    >
      {profileImageUrl ? (
        <img src={profileImageUrl} alt="프로필 이미지" />
      ) : (
        <div className="text-white text-lg-semibold ">{firstChar}</div>
      )}
    </div>
  );
}
