import { useState, useRef, useEffect } from "react";
import { Tag } from "@/components/common/Chip/Tag.chip";

export default function TagInputField() {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      setSelectedIndex(null);
    } else if (e.key === "Backspace") {
      if (inputValue) return; // 그냥 글자 지우기

      if (selectedIndex !== null) {
        const newTags = [...tags];
        newTags.splice(selectedIndex, 1);
        setTags(newTags);
        setSelectedIndex(null);
      } else if (tags.length > 0) {
        setSelectedIndex(tags.length - 1);
      }
    } else {
      setSelectedIndex(null);
    }
  };

  const handleTagClick = (index: number) => {
    setSelectedIndex(index);
    inputRef.current?.focus();
  };

  return (
    <div
      className="w-full min-h-[50px] border border-gray-300 rounded-[8px] px-[12px] py-[10px] flex flex-wrap gap-[8px] bg-white cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, idx) => (
        <div
          key={tag + idx}
          className={`cursor-pointer ${selectedIndex === idx ? "ring-2 ring-violet-300 rounded-sm" : ""}`}
          onClick={() => handleTagClick(idx)}
        >
          <Tag value={tag} />
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[100px] text-md-regular focus:outline-none"
        placeholder="입력 후 Enter"
      />
    </div>
  );
}
