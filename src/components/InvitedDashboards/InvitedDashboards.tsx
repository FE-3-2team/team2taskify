import { useEffect, useState, useRef, useCallback } from "react";
import { getInvitations, respondToInvitation } from "@/api/invitations";
import ListInvDash from "@/components/InvitedDashboards/List.InvDash";
import SearchInvDash from "@/components/InvitedDashboards/Search.InvDash";
import Image from "next/image";
import NoInvitationIcon from "@/assets/icons/NoInvitation.icon.svg";

const InvitedDashboards: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
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
    <div className=" min-h-[327px] tablet:h-[592px] laptop:h-[650px] relative tablet:rounded-[16px]  rounded-[8px] bg-white  pt-[24px] flex flex-col">
      <h2 className="absolute top-0 h-10 mt-6 bg-white tablet:left-10 left-5 tablet:text-2xl-bold text-md-bold">
        초대받은 대시보드
      </h2>

      {loading && invitations.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-center text-gray-400 tablet:text-2lg-regular text-xs-regular">
            불러오는 중...
          </p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-center text-red tablet:text-2lg-regular text-xs-regular">
            {error}
          </p>
        </div>
      ) : invitations.length === 0 && !hasInitialInvites ? (
        <div className="flex flex-col items-center justify-center gap-[16px]">
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
        <div className="flex flex-col w-full gap-3 py-10 tablet:gap-6">
          <div className="w-full px-5 tablet:mt-8 tablet:px-10">
            {hasInitialInvites && (
              <SearchInvDash value={searchTitle} onChange={setSearchTitle} />
            )}
          </div>
          <div className="flex flex-col gap-[17px] laptop:gap-5">
            <div className=" px-7 laptop:px-[76px] tablet:flex items-center justify-between w-full tablet:h-[26px] hidden text-lg-regular text-gray-400 ">
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
              <div className="h-full overflow-y-auto">
                <ListInvDash
                  invitations={invitations}
                  onRespond={handleRespond}
                />
                <div ref={observerRef} className="w-full h-[50px]" />
              </div>
            )}
          </div>
          {loading && (
            <p className="mt-[64px] tablet:text-2lg-regular text-xs-regular text-center text-gray-400">
              불러오는 중...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InvitedDashboards;
