import Image from "next/image";
import { useRouter } from "next/router";
import Profile from "./Profile";
import Edit from "@/assets/icons/Edit.icon.svg";
import Invite from "@/assets/icons/Invite.icon.svg";
import Crown from "@/assets/icons/Crown.icon.svg";
import { Badges } from "./Badge";
import Link from "next/link";
import useAuthStore from "@/utils/Zustand/zustand";
import { useStore } from "@/utils/Zustand/useStore";

/**ToDo
 * 초대하기 버튼 클릭시 모달 팝업 함수
 */
interface Props {
  title?: string;
  members?: Member[];
  createdByMe?: boolean;
}

export default function Header({ members, title, createdByMe }: Props) {
  const store = useStore(useAuthStore, (state) => state);
  const router = useRouter();
  const display = router.pathname === "/mydashbord" ? "none" : "block";
  let dashboardTitle = title ? title : "내 대시보드";
  dashboardTitle = router.pathname === "/mypage" ? "계정관리" : dashboardTitle;

  if (!store?.userNickname) return;
  return (
    <div className="flex flex-row justify-between w-full h-[70px] py-[15px] px-[20px] laptop:pl-10 laptop:pr-20  border-b-[1px]  items-center border-gray-300 ">
      <div className="flex flex-row gap-2">
        <p className="hidden tablet:block text-black-200 text-xl-bold ">
          {dashboardTitle}
        </p>
        {createdByMe && (
          <div className="hidden tablet:block">
            <Image src={Crown} width={20} height={24} alt="mine" />
          </div>
        )}
      </div>

      <div className="flex flex-row gap-4 tablet:gap-8 laptop:gap-10">
        <div className="flex flex-row gap-4 ">
          <Link href="/mypage">
            <button className="w-[49px] tablet:w-[88px] justify-center h-[40px] flex flex-row items-center py-[7px] px-3 tablet:px-4 gap-2 rounded-lg border-[1px] border-gray-300">
              <Image
                className="hidden tablet:block"
                src={Edit}
                width={15}
                height={15}
                alt="톱니바퀴"
              />
              <div className="text-gray-500 text-xs-medium tablet-text-md-medium">
                관리
              </div>
            </button>
          </Link>
          <button
            onClick={() => {}}
            className="w-[73px] tablet:w-[116px] justify-center items-center h-[40px] flex flex-row  py-[7px] px-3 tablet:px-4 gap-2 rounded-lg border-[1px] border-gray-300"
          >
            <Image
              className="hidden tablet:block"
              src={Invite}
              width={15}
              height={15}
              alt="+"
            />
            <div className="text-gray-500 text-xs-medium tablet:text-md-medium">
              초대하기
            </div>
          </button>
        </div>
        <div className="flex w-fit flex-row gap-4 tablet:gap-6 laptop:gap-[38px]">
          <div
            className=" w-[90px] laptop:w-[138px]"
            style={{ display: display }}
          >
            {members && <Badges memberList={members} />}
          </div>
          <div className="h-[38px] w-[1px] bg-gray-300" />
          <Profile
            nickname={store.userNickname}
            profileImageUrl={store.profileImageUrl}
            isProfile
          />
        </div>
      </div>
    </div>
  );
}
