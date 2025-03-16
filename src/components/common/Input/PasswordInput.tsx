import { useState } from "react";

const passwordInputStyle: React.CSSProperties = {
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

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 허용된 문자: 영어 대소문자와 숫자
    const allowedPattern = /^[A-Za-z0-9]*$/;
    if (!allowedPattern.test(value)) {
      // 허용되지 않는 문자가 있다면 에러 메시지 출력 (하지만 텍스트는 그대로 유지)
      setError("숫자와 영어 대소문자만 입력 가능합니다");
    } else if (value && value.length < 8) {
      setError("8자 이상 입력해주세요");
    } else {
      setError("");
    }
    setPassword(value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="password-input"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        비밀번호
      </label>
      <div className="relative w-[520px]">
        <input
          id="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력 해주세요"
          value={password}
          onChange={handleChange}
          style={passwordInputStyle}
          className={`w-full border rounded focus:outline-none ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
        >
          <img
            src={showPassword ? "/icons/EyeOpen.svg" : "/icons/EyeClose.svg"}
            alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            className="w-5 h-5"
          />
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordInput;
