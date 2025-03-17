import { useState } from "react";

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        이메일
      </label>
      <input
        id="email-input"
        type="email"
        placeholder="이메일을 입력 해주세요"
        value={email}
        onChange={handleChange}
        maxLength={25}
        className={`w-full h-[50px] rounded-[8px] border pt-[15px] pr-[16px] pb-[15px] pl-[16px] focus:outline-none text-lg-regular ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default EmailInput;
