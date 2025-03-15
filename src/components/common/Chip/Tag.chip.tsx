import { useEffect, useState } from "react";

interface Props {
  value?: string;
}
/**
 * todo
 *  배경색 컬러변경, 글씨 색깔, font-
 */
const colorClasses = [
  "bg-red-500 text-red-800",
  "bg-green-500 text-green-800",
  "bg-blue-500 text-blue-800",
  "bg-yellow-500 text-yellow-800",
];

export function Tag({ value }: Props) {
  const [randomClass, setRandomClass] = useState("");

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * colorClasses.length);
    setRandomClass(colorClasses[randomNum]);
  }, []);
  return (
    <div
      className={`flex justify-center py-[2px] px-[6px] w-fit rounded-sm text-[14px] ${randomClass}`}
    >
      {value}
    </div>
  );
}

interface TagsProps {
  tags: string[];
}
export function Tags({ tags }: TagsProps) {
  return (
    <div className="flex justify-center text-[#787486] w-fit h-[20px] gap-2 ">
      {tags.map((tag) => {
        return <Tag key={tag} value={tag} />;
      })}
    </div>
  );
}
