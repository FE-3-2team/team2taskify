import { useAutoClose } from "@/hooks/useAutoClose";
import X from "@/assets/icons/X.icon.svg";
import Button from "@/components/common/Button/Button";
import Image from "next/image";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DropdownEditDel from "./Dropdown/DropdownEditDel";
import { deleteCard } from "@/api/card.api";

interface Props {
  children?: React.ReactNode;
  ModalOpenButton: React.ReactNode | string;
  leftHandlerText?: string;
  rightHandlerText?: string;
  rightOnClick?: () => void;
  leftOnClick?: () => void;
  className?: string;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge"; // 크기별 스타일 적용
  variant?: "primary" | "secondary" | "outline" | "disabled" | "create"; // 색상/디자인 적용
  isOpen?: boolean;
  setIsOpen?: (e: any) => void;
}

export function Modal({
  children,
  ModalOpenButton,
  rightHandlerText,
  leftHandlerText,
  rightOnClick,
  leftOnClick,
  className,
  size,
  variant,
  isOpen,
  setIsOpen,
}: Props) {
  const {
    isOpen: internalIsOpen,
    ref,
    setIsOpen: internalSetIsOpen,
  } = useAutoClose(false);
  const modalIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const modalSetIsOpen = setIsOpen ?? internalSetIsOpen;
  useEffect(() => {
    if (!modalIsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        modalSetIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalIsOpen, setIsOpen, ref]);

  return (
    <>
      {modalIsOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-400/70 ">
          <div
            className="px-4 py-6 relative flex flex-col tablet:px-6  w-[327px] tablet:w-[568px] h-auto bg-white rounded-[8px] z-20 "
            style={{ gap: rightOnClick ? "24px" : "32px" }}
            ref={ref}
          >
            {leftOnClick && (
              <button
                className="absolute top-6 right-4 tablet:top-6 tablet:right-6"
                onClick={() => modalSetIsOpen(false)}
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
                      modalSetIsOpen(false);
                      leftOnClick();
                    }}
                  >
                    {leftHandlerText}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      modalSetIsOpen(false);
                    }}
                  >
                    취소
                  </Button>
                )}
              </div>
              {rightOnClick && (
                <div className="tablet:w-[256px] h-[54px] w-[144px] z-20">
                  <Button
                    variant={variant}
                    onClick={() => {
                      if (variant !== "disabled") {
                        rightOnClick();
                        modalSetIsOpen(false);
                      }
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

      {ModalOpenButton && (
        <Button
          size={size}
          variant={variant}
          onClick={() => modalSetIsOpen(true)}
          className={className}
        >
          {ModalOpenButton}
        </Button>
      )}
    </>
  );
}

interface DetailContentProps {
  cardTitle: string;
  children: ReactNode;
  ModalOpenButton: ReactNode;
  cardId: number;
  setIsCardEdit: Dispatch<SetStateAction<boolean>>;
}
export function DetailContent({
  cardTitle,
  children,
  ModalOpenButton,
  cardId,
  setIsCardEdit,
}: DetailContentProps) {
  const { isOpen, ref, setIsOpen } = useAutoClose(false);
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCardDelete = async () => {
    await deleteCard(cardId);
    setIsOpen(false);
  };
  const handleEdit = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center px-6 py-20 w-dvw tablet:px-8 bg-black-400/70">
          <div
            className=" max-w-[730px] h-[710px] tablet:h-[763px]  w-full px-4 py-4 tablet:px-[23px] tablet:py-8 bg-white  rounded-[8px] z-20 "
            ref={ref}
          >
            <div className="relative w-full h-full">
              <div className="absolute top-[-1px] z-10 flex justify-between w-full h-10 bg-white">
                <span className="text-xl-bold tablet:text-2xl-bold ">
                  {cardTitle}
                </span>
                <div className="flex items-center ">
                  <DropdownEditDel
                    onDelete={handleCardDelete}
                    onEdit={() => {
                      handleEdit();
                      setIsCardEdit(true);
                    }}
                  />
                  <button onClick={() => setIsOpen(false)}>
                    <Image src={X} width={32} height={32} alt="X" />
                  </button>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}

      <button onClick={handleButtonClick}>{ModalOpenButton}</button>
    </>
  );
}
