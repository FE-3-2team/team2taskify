import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import addIcon from "@/assets/icons/Addbox.icon.svg";
import LogoFull from "@/assets/icons/LogoFull.svg";
import LogoImage from "@/assets/icons/LogoImage.svg";
import DashButton from "./Button/DashButton";
import PaginationButton from "./Button/PaginationButton";
import { instance } from "@/api/instance";
import { getItem } from "@/utils/localstorage";
import { Modal } from "@/components/common/ModalPopup";
import NewDashboard from "@/components/ModalContents/NewDashboard";
import { createDashboard } from "@/api/dashboard";
import { useRouter } from "next/router";

interface Dashboard {
  id: string;
  title: string;
  color: string;
  isOwner: boolean;
}

const ITEMS_PER_PAGE = 15;

export default function SideMenu() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();

  const handleLoad = async () => {
    try {
      const accessToken = getItem<string>("accessToken");

      const response = await instance.get(`/dashboards`, {
        params: {
          navigationMethod: "pagination",
          page: currentPage,
          size: ITEMS_PER_PAGE,
        },
      });

      const mapped = response.data.dashboards.map((item: any) => ({
        id: item.id,
        title: item.title,
        color: item.color,
        isOwner: item.createdByMe,
      }));

      setDashboards(mapped);
      setHasNext(currentPage * ITEMS_PER_PAGE < response.data.totalCount);
    } catch (error) {
      console.error("대시보드 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [currentPage]);

  const onChange = (title: string, color: string) => {
    setTitle(title);
    setColor(color);
  };

  const plusDashboard = async () => {
    const created = await createDashboard(title, color);
    router.push(`/dashboard/${created.id}`);
  };

  return (
    <div className="fixed z-[10] w-[64px] tablet:w-[160px] laptop:w-[300px] h-screen bg-white flex flex-col pt-[20px] pl-[10px] pr-[10px]">
      {/* 로고 */}
      <Link href="/mydashboard">
        <div className="mb-[30px] flex items-center justify-center tablet:mb-[60px] laptop:justify-start">
          <Image src={LogoImage} alt="로고" className="block tablet:hidden w-[24px]" />
          <Image src={LogoFull} alt="로고" className="hidden tablet:block" />
        </div>
      </Link>

      {/* 대시보드 추가 버튼 + 모달 */}
      <div className="flex items-center justify-center w-full m-auto mb-4 transition-none tablet:justify-between">
        <div className="hidden tablet:block mr-6 text-[12px] font-bold text-gray-500">Dash Board</div>
        <Modal
          ModalOpenButton={<Image src={addIcon} alt="대시보드 추가 버튼" className="cursor-pointer" />}
          rightHandlerText="생성"
          rightOnClick={plusDashboard}
          variant="create"
          className="bg-black !border-none !w-auto"
        >
          <NewDashboard onChange={onChange} />
        </Modal>
        
      </div>

      {/* 대시보드 리스트 */}
      <div className="flex flex-col flex-grow m-auto overflow-hidden mobile-hide-after-10 tablet:w-full">
        {dashboards.map((dashboard, index) => (
          <DashButton
            key={index}
            size="small"
            title={dashboard.title}
            color={dashboard.color}
            isOwner={dashboard.isOwner}
            hasArrow={false}
            hideTextOnMobile={true}
            className="!border-none inline-block tablet:flex !w-fit !py-[10px] justify-start !px-[10px] hover:bg-violet-100 hover:rounded-[10px]"
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex px-2 py-4 tablet:flex">
        <PaginationButton
          hasPrev={currentPage > 1}
          hasNext={hasNext}
          size="small"
          onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setCurrentPage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}
