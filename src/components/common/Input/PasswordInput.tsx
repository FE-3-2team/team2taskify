import { useState } from "react";
import Image from "next/image";
import EyeCloseIcon from "../../../assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "../../../assets/icons/EyeVisibility_on.svg";

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

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
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        비밀번호
      </label>
      <div className="relative w-full">
        <input
          id="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력 해주세요"
          value={password}
          onChange={handleChange}
          maxLength={15}
          className={`w-full h-12 rounded-lg border p-4 pr-10 focus:outline-none text-lg-regular ${
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
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
