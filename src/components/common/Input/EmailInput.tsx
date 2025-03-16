import { useState } from "react";

const emailInputStyle: React.CSSProperties = {
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

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 이메일 형식 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 한글 문자가 포함되어 있는지 검사 (가-힣 범위)
    const hangulRegex = /[가-힣]/;

    if (value && hangulRegex.test(value)) {
      setError("이메일 형식으로 입력해주세요");
    } else if (value && !emailRegex.test(value)) {
      setError("이메일 형식으로 입력해주세요");
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="email-input"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        이메일
      </label>
      <input
        id="email-input"
        type="email"
        placeholder="이메일을 입력 해주세요"
        value={email}
        onChange={handleChange}
        style={emailInputStyle}
        maxLength={25}
        className={`border rounded focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default EmailInput;
