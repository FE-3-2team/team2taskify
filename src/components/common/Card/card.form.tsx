import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploadBox from "@/components/common/ImageUploadBox";
import UnifiedInput from "../Input";
import { CardData, INITIAL_CARD } from "./CardValues";
import { uploadCardImage } from "@/api/column.api";
//

interface Props {
  editCardData?: CardData;
  columnId: number;
}
//
export default function CardValueForm({ editCardData, columnId }: Props) {
  const [cardData, setCardData] = useState<CardData>(
    editCardData ? editCardData : INITIAL_CARD
  );

  const handleChangeImageFile = async (imageFile: File) => {
    const imageUrl = await uploadCardImage({ columnId, imageFile });
    setCardData((prev) => ({ ...prev, profileImageUrl: imageUrl }));
  };
  const handleChangeEdit = (key: string, value: any) => {
    setCardData((prev) => ({ ...prev, [key]: value }));
  };
  //
  return (
    <div className="w-full h-fit py-[24px] gap-[24px] flex flex-col ">
      <UnifiedInput
        label="제목"
        placeholder="제목을 입력해 주세요"
        variant="title"
        value={cardData.title}
        onChange={(value) => handleChangeEdit("title", value)}
      />
      <div className="w-full">
        <label>설명</label>
        <span
          className={cardData.description ? "text-violet-700" : "text-gray-700"}
        >
          *
        </span>
        <input
          type="textarea"
          placeholder="설명을 입력해주세요"
          value={cardData.description}
          onChange={(value) => handleChangeEdit("description", value)}
          className="h-[126px] w-full"
        />
      </div>
      <UnifiedInput
        label="마감일"
        placeholder="날짜를 선택해 주세요."
        variant="date"
        value={cardData.dueDate}
        onChange={(value) => handleChangeEdit("dueDate", value)}
      />
      <ImageUploadBox
        imageUrl={cardData.imageUrl}
        onChangeImage={(file) => {
          handleChangeImageFile(file);
        }}
      />
    </div>
  );
}
