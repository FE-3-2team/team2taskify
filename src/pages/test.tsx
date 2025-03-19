import { Login } from "@/api/login";
import { Badge } from "@/components/common/Badge";
import Profile from "@/components/common/Profile";

const user = {
  id: 0,
  email: "gbtm@naver.com",
  nickname: "유선향",
  profileImageUrl: null,
  createdAt: "string",
  updatedAt: "string",
};

const invitation = [
  {
    id: 0,
    inviter: {
      nickname: "string",
      email: "string",
      id: 0,
    },
    teamId: "string",
    dashboard: {
      title: "string",
      id: 0,
    },
    invitee: {
      nickname: "string",
      email: "string",
      id: 0,
    },
    inviteAccepted: true,
    createdAt: "2025-03-17T11:54:32.143Z",
    updatedAt: "2025-03-17T11:54:32.143Z",
  },
];
const members = [
  {
    id: 0,
    email: "gbtm@naver.com",
    nickname: "유선향",
    profileImageUrl: null,
    createdAt: "string",
    updatedAt: "string",
  },
];

export default function Test() {
  const TestLogin = async () => {};
  return (
    <div className="h-dvw">
      <div>컴포넌트등 테스트 페이지 입니다.</div>
      <Badge nickname="유선향" img={null} isCard />
      <button onClick={TestLogin}>로그인</button>
    </div>
  );
}
