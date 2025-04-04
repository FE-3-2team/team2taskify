import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlusIcon from "@/assets/icons/Plus.icon.svg";
import { uploadCardImage } from "@/api/column.api";
const DEFAULT_IMG = process.env.NEXT_PUBLIC_DEFAULT_IMG;

interface Props {
  imageUrl: string;
  columnId: number;
  onChangeImage: (value: string) => void;
}
export default function ImageUploadBox({
  imageUrl,
  onChangeImage,
  columnId,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formattedImg = imageUrl === DEFAULT_IMG ? "" : imageUrl;
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  useEffect(() => {
    onChangeImage(previewUrl);
  }, [previewUrl]);
  const handleClick = () => {
    if (!previewUrl) {
      fileInputRef.current?.click();
    } else {
      setPreviewUrl("");
      onChangeImage("");
    }
  };

  const handleChangeImageFile = async (imageFile: File) => {
    const imageUrl = await uploadCardImage({ columnId, imageFile });
    onChangeImage(imageUrl);
    setPreviewUrl(imageUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      handleChangeImageFile(file);
    }
  };

  return (
    <div className="w-full">
      <p className="tablet:text-2lg-medium text-lg-medium tablet:mb-[8px] mb-[10px]">
        이미지
      </p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
      />

      <div
        className="w-[76px] h-[76px] bg-gray-200 rounded-[8px] flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        {formattedImg !== "" ? (
          <div className="w-[76px] h-[76px] relative overflow-hidden">
            <img
              src={previewUrl}
              alt="미리보기 이미지"
              className="object-cover w-full h-full rounded-[6px]"
            />
          </div>
        ) : (
          <Image
            src={PlusIcon}
            alt="이미지 추가"
            width={17}
            height={17}
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
