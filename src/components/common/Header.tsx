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
import { useEffect, useState } from "react";
import { getMember } from "@/api/member";
import { Modal } from "./ModalPopup";
import InputModal from "../ModalContents/InputModal";
import { createInvite } from "@/api/dashboard";
import ProfileSelect from "./Dropdown/Profile.D.D";

interface Props {
  createdByMe?: boolean;
}

export default function Header({ createdByMe }: Props) {
  const store = useStore(useAuthStore, (state) => state);
  const dashboardId = Number(store?.dashboardId);
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [inviteValue, setInviteValue] = useState("");
  const dashboardTitle =
    router.pathname === "/mypage"
      ? "계정관리"
      : router.pathname === "/mydashboard"
        ? `${store?.userNickname}님의 대시보드`
        : store?.dashboardTitle;

  useEffect(() => {
    handleLoadDashboardInfo();
  }, [dashboardId, router.pathname]);

  const handleLoadDashboardInfo = async () => {
    if (!dashboardId) return;

    if (router.pathname !== "/mydashboard") {
      const { members } = await getMember(1, dashboardId, 4);
      setMembers(members);
    }
  };

  const inviteMember = async () => {
    if (!dashboardId) return;
    try {
      await createInvite(inviteValue, dashboardId);
    } catch {}
  };

  //
  return (
    <div className="flex bg-white flex-row justify-between w-full h-[70px] py-[15px] px-[8px] tablet:pl-[74px] tablet:pr-[32px] laptop:pr-[80px] border-b-[1px] items-center border-gray-300 ">
      <div className="flex flex-row items-center gap-2">
        <p className="hidden laptop:block text-black-200 text-xl-bold ">
          {dashboardTitle}
        </p>
        {createdByMe && (
          <div className="hidden laptop:block">
            <Image src={Crown} width={20} height={24} alt="mine" />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-[16px] tablet:gap-[36px] laptop:gap-[40px]">
        {createdByMe && (
          <div className="flex flex-row gap-2 tablet:gap-4">
            {router.pathname !== "/mydashboard" && (
              <Link href={`${dashboardId}/edit`}>
                <button className="justify-center h-[40px] flex flex-row items-center py-[7px] px-2 tablet:px-4 gap-2 rounded-lg border-[1px] border-gray-300">
                  <Image
                    className="hidden tablet:block"
                    src={Edit}
                    width={18}
                    height={18}
                    alt="톱니바퀴"
                  />
                  <div className="text-gray-500 text-md-medium tablet:text-lg-medium">
                    관리
                  </div>
                </button>
              </Link>
            )}
            {router.pathname !== "/mydashboard" && (
              <div className="h-[40px]">
                <Modal
                  ModalOpenButton={
                    <div className="justify-center items-center  flex flex-row  py-[7px] px-2 tablet:px-4 gap-2 ">
                      <Image
                        className="hidden tablet:block"
                        src={Invite}
                        width={18}
                        height={18}
                        alt="+"
                      />
                      <div className="text-gray-500 text-md-medium tablet:text-lg-medium">
                        초대하기
                      </div>
                    </div>
                  }
                  variant="outline"
                  rightHandlerText="초대"
                  rightOnClick={inviteMember}
                >
                  <InputModal
                    variant="email"
                    label="이메일"
                    title="초대하기"
                    placeholder="이메일을 입력해주세요."
                    changeValue={(value) => setInviteValue(value)}
                  />
                </Modal>
              </div>
            )}
          </div>
        )}
        <div className="flex w-fit flex-row gap-[4px] tablet:gap-[36px] laptop:gap-[40px]">
          <div
            style={{
              display: members && members.length > 0 ? "block" : "none",
            }}
          >
            {members && <Badges memberList={members} />}
          </div>
          <div className="h-[38px] w-[1px] bg-gray-300" />
          {store && (
            <ProfileSelect>
              <Profile
                nickname={store.userNickname}
                profileImageUrl={store.profileImageUrl}
                type="profile"
              />
            </ProfileSelect>
          )}
        </div>
      </div>
    </div>
  );
}
