import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
/**
 * todo
 * 점 , 배경색 컬러변경, 글씨 색깔, font-
 */

export default function Status({ children }: Props) {
  return (
    <div className=" flex items-center w-fit min-h-[26px] bg-purple-200 rounded-2xl text-[14px] px-2 ">
      <div className="gap-[6px] h-fit flex items-center text-violet-500">
        <div className="w-[6px] h-[6px] bg-violet-500  rounded-full" />
        {children}
      </div>
    </div>
  );
}
