import Image from "next/image";
import Profile from "./Profile";
import Edit from "@/assets/icons/Edit.icon.svg";
import Invite from "@/assets/icons/Invite.icon.svg";
interface Props {
  user: User;
}

/**
 * 폰트 변경
 */
export default function Header({ user }: Props) {
  return (
    <div className="flex flex-row justify-between w-full h-[70px] py-[15px] pl-10 pr-20 border-b-[1px]  items-center border-[#D9D9D9] ">
      <p className="text-[#333236] text-[20px] ">내 대시보드</p>
      <div className="flex flex-row gap-[38px]">
        <button className="w-[88px] h-[40px] flex flex-row gap py-[7px] px-4 gap-2 rounded-lg border-[1px] border-[#D9D9D9]">
          <Image src={Edit} width={15} height={15} alt="톱니바퀴" />
          <div className="text-[#787486]"> 관리</div>
        </button>
        <button className="w-[116px] h-[40px] flex flex-row gap py-[7px] px-4 gap-2 rounded-lg border-[1px] border-[#D9D9D9]">
          <Image src={Invite} width={15} height={15} alt="+" />
          <div className="text-[#787486]">초대하기</div>
        </button>
        <div className="h-[38px] w-[1px] bg-[#D9D9D9]" />
        <div>
          <Profile value={user} />
        </div>
      </div>
    </div>
  );
}
