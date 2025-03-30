import { removeItem } from "@/utils/localstorage";
import useAuthStore from "@/utils/Zustand/zustand";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { useStore } from "zustand";

interface Props {
  children: ReactNode;
}

export default function ProfileSelect({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const store = useStore(useAuthStore);
  const { logout } = store;
  const router = useRouter();
  const logoutHandler = () => {
    removeItem("accessToken");
    logout();
    router.push("/login");
  };
  return (
    <div className="flex flex-col">
      <div onClick={() => setIsOpen(!isOpen)} className="relative h-[38px]">
        {children}
      </div>
      {isOpen && (
        <div className="border-gray-300 border-[1px] z-10 flex gap-4 flex-col bg-white  cursor-pointer  w-[110px] tablet:w-[130px] laptop:right-10 h-fit rounded-xl  px-2 py-3 items-center justify-center absolute top-[70px] right-[10px] ">
          <Link className="w-full h-full " href="/mypage">
            <div className="py-2 text-center text-white rounded-md bg-violet-200 text-lg-regular">
              계정 관리
            </div>
          </Link>
          <div
            onClick={logoutHandler}
            className="w-full h-full py-2 text-center text-white rounded-md bg-violet-200 text-lg-regular"
          >
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
}
