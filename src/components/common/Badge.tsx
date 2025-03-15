import useWindowSize from "@/hooks/useWindow";

interface BadgesProps {
  badges: User[];
}

const RANDOM_COLOR = [
  //여기 컬러 변경 예정
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-red-500",
  "bg-red-600",
  "bg-red-100",
  "bg-red-50",
  "bg-red-700",
];

export function Badges({ badges }: BadgesProps) {
  const device = useWindowSize();
  const RANDOM_NUM = Math.floor(Math.random() * RANDOM_COLOR.length);
  if (badges.length < 1) return;
  const badgesArray =
    device === "mobile" ? badges.slice(0, 2) : badges.slice(0, 4);

  return (
    <div className="relative flex flex-row w-auto h-[38px]">
      {badgesArray.map((badge, idx) => {
        return (
          <div
            key={idx}
            className="absolute"
            style={{ left: `${idx * 20}px`, zIndex: 0 + idx }}
          >
            <Badge value={badge} />
          </div>
        );
      })}

      {badges.length > 4 && (
        <div
          className={`absolute border-2 border-white flex justify-center items-center 
          rounded-full w-[38px] h-[38px] text-white text-[16px] 
          ${RANDOM_COLOR[RANDOM_NUM]}
           z-10 
          `}
          style={{ left: `${device === "mobile" ? 40 : 80}px` }}
        >
          +{badges.length - 3}
        </div>
      )}
    </div>
  );
}
interface Props {
  value: User;
}

export function Badge({ value }: Props) {
  const RANDOM_NUM = Math.floor(Math.random() * RANDOM_COLOR.length);

  const { email, profileImageUrl } = value;
  const firstChar = email.charAt(0).toUpperCase();

  return (
    <div
      className={` border-2 border-white  flex justify-center items-center rounded-full w-[38px] h-[38px] ${RANDOM_COLOR[RANDOM_NUM]} `}
    >
      {profileImageUrl ? (
        <img src={profileImageUrl} alt="프로필 이미지" />
      ) : (
        <div className="text-white text-[16px] ">{firstChar}</div> //여기 font,color 바꿔줘야함
      )}
    </div>
  );
}
