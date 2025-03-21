import { useEffect, useState } from "react";
import { getInvitations } from "@/api/invitations";
import ListInvDash from "@/components/common/InvitedDashboards/List.InvDash";
import SearchInvDash from "@/components/common/InvitedDashboards/Search.InvDash";

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

const InvitedDashboards: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const TEAM_ID = "13-2";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getInvitations(10, undefined, searchTitle);
        setInvitations(response.invitations);
      } catch (err) {
        setError("불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTitle]);

  return (
    <div className="desktop:w-[960px] desktop:min-h-[390px] tablet:w-[504px] tablet:min-h-[390px] w-[260px] min-h-[327px] h-fit rounded-[8px] bg-white px-[20px] tablet:px-[40px] pt-[24px]">
      <div className="w-full h-fit">
        <h2 className="tablet:text-2xl-bold text-md-bold">초대받은 대시보드</h2>

        {loading ? (
          <p className="tablet:mt-[64px] mt-[105px] text-gray-400 tablet:text-2lg-regular text-xs-regular text-center">
            불러오는 중...
          </p>
        ) : error ? (
          <p className="tablet:mt-[64px] mt-[105px] text-red tablet:text-2lg-regular text-xs-regular text-center">
            {error}
          </p>
        ) : invitations.length === 0 ? (
          <div className="tablet:mt-[64px] mt-[105px] flex flex-col items-center justify-center gap-[16px]">
            <div className="bg-[url(@/assets/icons/NoInvitation.icon.svg)] tablet:w-[100px] tablet:h-[100px] w-[60px] h-[60px] bg-contain bg-no-repeat" />
            <p className="text-gray-400 tablet:text-2lg-regular text-xs-regular">
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        ) : (
          <div className="pt-[16px] tablet:pt-[17px] pb-[24px] desktop:py-[32px] tablet:pb-[18px]">
            <SearchInvDash value={searchTitle} onChange={setSearchTitle} />
            <ListInvDash invitations={invitations} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedDashboards;
