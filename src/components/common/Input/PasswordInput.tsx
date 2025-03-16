import { useState } from "react";
import Image from "next/image";
import EyeCloseIcon from "../../../assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "../../../assets/icons/EyeVisibility_on.svg";

const commonInputStyle: React.CSSProperties = {
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // 값이 존재하면 길이가 8 미만일 때만 에러 메시지 출력.
    if (value && value.length < 8) {
      setError("8 ~ 15자만 입력 가능합니다");
    } else {
      setError("");
    }
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
          style={commonInputStyle}
          maxLength={15}
          className={`w-full border rounded focus:outline-none pr-10 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer hover:opacity-80 focus:outline-none"
        >
          <Image
            src={showPassword ? EyeOpenIcon : EyeCloseIcon}
            alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            width={20}
            height={20}
          />
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordInput;
