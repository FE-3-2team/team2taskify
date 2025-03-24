import { useEffect, useState } from "react";

interface Props {
  value?: string;
}

const colorClasses = [
  "bg-brown text-orange",
  "bg-green-100 text-green-200",
  "bg-pink400 text-pink500",
  "bg-blue-200 text-blue-300",
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
    <div className="flex justify-center w-fit h-[20px] gap-2">
      {tags.map((tag) => {
        return <Tag key={tag} value={tag} />;
      })}
    </div>
  );
}
