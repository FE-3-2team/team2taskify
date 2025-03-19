import { Login } from "@/api/auth";
import useAuthStore from "@/utils/Zustand/zustand";
import { useStore } from "zustand";
import { removeItem } from "@/utils/localstorage";
export default function Test() {
  const store = useStore(useAuthStore, (state) => state);
  const TestLogout = () => {
    store.logout();
    removeItem("accessToken");
  };

  const TestLogin = async () => {
    await Login();
  };
  return (
    <div className="h-dvw">
      <div>컴포넌트등 테스트 페이지 입니다.</div>

      <div className="flex flex-col">
        <button onClick={TestLogin}>
          이버튼을 누르면 accessToken을 받습니다.
        </button>
        <button onClick={TestLogout}>로그아웃</button>
      </div>
    </div>
  );
}
