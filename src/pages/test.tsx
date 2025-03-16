import Header from "@/components/common/Header";
import CardModal from "@/components/ModalContents/Card.modal";
import NewDashboard from "@/components/ModalContents/NewDashboard";

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
      <NewDashboard />
    </div>
  );
}
