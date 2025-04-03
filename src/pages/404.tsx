import { Button } from "@/components/common/Button";
import Image from "next/image";
import Logo from "@/assets/mainimage01.png";
import { useRouter } from "next/router";
import MainHeader from "@/components/common/MainHeader";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <MainHeader />
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-10 w-full max-w-[900px] mt-[100px] px-5">
          <div className="px-2 py-2 bg-white rounded-2xl">
            <Image
              src={Logo}
              width={200}
              height={200}
              alt="404페이지 이미지"
              className="w-full "
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-5 px-6 py-6 bg-white tablet:flex-row rounded-2xl">
            <div className="text-violet-200 text-md-bold tablet:text-xl-semibold">
              요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 :)
            </div>
            <div className="w-full max-w-[200px]">
              <Button onClick={() => router.back()} className="">
                이전으로 이동
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
