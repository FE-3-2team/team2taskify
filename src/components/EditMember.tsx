import { useEffect, useState } from "react";
import Profile from "./common/Profile";
import { deleteMember, getMember } from "@/api/member";
import { Button, PaginationButton } from "./common/Button";
//

interface Props {
  dashboardId: string;
}
export default function EditMember({ dashboardId }: Props) {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMember, setCurrentMember] = useState<Member[]>([]);

  useEffect(() => {
    handleLoadMembers();
  }, [currentPage, dashboardId]);
  //

  const handleLoadMembers = async () => {
    if (!dashboardId) return;
    const { members, totalCount } = await getMember(currentPage, dashboardId);
    setTotalPage(Math.ceil(totalCount / 4));
    setCurrentMember(members);
  };

  const handleClickPrev = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  const handleClickNext = () => {
    if (currentPage === totalPage) return;
    setCurrentPage((prev) => prev + 1);
  };
  const handleClick = async (id: number) => {
    await deleteMember(id);
    if (currentMember.length === 1) {
      if (currentPage === 1) return;
      setCurrentPage((prev) => prev - 1);
    }
    setCurrentMember((prev) => prev.filter((member) => member.id !== id));
  };
  //
  return (
    <div
      className="flex flex-col rounded-lg w-full max-h-[337px]  tablet:max-h-[404px] bg-white laptop:max-h-[404px] 
      pt-[22px] pb-4 tablet:pt-[26px] tablet:pb-5 gap-[13px]"
    >
      <div className="flex flex-col gap-[18px]">
        <div className="flex items-center justify-between px-5 tablet:px-7 ">
          <p className="text-xl-bold tablet-text-2xl-bold">구성원</p>
          <div className="flex items-center gap-3 text-xs-regular tablet-text-md-regular">
            {totalPage} 페이지 중 {currentPage}
            <div>
              <PaginationButton
                onNext={handleClickNext}
                onPrev={handleClickPrev}
                hasNext={totalPage > currentPage}
                hasPrev={1 < currentPage}
              />
            </div>
          </div>
        </div>
        <p className="px-5 text-gray-400 tablet:px-7 md-regular">이름</p>
      </div>
      <div>
        {currentMember.map((member, i) => {
          return (
            <div key={member.id}>
              <div className="flex items-center justify-between px-5 tablet:px-7 h-[34px] tablet:h-[38px]">
                <Profile
                  nickname={member.nickname}
                  profileImageUrl={member.profileImageUrl}
                  type="profile"
                />
                <div className="w-[52px] h-[32px] tablet:w-[84px]">
                  <Button
                    onClick={() => handleClick(member.id)}
                    size="xsmall"
                    variant="secondary"
                  >
                    삭제
                  </Button>
                </div>
              </div>
              <div
                className="h-[1px] w-full bg-gray-200 my-3"
                style={{ display: i === 3 ? "none" : "block" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
