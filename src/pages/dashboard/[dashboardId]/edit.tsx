"use client";
import Header from "@/components/common/Header";
import EditMember from "@/components/EditMember";
import InvitationHistory from "@/components/InvitationHistory";
import { getMember } from "@/api/member";
import { getInvitations } from "@/api/invitations.api";
import { useEffect, useState } from "react";
import { DashButton } from "@/components/common/Button";
import { deleteDashboard } from "@/api/dashboard";
import arrow from "@/assets/icons/LeftArrow.icon.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import EditDashboard from "@/components/ModalContents/EditDashboard";
import { useParams } from "next/navigation";
//
export default function EditPage() {
  const router = useRouter();
  const { dashboardId } = useParams();
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  let pageCount;
  const handleLoad = async () => {
    const members = await getMember(Number(dashboardId));
    const { totalCount, invitations } = await getInvitations(currentPage + 1);
    setMembers(members);
    setInvitations(invitations);
    pageCount = totalCount;
  };

  useEffect(() => {
    handleLoad();
  }, []);
  const DashBoardDelete = async () => {
    await deleteDashboard(Number(dashboardId));
    router.push("/mypage");
  };

  return (
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <Header />
      <div className="px-3  min-w-[284px] tablet:max-w-[584px] laptop:w-[620px] py-4 tablet:px-5 tablet:py-5 ">
        <div className="flex flex-col gap-[10px] tablet:gap-[19px] laptop:gap-[34px]">
          <button className="flex items-start">
            <Image src={arrow} width={20} height={20} alt="<" />
            돌아가기
          </button>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <EditDashboard title={} color={}></EditDashboard>
              <EditMember members={members} />
              <InvitationHistory count={pageCount} invitations={invitations} />
            </div>
            <div className=" tablet:w-[320px] h-[52px] tablet:h-[62px] ">
              <DashButton onClick={DashBoardDelete} size="medium">
                대시보드 삭제하기
              </DashButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
