import Image from "next/image";
import { useState } from "react";
import { cancelInvite } from "@/api/dashboard";
import { Button, PaginationButton } from "./common/Button";
import InviteIcon from "@/assets/icons/white.Invite.icons.svg";

//취소한뒤에 바로 사라지는지 테스트

interface Props {
  invitations: Invitation[];
}

export default function InvitationHistory({ invitations }: Props) {
  const [currentList, setCureentList] = useState(invitations);
  //
  const totalPage =
    Math.ceil(invitations.length / 4) < 1
      ? 1
      : Math.ceil(invitations.length / 4);
  const [page, setPage] = useState(1);

  const PrevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };
  const NextPage = () => {
    if (page === totalPage) return;
    setPage((prev) => prev + 1);
  };

  const AddInvite = () => {
    //초대하기 모달 팝업 됨.
  };

  const CancelInvite = async (dashboardId: string, invitationId: number) => {
    await cancelInvite(dashboardId, invitationId);
    setCureentList(currentList.filter((item) => item.id !== invitationId));
  };
  return (
    <div
      className="flex flex-col gap-[26px] tablet:gap-[17px] bg-white rounded-lg w-full h-[406px]  tablet:h-[477px]   laptop:h-[477px] 
    pt-6 pb-3 tablet:pt-8 tablet:pb-0 "
    >
      <div className="flex flex-col gap-3 tablet:gap-8">
        <div className="flex items-center justify-between px-5 tablet:px-7">
          <p className=" text-2lg-bold tablet-text-2xl-bold"> 초대 내역</p>
          <div className="flex items-center gap-3 text-xs-regular tablet-text-md-regular">
            <p>
              {totalPage} 페이지 중 {page}
            </p>
            <div>
              <PaginationButton
                onNext={NextPage}
                onPrev={PrevPage}
                hasNext={totalPage > page}
                hasPrev={totalPage < page}
              />
            </div>
            <div
              className="hidden w-[86px] h-[26px] tablet:block tablet:w-[105px] tablet:h-8"
              onClick={AddInvite}
            >
              <Button size="xsmall">
                <Image src={InviteIcon} width={16} height={16} alt="+" />
                초대하기
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 tablet:px-7">
          <p className="text-gray-400 text-md-regular">이메일</p>
          <div className="tablet:hidden w-[86px] h-[26px]" onClick={AddInvite}>
            <Button size="xsmall">
              <Image src={InviteIcon} width={16} height={16} alt="+" />
              초대하기
            </Button>
          </div>
        </div>
      </div>
      <div>
        {currentList.length > 1 &&
          currentList.map((invitation, i) => {
            return (
              <>
                <div
                  key={invitation.id}
                  className="flex justify-between px-5 py-4 tablet:px-7"
                >
                  <p className="text-black-200 text-lg-regular ">
                    {invitation.invitee.email}
                  </p>
                  <div className="w-[52px] h-[32px] tablet:w-[84px]">
                    <Button
                      onClick={() =>
                        CancelInvite(
                          String(invitation.dashboard.id),
                          invitation.id
                        )
                      }
                      size="xsmall"
                      variant="secondary"
                    >
                      취소
                    </Button>
                  </div>
                </div>
                <div
                  className="h-[1px] w-full bg-gray-200"
                  style={{ display: i === 4 ? "none" : "block" }}
                />
              </>
            );
          })}
      </div>
    </div>
  );
}
