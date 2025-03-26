import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import PlusIcon from "@/assets/icons/Plus.icon.svg";

export default function ImageUploadBox({
  imageFile,
  onChangeImage,
}: {
  imageFile: File | null;
  onChangeImage: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      onChangeImage(file);
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
        {previewUrl ? (
          <div className="w-[76px] h-[76px] relative overflow-hidden">
            <Image
              src={previewUrl}
              alt="미리보기 이미지"
              fill
              className="object-cover rounded-[6px]"
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
