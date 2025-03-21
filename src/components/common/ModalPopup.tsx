import { useAutoClose } from "@/hooks/useAutoClose";
import X from "@/assets/icons/X.icon.svg";
import { Button } from "./Button";
import clsx from "clsx";
import Image from "next/image";
//

interface Props {
  children?: React.ReactNode;
  ModalOpenButton: React.ReactNode | string;
  ModalCloseButton?: string;
  editButton?: string;
  onClick?: () => void;
}
//
export function Modal({
  children,
  ModalOpenButton,
  ModalCloseButton,
  editButton,
  onClick,
}: Props) {
  const { isOpen, ref, setIsOpen } = useAutoClose(false);

  const handleClick = () => {
    setIsOpen(false);
  };
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div
          className={clsx(
            "w-full flex h-full bg-rgba(0, 0, 0, 0.6) fixed top-0 left-0 z-10"
          )}
        >
          <div
            className={clsx(
              "w-fit h-fit bg-white fixed   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[15px] rounded-[8px] z-20 "
            )}
            ref={ref}
          >
            <div>{children}</div>
            <div>
              <Button onClick={handleClick}>{ModalCloseButton}</Button>

              {onClick && <Button onClick={handleClick}>확인</Button>}
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleButtonClick}>{ModalOpenButton}</Button>
    </>
  );
}
//
export function DetailContent({ children, ModalOpenButton }: Props) {
  //
  const { isOpen, ref, setIsOpen } = useAutoClose(false);

  const handleClick = () => {
    setIsOpen(false);
  };
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-400 opacity-70">
          <div
            className="px-4 py-4 tablet:px-[23px] tablet:py-8 relative w-auto h-auto bg-white opacity-100 rounded-[8px] z-20 "
            ref={ref}
          >
            <button
              className="absolute top-4 right-4 tablet:top-8 tablet:right-8"
              onClick={handleClick}
            >
              <Image src={X} width={32} height={32} alt="X" />
            </button>
            {children}
          </div>
        </div>
      )}

      <Button onClick={handleButtonClick}>{ModalOpenButton}</Button>
    </>
  );
}
