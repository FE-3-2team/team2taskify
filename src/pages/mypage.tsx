import Header from "@/components/common/Header";
import SideMenu from "@/components/common/SideMenu";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function MyPage() {
  return (
    <>
    <div className="ml-[67px] tablet:ml-[160px] laptop:ml-[300px]">
      <SideMenu />
      <Header />
      <div className="flex flex-col py-6 px-6 tablet:py-10 tablet:px-10 gap-6 tablet:gap-12 laptop:gap-10 max-w-[1022px]">
        <ChangePasswordForm />
      </div>
    </div>
    </>
  );
}
