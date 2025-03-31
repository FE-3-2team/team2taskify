import Image from 'next/image';
import Link from 'next/link';
import MainHeader from "@/components/common/MainHeader";
import MainFooter from "@/components/common/MainFooter";
import mainimage01 from '@/assets/mainimage01.png';
import landing1 from '@/assets/landing1.png';
import landing2 from '@/assets/landing2.png';
import landing3 from '@/assets/landing3.png';
import landing4 from '@/assets/landing4.png';
import landing5 from '@/assets/landing5.png';
import { Button } from "@/components/common/Button";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { motion } from 'framer-motion';
import TrailParticles from '@/components/TrailParticles';

export default function Home() {
  
  return (
    <>
    <TrailParticles />
      <header className="dark">
        <MainHeader />
      </header>
      <main className="dark">
        <div className="dark:bg-black-400 pt-[42px] text-center m-auto flex flex-col justify-center items-center">
        <FadeInWhenVisible>
          {/* section01 */}
          <div className="flex flex-col justify-center items-center mb-[76px] tablet:mb-[180px]">
            <Image src={mainimage01} alt='taskify 메인이미지' className='w-full max-w-[288px] tablet:max-w-[540px] laptop:max-w-[720px] mb-[28px] tablet:mb-[48px]'/>
            <h1 className='text-white text-3xl-bold text-[40px] tablet:text-[56px] laptop:text-[76px] leading-[1.4] mb-[100px] tablet:mb-[108px]'>
              새로운 일정 관리 
              {/* <span className='block tablet:inline-block font-bold font-montserrat text-3xl-bold text-violet-200 text-[42px] tablet:text-[70px] laptop:text-[90px] tablet:pl-4 relative top-[5px]'>Taskify</span> */}
              <motion.span
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="block tablet:inline-block font-bold font-montserrat text-3xl-bold text-violet-200 text-[42px] tablet:text-[70px] laptop:text-[90px] tablet:pl-4 relative top-[5px]"
              >
                Taskify
              </motion.span>
            </h1>
            <Link href='/login' className="flex flex-col items-center justify-center w-full gap-2 mb-10 max-w-[235px] tablet:max-w-[280px]">
              <Button size="xlarge" variant="primary">로그인하기</Button>
            </Link>
          </div>
        </FadeInWhenVisible>

          {/* section02 */}
          <div className="flex flex-col items-center justify-center laptop:justify-between mb-[90px] tablet:mb-[180px] px-[16px] laptop:px-[0] w-full max-w-[1200px] gap-[60px] tablet:gap-[90px]">
            {/* point 1 */}
            <FadeInWhenVisible>
            <div className='relative flex flex-col laptop:flex-row justify-center bg-black-300 rounded-[8px] w-full pt-[56px] tablet:pt-[64px] laptop:tablet:pt-[100px]'>
              <div className="flex flex-col tablet:text-left laptop:w-1/2 tablet:pl-[60px]">
                <span className='text-2lg-medium tablet:text-[22px] text-gray-400 mb-[60px] tablet:mb-[100px] laptop:pt-[20px]'>Point 1</span>
                <strong className='mb-[192px] text-3xl-bold text-[36px] leading-[1.4] tablet:text-[48px] text-white'>일의 우선순위를 <br></br>관리하세요</strong>
              </div>
              <div className="flex justify-end w-full laptop:w-1/2">
                <Image src={landing1} alt='taskify 대시보드 이미지 01' className='w-full max-w-[296px] tablet:max-w-[520px] laptop:max-w-[592px]'/>
              </div>
            </div>
            </FadeInWhenVisible>
            {/* point 2 */}
            <FadeInWhenVisible>
            <div className='relative flex flex-col laptop:flex-row laptop:flex-row-reverse justify-center bg-black-300 rounded-[8px] w-full pt-[56px] tablet:pt-[64px] laptop:tablet:pt-[100px]'>
              <div className="flex flex-col tablet:text-left laptop:w-1/2 tablet:pl-[60px] laptop:pl-[40px]">
                <span className='text-2lg-medium tablet:text-[22px] text-gray-400 mb-[60px] tablet:mb-[100px] laptop:pt-[20px]'>Point 2</span>
                <strong className='mb-[192px] text-3xl-bold text-[36px] leading-[1.4] tablet:text-[48px] text-white'>해야 할 일을 <br></br>등록하세요</strong>
              </div>
              <div className="flex justify-center w-full laptop:w-1/2 laptop:pl-[100px] laptop:pr-[60px]">
                <Image src={landing2} alt='taskify 대시보드 이미지 02' className='w-full max-w-[220px] tablet:max-w-[360px] laptop:max-w-[436px]'/>
              </div>
            </div>
            </FadeInWhenVisible>
          </div>
          
          {/* section03 */}
          <div className="flex flex-col items-center justify-center w-full px-[16px] mb-[30] tablet:mb-[160px]">
            <strong className='mb-[40px] text-xl-bold text-white text-[22px] tablet:text-[28px]'>생산성을 높이는 다양한 설정 ⚡</strong>
            <ul className='w-full flex flex-col items-center laptop:flex-row laptop:justify-between gap-[33px] max-w-[1200px]'>
            <FadeInWhenVisible>
              <li className='w-full tablet:max-w-[378px] laptop:max-w-full'>
                <div className='flex justify-center items-center h-[236px] tablet:h-[260px] bg-black-100 rounded-t-[8px]'>
                  <Image src={landing3} alt='taskify 대시보드 이미지 03' className='w-full max-w-[260px] tablet:max-w-[300px]'/>
                </div>
                <div className='justify-start text-left text-white bg-black-300 rounded-b-[8px] px-[32px] py-[32px]'>
                  <span className='block text-2lg-bold mb-[18px]'>대시보드 설정</span>
                  <p className='text-lg-medium'>대시보드 사진과 이름을 변경할 수 있어요.</p>
                </div>
              </li>
              </FadeInWhenVisible>
              <FadeInWhenVisible>
              <li className='w-full tablet:max-w-[378px] laptop:max-w-full'>
                <div className='flex justify-center items-center h-[236px] tablet:h-[260px] bg-black-100 rounded-t-[8px]'>
                  <Image src={landing4} alt='taskify 대시보드 이미지 03' className='w-full max-w-[260px] tablet:max-w-[300px]'/>
                </div>
                <div className='justify-start text-left text-white bg-black-300 rounded-b-[8px] px-[32px] py-[32px]'>
                  <span className='block text-2lg-bold mb-[18px]'>초대</span>
                  <p className='text-lg-medium'>새로운 팀원을 초대할 수 있어요.</p>
                </div>
              </li>
              </FadeInWhenVisible>
              <FadeInWhenVisible>
              <li className='w-full tablet:max-w-[378px] laptop:max-w-full]'>
                <div className='flex justify-center items-center h-[236px] tablet:h-[260px] bg-black-100 rounded-t-[8px]'>
                  <Image src={landing5} alt='taskify 대시보드 이미지 03' className='w-full max-w-[260px] tablet:max-w-[300px]'/>
                </div>
                <div className='justify-start text-left text-white bg-black-300 rounded-b-[8px] px-[32px] py-[32px]'>
                  <span className='block text-2lg-bold mb-[18px]'>구성원</span>
                  <p className='text-lg-medium'>구성원을 초대하고 내보낼 수 있어요.</p>
                </div>
              </li>
              </FadeInWhenVisible>
            </ul>
          </div>
        
        </div>
      </main>
      <footer className="dark">
        <MainFooter />
      </footer>

    </>
  );
}
