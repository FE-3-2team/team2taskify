import Image from "next/image";
import { useEffect, useState } from "react";
import * as A from "@/api/dashboard";
import { Button, PaginationButton } from "./common/Button";
import InviteIcon from "@/assets/icons/white.Invite.icons.svg";
import { Modal } from "./common/ModalPopup";
import InputModal from "./ModalContents/InputModal";
import useAuthStore from "@/utils/Zustand/zustand";
import { useStore } from "zustand";

//To do
//에러 코드에 따라서 토스트 띄우기
export default function InvitationHistory() {
  const store = useStore(useAuthStore, (state) => state);
  const dashboardId = store.dashboardId as string;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState<Invitation[]>([]);
  const [emailValue, setEmailValue] = useState("");
  //
  useEffect(() => {
    handleLoad();
  }, [dashboardId, currentPage]);

  const handleLoad = async () => {
    if (!dashboardId) return;
    const { invitations, totalCount } = await A.getDashboardInvitations(
      currentPage,
      dashboardId
    );
    setTotalPage(Math.ceil(totalCount / 5));
    setCurrentList(invitations);
  };

  const PrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  const NextPage = () => {
    if (currentPage === totalPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  const AddInvite = async () => {
    const isDuplicate = currentList.some(
      (item) => item.invitee.email === emailValue
    );
    if (isDuplicate) return;
    const newInvite = await A.createInvite(emailValue, dashboardId);
    if (currentList.length > 4) {
      if (currentPage === 1) {
        setCurrentPage((prev) => prev + 1);
        return;
      }
      setCurrentPage(1);
    }
    setCurrentList((prev) => [...prev, newInvite]);
  };

  const CancelInvite = async (dashboardId: string, invitationId: number) => {
    await A.cancelInvite(dashboardId, invitationId);
    setCurrentList((prev) => prev.filter((item) => item.id !== invitationId));
    if (currentList.length === 1) {
      if (currentPage === 1) return;
      setCurrentPage((prev) => prev - 1);
    }
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
              {totalPage} 페이지 중 {currentPage}
            </p>
            <div>
              <PaginationButton
                onNext={NextPage}
                onPrev={PrevPage}
                hasNext={totalPage > currentPage}
                hasPrev={1 < currentPage}
              />
            </div>
            <div className="hidden w-[86px] h-[26px] tablet:block tablet:w-[105px] tablet:h-8">
              <Modal
                ModalOpenButton={
                  <div className="flex">
                    <Image src={InviteIcon} width={16} height={16} alt="+" />
                    초대하기
                  </div>
                }
                size="xsmall"
                rightHandlerText="초대 하기"
                rightOnClick={AddInvite}
              >
                <InputModal
                  title="초대하기"
                  label="이메일"
                  placeholder="이메일을 입력해주세요"
                  changeValue={(value) => setEmailValue(value)}
                />
              </Modal>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 tablet:px-7">
          <p className="text-gray-400 text-md-regular">이메일</p>
          <div className="tablet:hidden w-[86px] h-[26px]">
            <Modal
              ModalOpenButton={
                <div className="flex">
                  <Image src={InviteIcon} width={16} height={16} alt="+" />
                  초대하기
                </div>
              }
              size="xsmall"
              rightHandlerText="초대 하기"
              rightOnClick={AddInvite}
            >
              <InputModal
                title="초대하기"
                label="이메일"
                placeholder="이메일을 입력해주세요"
                changeValue={(value) => setEmailValue(value)}
              />
            </Modal>
          </div>
        </div>
      </div>
      <div>
        {currentList.length >= 1 &&
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
                      onClick={() => CancelInvite(dashboardId, invitation.id)}
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
