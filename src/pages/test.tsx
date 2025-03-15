import { Badge, Badges } from "@/components/common/Badge";

export default function Test() {
  const member = {
    id: 0,
    userId: 1,
    email: "string",
    nickname: "string",
    profileImageUrl: null,
    createdAt: "2025-03-15T09:24:06.656Z",
    updatedAt: "2025-03-15T09:24:06.656Z",
    isOwner: false,
  };
  const member2 = {
    id: 0,
    userId: 1,
    email: "string",
    nickname: "atring",
    profileImageUrl: null,
    createdAt: "2025-03-15T09:24:06.656Z",
    updatedAt: "2025-03-15T09:24:06.656Z",
    isOwner: false,
  };
  const member3 = {
    id: 0,
    userId: 1,
    email: "string",
    nickname: "utring",
    profileImageUrl: null,
    createdAt: "2025-03-15T09:24:06.656Z",
    updatedAt: "2025-03-15T09:24:06.656Z",
    isOwner: false,
  };

  const members = [member, member2, member3, member, member];
  return (
    <div className="bg-black">
      <div>컴포넌트등 테스트 페이지 입니다.</div>
      <Badge value={member} />
      <Badges badges={members} />
    </div>
  );
}
