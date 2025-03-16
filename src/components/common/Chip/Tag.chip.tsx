import { useEffect, useState } from "react";

interface Props {
  value?: string;
}

const colorClasses = [
  "bg-brown-F9EEE3 text-orange-FFA500",
  "bg-green-E7F7DB text-green-7AC555",
  "bg-pink-F7DBF0 text-pink-E876EA",
  "bg-blue-DBE6F7 text-blue-76A6EA",
];

export function Tag({ value }: Props) {
  const [randomClass, setRandomClass] = useState("");

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * colorClasses.length);
    setRandomClass(colorClasses[randomNum]);
  }, []);
  return (
    <div
      className={`flex justify-center items-center py-[2px] px-[6px] w-fit rounded-sm text-xs-regular ${randomClass}`}
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
    <div className="flex justify-center w-fit h-[20px] gap-2 ">
      {tags.map((tag) => {
        return <Tag key={tag} value={tag} />;
      })}
    </div>
  );
}
