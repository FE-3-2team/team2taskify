import Image from "next/image";
import Profile from "./Profile";
import Edit from "@/assets/icons/Edit.icon.svg";
import Invite from "@/assets/icons/Invite.icon.svg";
import Crown from "@/assets/icons/Crown.icon.svg";
import { Badges } from "./Badge";
import { useState } from "react";
interface Props {
  user: User;
  title?: string;
  members: User[];
}

/**
 * 폰트 변경
 */

export default function Header({ user, members, title }: Props) {
  const [isMine, setIsMine] = useState(false);
  const dashboardTitle = title ? title : "내 대시보드";
  const Owner = members.find((member) => member.isOwner === true);
  //대시보드 목록 조회로 바꾸기
  if (Owner && Owner.id === user.id) {
    setIsMine(true);
  }

  return (
    <div className="flex flex-row justify-between w-full h-[70px] py-[15px] pl-10 pr-20 border-b-[1px]  items-center border-[#D9D9D9] ">
      <div className="flex flex-row gap-2">
        <p className="text-[#333236] text-[20px] ">{dashboardTitle}</p>
        {isMine && <Image src={Crown} width={20} height={24} alt="mine" />}
      </div>
      <div className="flex flex-row gap-[38px]">
        <div className="flex flex-row gap-10 w-fit">
          <div className="flex flex-row gap-4 ">
            <button className="w-[88px] h-[40px] flex flex-row  py-[7px] px-4 gap-2 rounded-lg border-[1px] border-[#D9D9D9]">
              <Image src={Edit} width={15} height={15} alt="톱니바퀴" />
              <div className="text-[#787486]"> 관리</div>
            </button>
            <button className="w-[116px] h-[40px] flex flex-row  py-[7px] px-4 gap-2 rounded-lg border-[1px] border-[#D9D9D9]">
              <Image src={Invite} width={15} height={15} alt="+" />
              <div className="text-[#787486]">초대하기</div>
            </button>
          </div>
          <div className="w-[138px]">
            <Badges badges={members} />
          </div>
        </div>
        <div className="h-[38px]  w-[1px] bg-[#D9D9D9]" />
        <Profile value={user} />
      </div>
    </div>
  );
}
