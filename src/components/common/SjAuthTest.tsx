import { useState } from "react";
import Image from "next/image";
import EyeCloseIcon from "../../../assets/icons/EyeVisibility_off.svg";
import EyeOpenIcon from "../../../assets/icons/EyeVisibility_on.svg";

const EmailInput: React.FC<{
  email: string;
  setEmail: (email: string) => void;
}> = ({ email, setEmail }) => {
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

const PasswordInput: React.FC<{
  password: string;
  setPassword: (password: string) => void;
}> = ({ password, setPassword }) => {
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

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const teamId = "1234";
      const response = await fetch(
        `https://sp-taskify-api.vercel.app/${teamId}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("로그인 성공!");
        console.log("로그인 성공:", data);
      } else {
        alert(data.message || "로그인 실패");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("서버 오류 발생");
    } finally {
      setLoading(false);
    }
  };
  //임시
  return (
    <div className="w-full mx-auto space-y-4">
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full text-white rounded-lg cursor-pointer bg-gray-9FA6B2 text-lg-regular h-14 hover:bg-violet-700 disabled:bg-gray-300"
      >
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </div>
  );
};

export default AuthForm;
