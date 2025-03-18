// TextInput.tsx
import React from "react";

interface TextInputProps {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: string;
  showAsterisk?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id = "text-input",
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  error,
  showAsterisk = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        {label}
        {showAsterisk &&
          (value && !error ? (
            <span className="text-violet-700">*</span>
          ) : (
            <span className="text-gray-700">*</span>
          ))}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
