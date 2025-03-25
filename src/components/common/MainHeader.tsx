import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/assets/icons/LogoImage.svg';
import LogoFull from '@/assets/icons/LogoFull.svg';
import LogoImageDark from '@/assets/icons/logoimage_dark.svg';
import LogoFullDark from '@/assets/icons/logofull_dark.svg';

export default function MainHeader() {

  return (
    <header className='m-auto flex items-center justify-between px-[24px] py-[16px] tablet:px-[40px] laptop:px-[80px] dark:bg-black-100 dark:text-white'>
      <Link href='/' className='dark:hidden'>
        <Image src={LogoImage} alt='로고 아이콘' className='block tablet:hidden w-[24px]'/>
        <Image src={LogoFull} alt='텍스트 로고' className='hidden tablet:block w-[120px]'/>
      </Link>
      <Link href='/' className='hidden dark:block'>
        <Image src={LogoImageDark} alt='로고 아이콘' width={40} height={40} className='block tablet:hidden w-[24px]'/>
        <Image src={LogoFullDark} alt='텍스트 로고' width={100} height={40} className='hidden tablet:block w-[120px]'/>
      </Link>

      <div className='flex gap-5 text-md-regular tablet:text-lg-regular'>
        <Link href='/login'>로그인</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
    </header>
    
  );
}
