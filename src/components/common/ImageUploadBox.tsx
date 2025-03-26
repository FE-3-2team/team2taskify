import { useRef } from "react";
import Image from "next/image";
import PlusIcon from "@/assets/icons/Plus.icon.svg";

export default function ImageUploadBox({
  imageFile,
  previewUrl,
  onChangeImage,
}: {
  imageFile: File | null;
  previewUrl: string;
  onChangeImage: (file: File, preview: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      onChangeImage(file, preview);
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
        className="w-[76px] h-[76px] bg-gray-200 rounded-[8px] flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="미리보기 이미지"
            width={76}
            height={76}
            className="object-cover rounded-[6px]"
          />
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
