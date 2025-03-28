import { useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownAssigneeSearch from "@/components/common/Dropdown/DropdownAssigneeSearch";
import type { Assignee } from "@/components/common/Dropdown/DropdownAssigneeSearch";
import ImageUploadBox from "@/components/common/ImageUploadBox";
import TagInputField from "@/components/common/TagInputField";
import CalendarIcon from "@/assets/icons/Calendar.svg";

type Props = {
  cardTitle: string;
  setCardTitle: (v: string) => void;
  cardDescription: string;
  setCardDescription: (v: string) => void;
  cardDueDate: Date | null;
  setCardDueDate: (v: Date | null) => void;
  cardTags: string[];
  setCardTags: Dispatch<SetStateAction<string[]>>;
  cardImageFile: File | null;
  setCardImageFile: (file: File | null) => void;
  selectedAssignee: Assignee | null;
  setSelectedAssignee: (a: Assignee | null) => void;
  members: Assignee[];
  cardImageUrl: string | null;
  setCardImageUrl: (url: string | null) => void;
};

const CardForm = ({
  cardTitle,
  setCardTitle,
  cardDescription,
  setCardDescription,
  cardDueDate,
  setCardDueDate,
  cardTags,
  setCardTags,
  cardImageFile,
  setCardImageFile,
  setSelectedAssignee,
  setCardImageUrl,
  members,
  cardImageUrl,
}: Props) => {
  const datePickerRef = useRef<any>(null);

  return (
    <div>
      <h2 className="tablet:text-2xl-bold text-xl-bold">할 일 생성</h2>
      <div className="w-full h-fit py-[24px] gap-[24px] flex flex-col items-start">
        <div className="w-full">
          <DropdownAssigneeSearch
            assignees={members}
            onSelect={setSelectedAssignee}
          />
        </div>
        <div className="w-full">
          <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
            제목
          </p>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
            설명
          </p>
          <textarea
            placeholder="설명을 입력해주세요"
            className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[126px] tablet:text-lg-regular text-md-regular text-black-200"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
            마감일
          </p>
          <div
            className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200 flex items-center gap-[8px]"
            onClick={() => datePickerRef.current?.setOpen(true)}
          >
            <div className="tablet:w-[18px] tablet:h-[18px] w-[14px] h-[14px] relative">
              <Image
                src={CalendarIcon}
                alt="calendar"
                fill
                className="object-contain"
              />
            </div>
            <DatePicker
              selected={cardDueDate}
              onChange={(date) => {
                if (date) setCardDueDate(date);
              }}
              dateFormat="yyyy-MM-dd hh:mm"
              placeholderText="날짜를 선택해주세요"
              showTimeSelect
              ref={datePickerRef}
            />
          </div>
        </div>
        <div className="w-full">
          <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
            태그
          </p>
          <TagInputField tags={cardTags} setTags={setCardTags} />
        </div>
        <div className="w-full">
          <ImageUploadBox
            imageFile={cardImageFile}
            imageUrl={cardImageUrl}
            onChangeImage={setCardImageFile}
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;
