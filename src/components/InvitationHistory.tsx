import Image from "next/image";
import { useState } from "react";
import Next from "@/assets/icons/NextPage.icon.svg";
import Prev from "@/assets/icons/PrevPage.icon.svg";
import { cancelInvite } from "@/api/dashboard";

/**To Do
 * 초대하기 버튼 나중에 바꾸기
 *
 */
interface Props {
  invitations: Invitation[];
}
export default function InvitationHistory({ invitations }: Props) {
  const totalPage = Math.ceil(invitations.length / 5);
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

  const CancelInvite = async (dashboardId: number, invitationId: number) => {
    await cancelInvite(dashboardId, invitationId);
  };
  return (
    <div
      className="rounded-b-lg w-[284px] h-[406px] tablet:w-[544px] tablet:h-[477px]  laptop:w-[620px] laptop:h-[477px] 
    pt-6 pb-3 tablet:pt-8 tablet:pb-0"
    >
      <div className="flex items-center justify-between px-5 tablet:px-7">
        <p className=" text-xl-bold tablet:text-2xl-bold"> 초대 내역</p>
        <div className="flex items-center gap-4">
          <p>
            {totalPage} 페이지 중 {page}
          </p>
          <div>
            <button onClick={PrevPage}>
              <Image src={Prev} width={40} height={40} alt="<" />
            </button>
            <button onClick={NextPage}>
              <Image src={Next} width={40} height={40} alt=">" />
            </button>
          </div>
          <button className="hidden tablet:block">초대하기</button>
        </div>
      </div>
      <div className="flex justify-between px-5 tablet:px-7">
        <p className="text-gray-9FA6B2 text-md-regular">이메일</p>
        <button className="block tablet:hidden" onClick={AddInvite}>
          초대하기
        </button>
      </div>
      <div>
        {invitations.map((invitation, i) => {
          return (
            <>
              <div className="flex justify-between px-5 py-4 tablet:px-7">
                <p className="text-black_333236 text-lg-regular">
                  {invitation.invitee.email}
                </p>
                <button
                  onClick={() => {
                    CancelInvite(
                      invitation.dashboard.id,
                      invitation.invitee.id
                    );
                  }}
                >
                  취소
                </button>
              </div>
              <div
                className="h-[1px] w-full bg-gray-EEEEEE"
                style={{ display: i === 4 ? "none" : "block" }}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
