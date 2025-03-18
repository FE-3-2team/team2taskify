import { useState } from "react";

const TitleInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value && (value.length < 2 || value.length > 12)) {
      setError("2 ~ 12자의 제목을 지어주세요");
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="title-input"
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        제목
        {title && !error ? (
          <span className="text-violet-700">*</span>
        ) : (
          <span className="text-gray-700">*</span>
        )}
      </label>

      <input
        id="title-input"
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={handleChange}
        maxLength={12}
        className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TitleInput;
