import { useEffect, useState } from "react";
import ImageUploadBox from "@/components/common/ImageUploadBox";
import UnifiedInput from "@/components/common/Input/Input";
import { CardData, INITIAL_CARD } from "./CardValues";
import TagInput from "@/components/common/Input/tagInput";
//

interface Props {
  editCardData?: CardData;
  columnId: number;
  onChange: (value: CardData) => void;
}
//
export default function CardValueForm({
  editCardData,
  columnId,
  onChange,
}: Props) {
  const [cardData, setCardData] = useState<CardData>(
    editCardData ? editCardData : INITIAL_CARD
  );
  useEffect(() => {
    onChange(cardData);
  }, [cardData]);

  const handleChangeEdit = (key: string, value: any) => {
    setCardData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full h-fit py-[24px] gap-[24px] flex flex-col ">
      <UnifiedInput
        label="제목"
        placeholder="제목을 입력해 주세요"
        variant="title"
        value={cardData.title}
        onChange={(value) => {
          handleChangeEdit("title", value);
        }}
      />
      <div className="w-full">
        <label className=" flex gap-[2px] text-md-medium tablet:text-2lg-medium">
          설명
          <span
            className={
              cardData.description ? "text-violet-200" : "text-gray-700"
            }
          >
            *
          </span>
        </label>

        <input
          type="textarea"
          placeholder="설명을 입력해주세요"
          value={cardData.description}
          onChange={(e) => {
            handleChangeEdit("description", e.target.value);
          }}
          className="h-[126px] w-full border-[1px] border-gray-300 rounded-[8px]"
        />
      </div>
      <UnifiedInput
        label="마감일"
        placeholder="날짜를 선택해 주세요."
        variant="date"
        value={cardData.dueDate}
        onChange={(value) => handleChangeEdit("dueDate", value)}
      />
      <TagInput
        onChange={(value) => handleChangeEdit("tags", value)}
        tags={cardData.tags}
      />
      <ImageUploadBox
        columnId={columnId}
        imageUrl={cardData.imageUrl}
        onChangeImage={(value) => handleChangeEdit("imageUrl", value)}
      />
    </div>
  );
}
