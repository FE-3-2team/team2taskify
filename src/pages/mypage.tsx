import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/common/Header";
import SideMenu from "@/components/common/SideMenu";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import EditProfile from "@/components/EditProfile";
import LeftArrowIcon from "@/assets/icons/LeftArrow.icon.svg";
import { SkeletonColumn } from "@/components/common/Skeleton/Skeleton";
import WithSkeleton from "@/components/common/Skeleton/WithSkeleton";
import { SkeletonChangePasswordForm } from "@/components/common/Skeleton/SkeletonChangePasswordForm";
import SkeletonSideMenu from "@/components/common/Skeleton/SkeletonSideMenu";
// import Loader from "@/components/common/Loding"; //로딩스피너

export default function MyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // 로딩
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);


  // if (isLoading) return <Loader />; //로딩스피너

  return (
    <>
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <WithSkeleton isLoading={isLoading} skeleton={<SkeletonSideMenu />}>
        <SideMenu />
      </WithSkeleton>
      <Header />
      <div className="flex flex-col py-6 px-6 tablet:py-10 tablet:px-10 gap-[8px] tablet:gap-[28px] max-w-[1022px]">
        <div className="flex items-center cursor-pointer text-black-200 text-md-medium tablet:text-lg-medium" onClick={() => router.back()} >
          <Image src={LeftArrowIcon} width={18} height={18} alt="화살표" className="mr-1" />
          돌아가기
        </div>
        <WithSkeleton isLoading={isLoading} skeleton={<SkeletonChangePasswordForm />}>
          <ChangePasswordForm />
        </WithSkeleton>
      </div>
    </div>
    </>
  );
}
