import Status from "@/components/common/Chip/Status.chip";
import { Tags } from "@/components/common/Chip/Tag.chip";
import Header from "@/components/common/Header";

const user = {
  id: 0,
  email: "gbtm@naver.com",
  nickname: "유선향",
  profileImageUrl: null,
  createdAt: "string",
  updatedAt: "string",
};

const members = [
  {
    id: 0,
    email: "gbtm@naver.com",
    nickname: "유선향",
    profileImageUrl: null,
    createdAt: "string",
    updatedAt: "string",
  },
  {
    id: 0,
    email: "gbtm@naver.com",
    nickname: "유선향",
    profileImageUrl: null,
    createdAt: "string",
    updatedAt: "string",
  },
  {
    id: 0,
    email: "gbtm@naver.com",
    nickname: "유선향",
    profileImageUrl: null,
    createdAt: "string",
    updatedAt: "string",
  },
  {
    id: 0,
    email: "gbtm@naver.com",
    nickname: "유선향",
    profileImageUrl: null,
    createdAt: "string",
    updatedAt: "string",
  },
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
  return (
    <div>
      <div>컴포넌트등 테스트 페이지 입니다.</div>
      <Header user={user} members={members} />
      <Status value="Test" />
    </div>
  );
}
