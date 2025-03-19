import { Login } from "@/api/login";

export default function Test() {
  const TestLogin = async () => {
    await Login();
  };
  return (
    <div className="h-dvw">
      <div>컴포넌트등 테스트 페이지 입니다.</div>

      <button onClick={TestLogin}>
        이버튼을 누르면 accessToken을 받습니다.
      </button>
    </div>
  );
}
