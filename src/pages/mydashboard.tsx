import { createDashboard, getDashboards } from "@/api/dashboard";
import Header from "@/components/common/Header";
import { Modal } from "@/components/common/ModalPopup";
import NewDashboard from "@/components/ModalContents/NewDashboard";
import { useEffect, useState } from "react";
import {
  DashButton,
  PaginationButton,
  PlusIconButton,
} from "@/components/common/Button";
import InvitedDashboards from "@/components/InvitedDashboards/InvitedDashboards";
import Link from "next/link";
import { useRouter } from "next/router";

export interface Data {
  title: string;
  color: string;
}
export default function MyDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [boardList, setBoardList] = useState<Dashboards[]>([]);
  const [newColor, setNewColor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const router = useRouter();
  useEffect(() => {
    handleLoad();
  }, [currentPage]);
  //
  const handleLoad = async () => {
    const { totalCount, dashboards } = await getDashboards(currentPage, 5);
    setBoardList(dashboards);
    setTotalPage(Math.ceil(totalCount / 5));
  };
  const plusDashboard = async () => {
    const createdDashboard = await createDashboard(newTitle, newColor);
    router.push(`/dashboard/${createdDashboard.id}`);
  };
  const handleChange = (title: string, color: string) => {
    setNewColor(color);
    setNewTitle(title);
  };

  const NextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const PrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <Header />
      <div className="flex flex-col py-6 px-6 tablet:py-10 tablet:px-10 gap-6 tablet:gap-12 laptop:gap-10 max-w-[1022px]">
        <div>
          <div className="w-full grid gap-[10px] grid-cols-1 tablet:grid-cols-2  laptop:grid-cols-3">
            <div className="w-full h-full">
              <Modal
                ModalOpenButton={
                  <div className="flex gap-3">
                    <p className="text-lg-semibold tablet:text-lg-semibold">
                      새로운 대시보드 만들기
                    </p>
                    <PlusIconButton />
                  </div>
                }
                rightHandlerText="생성"
                rightOnClick={plusDashboard}
                variant="create"
              >
                <NewDashboard onChange={handleChange} />
              </Modal>
            </div>
            {boardList.map((board) => {
              return (
                <Link href={`/dashboard/${board.id}`}>
                  <DashButton
                    hasArrow
                    title={board.title}
                    color={board.color}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-4">
            <p>
              {totalPage} 중 {currentPage}
            </p>
            <PaginationButton
              hasPrev={currentPage > 1}
              hasNext={totalPage > currentPage}
              onPrev={PrevPage}
              onNext={NextPage}
            />
          </div>
        </div>

        <InvitedDashboards />
      </div>
    </div>
  );
}
