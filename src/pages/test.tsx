import EditMember from "@/components/EditMember";

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
];

export default function Test() {
  return (
    <div className="h-dvw">
      <div>컴포넌트등 테스트 페이지 입니다.</div>
      <EditMember members={members} />
    </div>
  );
}
