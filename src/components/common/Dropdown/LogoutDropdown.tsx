import { removeItem } from "@/utils/localstorage";
import useAuthStore from "@/utils/Zustand/zustand";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { useStore } from "zustand";

interface Props {
  children: ReactNode;
}

export default function Logout({ children }: Props) {
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
        <div
          onClick={logoutHandler}
          className="z-10 cursor-pointer bg-violet-200 flex w-[110px] h-fit rounded-2xl  px-2 py-3 items-center justify-center absolute top-[70px] right-[10px] "
        >
          <div className="text-white text-lg-regular rounded-2xl">로그아웃</div>
        </div>
      )}
    </div>
  );
}
