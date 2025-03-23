import { useEffect, useState } from "react";
import { getInvitations, respondToInvitation } from "@/api/invitations";
import { InvitationType } from "@/api/invitations";
import ListInvDash from "@/components/common/InvitedDashboards/List.InvDash";
import SearchInvDash from "@/components/common/InvitedDashboards/Search.InvDash";
import Image from "next/image";
import NoInvitationIcon from "@/assets/icons/NoInvitation.icon.svg";

const InvitedDashboards: React.FC = () => {
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

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

  const handleRespond = async (id: number, accepted: boolean) => {
    try {
      await respondToInvitation(id, accepted);
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error("초대 응답 실패", error);
    }
  };

  return (
    <div className="desktop:w-[960px] desktop:min-h-[390px] tablet:w-[504px] tablet:min-h-[390px] w-[260px] min-h-[327px] h-fit desktop:px-[28px] rounded-[8px] bg-white px-[20px]  tablet:px-[40px] pt-[24px] flex flex-col items-center justify-center">
      <div className="desktop:w-full tablet:w-[448px] w-[228px] h-fit">
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
            <div className="relative tablet:w-[100px] tablet:h-[100px] w-[60px] h-[60px]">
              <Image
                src={NoInvitationIcon}
                alt="no-invitation"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 tablet:text-2lg-regular text-xs-regular">
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        ) : (
          <div className="pt-[16px] tablet:pt-[17px] tablet:pb-[18px] pb-[24px] desktop:py-[32px] tablet:pb-[18px] w-full">
            <SearchInvDash value={searchTitle} onChange={setSearchTitle} />
            <div className="tablet:flex items-center justify-between w-full tablet:h-[26px] hidden text-lg-regular text-gray-400 tablet:mt-[24px] mt-[27px]">
              <h3 className="inline-flex desktop:w-[254px] tablet:w-[154px]">
                이름
              </h3>
              <h3 className="inline-flex justify-center tablet:w-[100px]">
                초대자
              </h3>
              <h3 className="inline-flex desktop:w-[178px] tablet:w-[154px] justify-center">
                수락 여부
              </h3>
            </div>
            <ListInvDash invitations={invitations} onRespond={handleRespond} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedDashboards;
