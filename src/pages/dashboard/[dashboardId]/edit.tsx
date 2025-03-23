import Header from "@/components/common/Header";
import EditMember from "@/components/EditMember";
import InvitationHistory from "@/components/InvitationHistory";
import { getMember } from "@/api/member";
import { useEffect, useState } from "react";
import { DashButton } from "@/components/common/Button";
import {
  deleteDashboard,
  getDashboardInfo,
  getDashboardInvitations,
} from "@/api/dashboard";
import arrow from "@/assets/icons/LeftArrow.icon.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import EditDashboard from "@/components/EditDashboard";
import Link from "next/link";
//멤버 채운뒤에 멤버 삭제 테스트 필요함
export default function EditPage() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dashboardInfo, setDashboardInfo] = useState({
    title: "",
    color: "",
    createdByme: false,
  });
  //
  useEffect(() => {
    if (dashboardId) {
      handleLoad();
    }
  }, [dashboardId]);
  //
  const handleLoad = async () => {
    const dashboard = await getDashboardInfo(dashboardId as string);
    const members = await getMember(dashboardId as string);
    const { invitations } = await getDashboardInvitations(
      currentPage + 1,
      dashboardId as string
    );
    setDashboardInfo((prev) => ({
      ...prev,
      title: dashboard.title,
      color: dashboard.color,
      createdByme: dashboard.createdByMe,
    }));
    setCurrentPage((prev) => prev + 1);
    setMembers(members);
    setInvitations(invitations);
  };
  const DashBoardDelete = async () => {
    await deleteDashboard(dashboardId as string);
    router.push("/mydashboard");
  };
  return (
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <Header createdByMe={dashboardInfo.createdByme} members={members} />
      <div className="px-3  min-w-[284px] tablet:max-w-[584px] laptop:w-[620px] py-4 tablet:px-5 tablet:py-5 ">
        <div className="flex flex-col gap-[10px] tablet:gap-[19px] laptop:gap-[34px]">
          <Link href={`/dashboard/${dashboardId}`}>
            <button className="flex items-start">
              <Image src={arrow} width={20} height={20} alt="<" />
              돌아가기
            </button>
          </Link>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <EditDashboard
                title={dashboardInfo.title}
                color={dashboardInfo.color}
                dashboardId={router.query.dashboardId as string}
              ></EditDashboard>
              <EditMember members={members} />
              <InvitationHistory invitations={invitations} />
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
