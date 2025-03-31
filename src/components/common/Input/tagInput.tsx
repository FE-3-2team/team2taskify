import { useState, useRef, useEffect } from "react";
import { Tag } from "@/components/common/Chip/Tag.chip";

interface props {
  tags: string[];
  onChange: (value: string[]) => void;
}

export default function TagInput({ tags, onChange }: props) {
  const [currentTags, setCurrentTags] = useState(tags);
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const trimmedValue = inputValue.trim();
    if (currentTags.length > 3) {
      setIsError(true);
      setIsError(Boolean(trimmedValue));
      return;
    }
    const notDuplicate = currentTags.includes(trimmedValue);
    if (notDuplicate) return;
    if (e.key === "Enter" && trimmedValue && !notDuplicate) {
      e.preventDefault();
      setCurrentTags((prev) => [...prev, inputValue]);
      setInputValue("");
      onChange(currentTags);
    }
  };

  const handleClickDelete = (index: number) => {
    const filteredTags = currentTags.filter((_, idx) => idx !== index);
    setCurrentTags(filteredTags);
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2 text-sm text-gray-700 text-lg-regular">태그</p>
      <div className="w-full min-h-[50px] border border-gray-300 rounded-[8px] px-[12px] py-[10px]  items-center flex flex-wrap gap-[8px] bg-white cursor-text">
        {currentTags.map((tag, idx) => (
          <div
            key={tag + idx}
            onClick={() => handleClickDelete(idx)}
            className="cursor-pointer"
          >
            <Tag value={tag} />
          </div>
        ))}
        <input
          type="text"
          maxLength={6}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[100px] text-md-regular focus:outline-none"
          placeholder="입력 후 Enter"
        />
      </div>
      {isError && <p className="text-red">태그는 4개 까지 가능합니다</p>}
    </div>
  );
}
