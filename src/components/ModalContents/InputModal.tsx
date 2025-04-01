import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UnifiedInput from "@/components/common/Input/Input";
import { getColumns } from "@/api/column.api";

interface InputProps {
  label: string;
  placeholder: string;
  title: string;
  isColumn?: boolean;
  dashboardId?: number;
  variant: "email" | "column";
  changeValue: (value: string) => void;
  setError?: Dispatch<SetStateAction<boolean>>;
}
export default function InputModal({
  label,
  title,
  placeholder,
  variant,
  changeValue,
  setError,
  dashboardId,
  isColumn,
}: InputProps) {
  const [currentValue, setCurrentValue] = useState(
    isColumn ? "새로운 컬럼" : ""
  );
  const [isError, setIsError] = useState(false);
  const [columnsData, setColumnsData] = useState<Column[]>([]);

  useEffect(() => {
    columnsDuplicated();
  }, [changeValue]);

  const columnsDuplicated = async () => {
    if (!isColumn && !dashboardId) return;
    const columns = await getColumns(Number(dashboardId));
    setColumnsData(columns);
  };

  const handleChange = (value: string) => {
    if (setError && currentValue !== "") {
      const isDuplicate = columnsData.some(
        (column: Column) => column.title.trim() === value.trim()
      );
      setError(isDuplicate);
      setIsError(isDuplicate);
    }
    setCurrentValue(value);
    changeValue(value);
  };
  return (
    <div className="flex flex-col w-full gap-4 tablet:gap-6">
      <p className="text-xl-bold tablet:text-2xl-bold">{title}</p>
      <div className="flex flex-col gap-2">
        <div>
          <UnifiedInput
            variant={variant}
            label={label}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
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
