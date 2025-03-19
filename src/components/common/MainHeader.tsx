import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/assets/icons/LogoImage.svg';
import LogoFull from '@/assets/icons/LogoFull.svg';

export default function MainHeader() {

  return (
    <header className='m-auto flex h-[3.75rem] max-w-[120rem] items-center justify-between px-6 md:pr-0 dark:bg-black-100 dark:text-white'>
      <Link href='/'>
        {/* ✅ next/image를 사용해서 로고 렌더링 */}
        <Image src={LogoImage} alt='로고 아이콘' width={40} height={40} className='block tablet:hidden'/>
        <Image src={LogoFull} alt='텍스트 로고' width={100} height={40} className='hidden tablet:block'/>
      </Link>

      <div className='flex gap-5 text-[0.875rem] md:gap-9 md:pr-10 md:text-base lg:pr-20'>
        <Link href='/login'>로그인</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
    </header>
    
  );
}
