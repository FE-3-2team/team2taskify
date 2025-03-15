interface BadgesProps {
  badges: Member[];
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
const RANDOM_NUM = Math.floor(Math.random() * RANDOM_COLOR.length);

export function Badges({ badges }: BadgesProps) {
  return (
    <div className="">
      {badges.map((badge) => {
        return <Badge value={badge}></Badge>;
      })}
      <div className={`${RANDOM_COLOR[RANDOM_NUM]}`}>{badges.length - 3}</div>
    </div>
  );
}
interface Props {
  value: Member;
}

export function Badge({ value }: Props) {
  const { nickname, profileImageUrl } = value;
  const firstChar = nickname.charAt(0).toUpperCase();

  return (
    <div
      className={` border-2 border-white  flex justify-center items-center rounded-full w-[38px] h-[38px] ${RANDOM_COLOR[RANDOM_NUM]} `}
    >
      {profileImageUrl ? (
        <img src={profileImageUrl} alt="프로필 이미지" />
      ) : (
        <div className="text-white text-[16px]">{firstChar}</div> //여기 font,color 바꿔줘야함
      )}
    </div>
  );
}
