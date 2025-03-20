import { useState } from "react";
import PrevPage from "@/assets/icons/PrevPage.icon.svg";
import NextPage from "@/assets/icons/NextPage.icon.svg";
import Image from "next/image";
import Profile from "./common/Profile";
import { deleteMember } from "@/api/member";
//
interface Props {
  members: User[];
}
/**ToDo
 * 삭제 버튼 공통컴포넌트로 바꾸기
 * 멤버 삭제 버튼클릭시 함수
 */
export default function EditMember({ members }: Props) {
  const totalPage = Math.ceil(members.length / 4);
  const [currentPage, setCurrentPage] = useState(1);
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
  };
  //
  return (
    <div
      className="flex flex-col  max-w-[284px] max-h-[337px] tablet:max-w-[544px] tablet:max-h-[404px] laptop:max-w-[620px] laptop:max-h-[404px] 
      pt-[22px] pb-4 tablet:pt-[26px] tablet:pb-5 gap-[13px]"
    >
      <div className="flex flex-col gap-[18px]">
        <div className="flex items-center justify-between px-5 tablet:px-7 ">
          <p className="text-xl-bold tablet-text-2xl-bold">구성원</p>
          <div className="flex items-center gap-3 text-xs-regular tablet-text-md-regular">
            {totalPage} 페이지 중 {currentPage}
            <div>
              <button className="cursor-pointer" onClick={handleClickPrev}>
                <Image src={PrevPage} width={40} height={40} alt="<" />
              </button>
              <button className="cursor-pointer" onClick={handleClickNext}>
                <Image src={NextPage} width={40} height={40} alt=">" />
              </button>
            </div>
          </div>
        </div>
        <p className="px-5 text-gray-400 tablet:px-7 md-regular">이름</p>
      </div>
      <div>
        {members.map((member, i) => {
          return (
            <div>
              <div className="flex items-center justify-between px-5 tablet:px-7 h-[34px] tablet:h-[38px]">
                <Profile
                  nickname={member.nickname}
                  profileImageUrl={member.profileImageUrl}
                  isProfile
                />
                <button onClick={() => handleClick(member.userId || 0)}>
                  삭제
                </button>
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
