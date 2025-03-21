import { useAutoClose } from "@/hooks/useAutoClose";
import X from "@/assets/icons/X.icon.svg";
import { Button } from "./Button";
import Image from "next/image";
//

interface Props {
  children?: React.ReactNode;
  ModalOpenButton: React.ReactNode | string;
  ModalCloseButton?: string;
  leftHandlerText?: string;
  rightHandlerText?: string;
  rightOnClick?: () => void;
  leftOnClick?: () => void;
  className?: string;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge"; // 크기별 스타일 적용
  variant?: "primary" | "secondary" | "outline" | "disabled"; // 색상/디자인 적용
}
//
export function Modal({
  children,
  ModalOpenButton,
  ModalCloseButton,
  rightHandlerText,
  leftHandlerText,
  rightOnClick,
  leftOnClick,
  size,
  variant,
}: Props) {
  const { isOpen, ref, setIsOpen } = useAutoClose(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-400/70 ">
          <div
            className="px-4 py-6 relative flex flex-col tablet:px-6  w-[327px] tablet:w-[568px] h-auto bg-white rounded-[8px] z-20 "
            style={{ gap: rightOnClick ? "24px" : "32px" }}
            ref={ref}
          >
            {leftOnClick && (
              <button
                className="absolute top-6 right-4 tablet:top-6 tablet:right-6"
                onClick={() => setIsOpen(false)}
              >
                <Image src={X} width={32} height={32} alt="X" />
              </button>
            )}
            {children}
            <div className="flex justify-center gap-2 ">
              <div className="tablet:w-[256px] h-[54px] w-[144px]  z-20">
                {leftOnClick ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      leftOnClick;
                    }}
                  >
                    {leftHandlerText}
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    {ModalCloseButton}
                  </Button>
                )}
              </div>
              {rightOnClick && (
                <div className="tablet:w-[256px] h-[54px] w-[144px] z-20">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsOpen(false);
                      rightOnClick;
                    }}
                  >
                    {rightHandlerText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Button size={size} variant={variant} onClick={handleButtonClick}>
        {ModalOpenButton}
      </Button>
    </>
  );
}
//
export function DetailContent({ children, ModalOpenButton }: Props) {
  //
  const { isOpen, ref, setIsOpen } = useAutoClose(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-400/70">
          <div
            className="px-4 py-4 tablet:px-[23px] tablet:py-8 relative w-auto h-auto bg-white  rounded-[8px] z-20 "
            ref={ref}
          >
            <button
              className="absolute top-4 right-4 tablet:top-8 tablet:right-8"
              onClick={() => setIsOpen(false)}
            >
              <Image src={X} width={32} height={32} alt="X" />
            </button>
            {children}
          </div>
        </div>
      )}

      <button onClick={handleButtonClick}>{ModalOpenButton}</button>
    </>
  );
}
