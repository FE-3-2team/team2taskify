import { useState } from "react";

const titleInputStyle: React.CSSProperties = {
  width: "520px",
  height: "50px",
  borderRadius: "8px",
  borderWidth: "1px",
  borderStyle: "solid",
  paddingTop: "15px",
  paddingRight: "16px",
  paddingBottom: "15px",
  paddingLeft: "16px",
};

const TitleInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    // 텍스트가 입력되기 시작하면 길이가 2자 미만 또는 12자 초과인 경우 오류 메시지 표시
    if (value && (value.length < 2 || value.length > 12)) {
      setError("2 ~12자 의 제목을 지어주세요");
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="title-input"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        제목*
      </label>
      <input
        id="title-input"
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={handleChange}
        style={titleInputStyle}
        maxLength={12} // 13자 미만, 즉 최대 12자까지만 입력 가능
        className={`border rounded focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default TitleInput;
