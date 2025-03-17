import { LoginButton, InviteButton } from "@/components/common/Button";


export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 mt-10 mb-10 text-center">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <LoginButton onClick={() => console.log("Large 버튼 클릭")} size="large" />
          <LoginButton onClick={() => console.log("비활성화 버튼 클릭")} size="large" disabled />
          <LoginButton onClick={() => console.log("Small 버튼 클릭")} size="small" />
          <LoginButton onClick={() => console.log("비활성화 버튼 클릭")} size="small" disabled />
          <InviteButton 
            onAccept={() => console.log("수락 버튼 클릭!")}
            onReject={() => console.log("거절 버튼 클릭!")}
          />
        </div>
        <div className="w-full max-w-[800px] flex flex-col items-center justify-center">
          <p className="text-3xl-bold">Pretendard 3XL Bold (32px / 42px)</p>
          <p className="text-3xl-semibold">Pretendard 3XL Semibold (32px / 42px)</p>

          <p className="text-2xl-bold">Pretendard 2XL Bold (24px / 32px)</p>
          <p className="text-2xl-semibold">Pretendard 2XL Semibold (24px / 32px)</p>
          <p className="text-2xl-medium">Pretendard 2XL Medium (24px / 32px)</p>
          <p className="text-2xl-regular">Pretendard 2XL Regular (24px / 32px)</p>

          <p className="text-xl-bold">Pretendard XL Bold (20px / 32px)</p>
          <p className="text-xl-semibold">Pretendard XL Semibold (20px / 32px)</p>
          <p className="text-xl-medium">Pretendard XL Medium (20px / 32px)</p>
          <p className="text-xl-regular">Pretendard XL Regular (20px / 32px)</p>

          <p className="text-lg-bold">Pretendard LG Bold (16px / 26px)</p>
          <p className="text-lg-semibold">Pretendard LG Semibold (16px / 26px)</p>
          <p className="text-lg-medium">Pretendard LG Medium (16px / 26px)</p>
          <p className="text-lg-regular">Pretendard LG Regular (16px / 26px)</p>

          <p className="text-md-bold">Pretendard MD Bold (14px / 24px)</p>
          <p className="text-md-semibold">Pretendard MD Semibold (14px / 24px)</p>
          <p className="text-md-medium">Pretendard MD Medium (14px / 24px)</p>
          <p className="text-md-regular">Pretendard MD Regular (14px / 24px)</p>

          <p className="text-sm-semibold">Pretendard SM Semibold (13px / 22px)</p>
          <p className="text-sm-medium">Pretendard SM Medium (13px / 22px)</p>

          <p className="text-xs-semibold">Pretendard XS Semibold (12px / 20px)</p>
          <p className="text-xs-medium">Pretendard XS Medium (12px / 18px)</p>
          <p className="text-xs-regular">Pretendard XS Regular (12px / 18px)</p>
        </div>
        <div className="w-full max-w-[800px] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-000000">#000000</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-171717">#171717</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-333236">#333236</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-black-4B4B4B">#4B4B4B</div>

          <div className="flex items-center justify-center w-64 h-12 text-white bg-gray-787486">#787486</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-9FA6B2">#9FA6B2</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-D9D9D9">#D9D9D9</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-EEEEEE">#EEEEEE</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-gray-FAFAFA">#FAFAFA</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-white-FFFFFF">#FFFFFF</div>

          <div className="flex items-center justify-center w-64 h-12 text-white bg-violet-5534DA">#5534DA</div>
          <div className="flex items-center justify-center w-64 h-12 text-black bg-violet-F1EFFD">#F1EFFD</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-red-D6173A">#D6173A</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-green-7AC555">#7AC555</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-purple-760DDE">#760DDE</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-orange-FFA500">#FFA500</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-blue-76A6EA">#76A6EA</div>
          <div className="flex items-center justify-center w-64 h-12 text-white bg-pink-E876EA">#E876EA</div>
        </div>
      </div>
    </>
  );
}
