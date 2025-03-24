import { useEffect, useState, useRef, useCallback } from "react";
import { getInvitations, respondToInvitation } from "@/api/invitations";
import { InvitationType } from "@/api/invitations";
import ListInvDash from "@/components/InvitedDashboards/List.InvDash";
import SearchInvDash from "@/components/InvitedDashboards/Search.InvDash";
import Image from "next/image";
import NoInvitationIcon from "@/assets/icons/NoInvitation.icon.svg";

const InvitedDashboards: React.FC = () => {
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [hasInitialInvites, setHasInitialInvites] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchInvitations = useCallback(
    async (isReset = false) => {
      if (!isReset && loading) return;

      if (isReset) {
        setCursorId(undefined);
        setHasMore(true);
      }

      setLoading(true);
      setError("");

      try {
        const response = await getInvitations(
          10,
          isReset ? undefined : cursorId,
          searchTitle
        );
        const newInvites = response.invitations;

        if (isReset) {
          setInvitations(newInvites);
        } else {
          setInvitations((prev) => [...prev, ...newInvites]);
        }

        if (newInvites.length < 10) {
          setHasMore(false);
        } else {
          setCursorId(newInvites[newInvites.length - 1].id);
        }
      } catch (err) {
        console.error("불러오기 실패", err);
        setError("불러오기 실패");
      } finally {
        setLoading(false);
      }
    },

    [cursorId, searchTitle, loading]
  );

  useEffect(() => {
    fetchInvitations(true);
  }, [searchTitle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchInvitations();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchInvitations, hasMore, loading]);

  useEffect(() => {
    if (!loading && invitations.length > 0) {
      setHasInitialInvites(true);
    }
  }, [invitations, loading]);

  const handleRespond = async (id: number, accepted: boolean) => {
    try {
      await respondToInvitation(id, accepted);
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error("초대 응답 실패", error);
    }
  };

  return (
    <div className="desktop:w-[960px] tablet:w-[504px] w-[260px] desktop:min-h-[390px] tablet:min-h-[390px] min-h-[327px] h-fit tablet:rounded-[16px]  rounded-[8px] bg-white  pt-[24px] flex flex-col justify-center tablet:px-[40px] px-[20px]">
      <div className="desktop:w-full h-fit">
        <h2 className="tablet:text-2xl-bold text-md-bold">초대받은 대시보드</h2>

        {loading && invitations.length === 0 ? (
          <p className="tablet:mt-[64px] mt-[105px] text-gray-400 tablet:text-2lg-regular text-xs-regular text-center">
            불러오는 중...
          </p>
        ) : error ? (
          <p className="tablet:mt-[64px] mt-[105px] text-red tablet:text-2lg-regular text-xs-regular text-center">
            {error}
          </p>
        ) : invitations.length === 0 && !hasInitialInvites ? (
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
          <div className="pt-[16px] tablet:pt-[17px] tablet:pb-[18px] pb-[24px] desktop:py-[32px] w-full">
            {hasInitialInvites && (
              <SearchInvDash value={searchTitle} onChange={setSearchTitle} />
            )}
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
            {invitations.length === 0 && hasInitialInvites ? (
              <p className="text-gray-400 tablet:text-2lg-regular text-xs-regular mt-[64px] text-center">
                "{searchTitle}"에 대한 검색 결과가 없어요
              </p>
            ) : (
              <div className="overflow-x-hidden overflow-y-auto tablet:max-h-[calc(100dvh_-_580px)] h-fit">
                <ListInvDash
                  invitations={invitations}
                  onRespond={handleRespond}
                />
                <div ref={observerRef} className="w-full h-[1px]" />
              </div>
            )}
            {loading && (
              <p className="mt-[64px] tablet:text-2lg-regular text-xs-regular text-center text-gray-400">
                불러오는 중...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedDashboards;
