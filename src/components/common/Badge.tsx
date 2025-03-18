import useWindowSize from "@/hooks/useWindow";

interface BadgesProps {
  memberList: Member[];
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
          rounded-full w-[38px] h-[38px] text-[#D25B68] text-lg-semibold 
          bg-[#F4D7DA]
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
        <div className="text-white-FFFFFF text-lg-semibold ">{firstChar}</div> //여기 font,color 바꿔줘야함
      )}
    </div>
  );
}
