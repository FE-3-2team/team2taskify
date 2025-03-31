import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploadBox from "@/components/common/ImageUploadBox";
import UnifiedInput from "../Input";
import { CardData, INITIAL_CARD } from "./CardValues";
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
  const [initialCard, setInitialCard] = useState<CardData>(INITIAL_CARD);
  // const datePickerRef = useRef<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  //

  const handleChangeImageFile = async (value: File) => {
    setImageFile(value);
  };
  const handleChangeEdit = (key: string, value: any) => {
    setCardData((prev) => ({ ...prev, [key]: value }));
  };
  //
  return (
    <div className="w-full h-fit py-[24px] gap-[24px] flex flex-col ">
      <UnifiedInput
        label="제목"
        // validate={(cardData.title, "title")}
        placeholder="제목을 입력해 주세요"
        variant="title"
        value={cardData.title}
        onChange={(value) => handleChangeEdit("title", value)}
      />
      <UnifiedInput
        label="설명"
        placeholder="설명을 입력해주세요"
        variant="title"
        value={cardData.description}
        onChange={(value) => handleChangeEdit("description", value)}
      />
      <UnifiedInput
        label="마감일"
        placeholder="날짜를 선택해 주세요."
        variant="date"
        value={cardData.dueDate}
        onChange={(value) => handleChangeEdit("dueDate", value)}
      />
      <ImageUploadBox
        imageFile={imageFile}
        imageUrl={cardData.imageUrl}
        onChangeImage={handleChangeImageFile}
      />
    </div>
  );
}
