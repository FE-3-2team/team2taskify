import Header from "@/components/common/Header";
import EditMember from "@/components/EditMember";
import InvitationHistory from "@/components/InvitationHistory";
import { useEffect, useState } from "react";
import { DashButton } from "@/components/common/Button";
import { deleteDashboard, getDashboardInfo } from "@/api/dashboard";
import arrow from "@/assets/icons/LeftArrow.icon.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import EditDashboard from "@/components/EditDashboard";
import Link from "next/link";
import SideMenu from "@/components/common/SideMenu";
//
export default function EditPage() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [dashboardInfo, setDashboardInfo] = useState({
    title: "",
    color: "",
  });
  //
  useEffect(() => {
    if (dashboardId) {
      handleLoad();
    }
  }, []);
  //
  const handleLoad = async () => {
    const dashboard = await getDashboardInfo(Number(dashboardId));

    setDashboardInfo((prev) => ({
      ...prev,
      title: dashboard.title,
      color: dashboard.color,
    }));
  };
  const DashBoardDelete = async () => {
    await deleteDashboard(dashboardId as string);
    router.push("/mydashboard");
  };

  return (
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <SideMenu />
      <Header />
      <div className="px-3 tablet:px-5">
        <div className="flex max-w-[620px] flex-col gap-[10px] tablet:gap-[19px] laptop:gap-[34px]">
          <Link className="mt-5 " href={`/dashboard/${dashboardId}`}>
            <button className="flex items-start">
              <Image src={arrow} width={20} height={20} alt="<" />
              돌아가기
            </button>
          </Link>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <EditDashboard
                title={dashboardInfo.title}
                dashboardId={router.query.dashboardId as string}
              ></EditDashboard>
              <EditMember dashboardId={dashboardId as string} />
              <InvitationHistory />
            </div>
            <div className=" tablet:w-[320px] h-[52px] tablet:h-[62px] mb-[124px] tablet:mb-[72px] laptop:mb-[57px]">
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
