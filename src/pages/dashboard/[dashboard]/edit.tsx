import Header from "@/components/common/Header";
import EditMember from "@/components/EditMember";
import InvitationHistory from "@/components/InvitationHistory";
import NewDashboard from "@/components/ModalContents/NewDashboard";
import { getMember } from "@/api/member";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { getInvitations } from "@/api/invitations.api";
import { useState } from "react";
import { DashButton } from "@/components/common/Button";
import { deleteDashboard } from "@/api/dashboard";
import { useRouter } from "next/router";
//

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let cursorId;
  let initialMembers;
  let initialInvitations;
  let result;
  const { dashboardId } = context.params!;
  try {
    const res = await getMember(Number(dashboardId));
    const invitationData = await getInvitations((cursorId = 0));
    initialMembers = res.data.results;
    const { cursorId: newCursorId, invitations: initialInivitations } =
      invitationData;
    cursorId = newCursorId === null ? 0 : newCursorId;
    result = { initialInvitations, initialMembers };
  } catch {
    result = { initialInvitations: [], initialMembers: [] };
  }
  return {
    props: {
      initialMembers,
      initialInvitations,
      dashboardId,
    },
  };
};

interface Props {
  initialMembers: Member[];
  initialInvitations: Invitation[];
  dashboardId: string;
}
export default function EditPage({
  initialMembers,
  initialInvitations,
  dashboardId,
}: Props) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [invitations, setInvitations] = useState(initialInvitations);

  const DashBoardDelete = async () => {
    await deleteDashboard(Number(dashboardId));
    router.push("/mypage");
  };
  return (
    <div className="px-3 py-4 tablet:px-5 tablet:py-5">
      <Header />

      <div className="flex flex-col gap-[10px] tablet:gap-[19px] laptop:gap-[34px]">
        <button className="flex items-start">{"<돌아가기"}</button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <NewDashboard />
            <EditMember members={members} />
            <InvitationHistory invitations={invitations} />
          </div>
          <div className=" tablet:w-[320px] h-[52px] tablet:h-[62px] ">
            <DashButton size="medium">대시보드 삭제하기</DashButton>
          </div>
        </div>
      </div>
    </div>
  );
}
