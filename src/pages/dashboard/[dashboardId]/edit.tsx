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
import EditDashboard from "@/components/ModalContents/EditDashboard";
//
export default function EditPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dashboardInfo, setDashboardInfo] = useState({
    title: "",
    color: "",
  });
  let dashboardId = "";
  let pageCount = 0;
  useEffect(() => {
    if (router.isReady) {
      if (
        router.query.dashboardId &&
        typeof router.query.dashboardId === "string"
      ) {
        dashboardId = router.query.dashboardId;
      }
    }
    setIsClient(true);
    handleLoad();
  }, [router.isReady]);
  //
  const handleLoad = async () => {
    if (!isClient) return;
    const dashboard = await getDashboardInfo(dashboardId);
    const getInvitation = {
      dashboardId,
      page: currentPage + 1,
    };
    const members = await getMember(dashboardId);
    const { totalCount, invitations } = await getDashboardInvitations({
      getInvitation,
    });
    setDashboardInfo(dashboard);
    console.log(dashboardInfo);
    setMembers(members);
    setInvitations(invitations);
    pageCount = totalCount;
  };
  const DashBoardDelete = async () => {
    await deleteDashboard({ dashboardId });
    router.push("/mydashboard");
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
              <EditDashboard
                title={dashboardInfo.title}
                color={dashboardInfo.color}
                dashboardId={dashboardId}
              ></EditDashboard>
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
