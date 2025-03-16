import Image from "next/image";
import { useRouter } from "next/router";
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

export default function Header({ user, members, title }: Props) {
  const router = useRouter();
  const [isMine, setIsMine] = useState(false);
  const dashboardTitle = title ? title : "내 대시보드";
  const Owner = members.find((member) => member.isOwner === true);
  //대시보드 목록 조회로 바꾸기
  if (Owner && Owner.id === user.id) {
    setIsMine(true);
  }

  return (
    <div className="flex flex-row justify-between w-full h-[70px] py-[15px] px-[20px] laptop:pl-10 laptop:pr-20  border-b-[1px]  items-center border-gray-D9D9D9 ">
      <div className="flex flex-row gap-2">
        <p className="hidden tablet:block text-black-333236 text-xl-bold ">
          {dashboardTitle}
        </p>
        {isMine && <Image src={Crown} width={20} height={24} alt="mine" />}
      </div>

      <div className="flex flex-row gap-4 tablet:gap-8 laptop:gap-10">
        <div className="flex flex-row gap-4 ">
          <button
            onClick={() => router.push("/mypage")}
            className="w-[49px] tablet:w-[88px] justify-center h-[40px] flex flex-row items-center py-[7px] px-3 tablet:px-4 gap-2 rounded-lg border-[1px] border-gray-D9D9D9"
          >
            <Image
              className="hidden tablet:block"
              src={Edit}
              width={15}
              height={15}
              alt="톱니바퀴"
            />
            <div className="text-xs-medium tablet:text-md-medium text-gray-787486">
              관리
            </div>
          </button>
          <button
            onClick={() => {}}
            className="w-[73px] tablet:w-[116px] justify-center items-center h-[40px] flex flex-row  py-[7px] px-3 tablet:px-4 gap-2 rounded-lg border-[1px] border-gray-D9D9D9"
          >
            <Image
              className="hidden tablet:block"
              src={Invite}
              width={15}
              height={15}
              alt="+"
            />
            <div className=" text-xs-medium tablet:text-md-medium text-gray-787486">
              초대하기
            </div>
          </button>
        </div>
        <div className="flex w-fit flex-row gap-4 tablet:gap-6 laptop:gap-[38px]">
          <div className=" w-[90px] laptop:w-[138px]">
            <Badges badges={members} />
          </div>
          <div className="h-[38px]  w-[1px] bg-gray-D9D9D9" />
          <Profile value={user} />
        </div>
      </div>
    </div>
  );
}
