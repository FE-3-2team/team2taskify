import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/common/Header";
import SideMenu from "@/components/common/SideMenu";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import LeftArrowIcon from "@/assets/icons/LeftArrow.icon.svg";

export default function MyPage() {
  const router = useRouter();

  return (
    <>
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <SideMenu />
      <Header />
      <div className="flex flex-col py-6 px-6 tablet:py-10 tablet:px-10 gap-[8px] tablet:gap-[28px] max-w-[1022px]">
        <div className="flex items-center cursor-pointer text-black-200 text-md-medium tablet:text-lg-medium" onClick={() => router.back()} >
          <Image src={LeftArrowIcon} width={18} height={18} alt="화살표" className="mr-1" />
          돌아가기
        </div>
        <ChangePasswordForm />
      </div>
    </div>
    </>
  );
}
