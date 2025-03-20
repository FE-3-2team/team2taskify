import Header from "@/components/common/Header";
import EditMember from "@/components/EditMember";
import InvitationHistory from "@/components/InvitationHistory";
import NewDashboard from "@/components/ModalContents/NewDashboard";
import { getMember } from "@/api/member";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { getInvitations } from "@/api/invitations.api";
import { useState } from "react";
import { Button, DashButton } from "@/components/common/Button";
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
  let result;
  const { dashboardId } = context.params!;
  try {
    const res = await getMember(Number(dashboardId));
    const invitationData = await getInvitations((cursorId = 0));
    const members = res.data.results;
    const { cursorId: newCursorId, invitations } = invitationData;
    cursorId = newCursorId;
    result = { invitations, members };
  } catch {
    result = { invitations: [], members: [] };
  }
  const { invitations, members } = result;
  return {
    props: {
      initialMembers: members,
      initialInivitations: invitations,
    },
  };
};

interface Props {
  initialMembers: Member[];
  initialInivitations: Invitation[];
}
export default function EditPage({
  initialMembers,
  initialInivitations,
}: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [invitations, setInvitations] = useState(initialInivitations);
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
