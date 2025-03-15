import Image from "next/image";

interface Props {
  value: Member;
}

const randomBg = [
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
export function Badge({ value }: Props) {
  const { nickname, profileImageUrl } = value;
  const firstChar = nickname.charAt(0).toUpperCase();
  const randomColor = Math.floor(Math.random() * randomBg.length);

  return (
    <div
      className={` border-2 border-white  flex justify-center items-center rounded-full w-[38px] h-[38px] ${randomBg[randomColor]} `}
    >
      {profileImageUrl ? (
        <img src={profileImageUrl} alt="프로필 이미지" />
      ) : (
        <div className="text-white text-[16px]">{firstChar}</div> //여기 font,color 바꿔줘야함
      )}
    </div>
  );
}

interface BadgesProps {
  badges: Member[];
}
export function Badges({ badges }: BadgesProps) {
  return (
    <div>
      {badges.map((badge) => {
        return <Badge value={badge}></Badge>;
      })}
    </div>
  );
}
