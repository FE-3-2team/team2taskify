import { ChangeEvent, useEffect, useState } from "react";
import { BaseInput } from "../common/Input";
import { getColumns } from "@/api/column.api";

interface InputProps {
  label: string;
  placeholder: string;
  title: string;
  isColumn?: boolean;
  dashboardId?: string;
  changeValue: (value: string) => void;
}
export default function InputModal({
  label,
  title,
  placeholder,
  changeValue,
  dashboardId,
  isColumn,
}: InputProps) {
  const [currentValue, setCurrentValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [columnsData, setColumnsData] = useState<Column[]>([]);

  useEffect(() => {
    columnsDuplicated();
  }, []);

  const columnsDuplicated = async () => {
    if (!isColumn && !dashboardId) return;
    const columns = await getColumns(dashboardId as string);
    setColumnsData(columns);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isColumn && currentValue) {
      const isDuplicate = columnsData.some(
        (column: Column) => column.title.trim() === e.target.value.trim()
      );
      setIsError(isDuplicate);
    }
    setCurrentValue(e.target.value);
    changeValue(e.target.value);
  };
  return (
    <div className="flex flex-col w-full gap-4 tablet:gap-6">
      <p className="text-xl-bold tablet:text-2xl-bold">{title}</p>
      <div className="flex flex-col gap-2">
        <label>{label}</label>
        <div>
          <BaseInput
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            type="text"
            className={isError ? "border-red" : "border-gray-300"}
          />
          {isError && (
            <p className="text-md-regular text-red">중복된 컬럼 이름입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
