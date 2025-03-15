import useWindowSize from "@/hooks/useWindow";

interface BadgesProps {
  badges: User[];
}

const RANDOM_COLOR = [
  "bg-violet-5534DA",
  "bg-violet-F1EFFD",
  "bg-red-D6173A",
  "bg-green-7AC555",
  "bg-purple-760DDE",
  "bg-orange-FFA500 ",
  "bg-blue-76A6EA",
  "bg-pink-E876EA",
];

export function Badges({ badges }: BadgesProps) {
  const device = useWindowSize();
  const RANDOM_NUM = Math.floor(Math.random() * RANDOM_COLOR.length);
  if (badges.length < 1) return;
  const badgesArray =
    device === "mobile" ? badges.slice(0, 2) : badges.slice(0, 4);
  const count = badgesArray.length === 2 ? 2 : 4;
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

      {badges.length > 3 && (
        <div
          className={`absolute border-2 border-white flex justify-center items-center 
          rounded-full w-[38px] h-[38px] text-[#D25B68] text-lg-semibold 
          bg-[#F4D7DA]
           z-10 
          `}
          style={{ left: `${badgesArray.length * 20}px` }}
        >
          +{badges.length - count}
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
        <div className="text-white-FFFFFF text-lg-semibold ">{firstChar}</div> //여기 font,color 바꿔줘야함
      )}
    </div>
  );
}
