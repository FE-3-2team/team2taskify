import { Login } from "@/api/auth";
import useAuthStore from "@/utils/Zustand/zustand";
import { useStore } from "zustand";
import { removeItem } from "@/utils/localstorage";
import { DetailContent, Modal } from "@/components/common/ModalPopup";
import CardModal from "@/components/ModalContents/Card.modal";

export default function Test() {
  const card = {
    id: 0,
    title: "카드이름",
    description: "카드 안에 설명 ",
    tags: ["태그1"],
    dueDate: null,
    assignee: {
      profileImageUrl: null,
      nickname: "유선향",
      id: 1,
    },
    imageUrl: null,
    teamId: "string",
    columnId: 0,
    createdAt: "",
    updatedAt: "",
  };
  const store = useStore(useAuthStore, (state) => state);
  const TestLogout = () => {
    store.logout();
    removeItem("accessToken");
  };

  const TestLogin = async () => {
    await Login();
  };
  return (
    <div className="h-[3000px] ">
      <div>컴포넌트등 테스트 페이지 입니다.</div>

      <div className="flex flex-col">
        <button onClick={TestLogin}>
          이버튼을 누르면 accessToken을 받습니다.
        </button>
        <button onClick={TestLogout}>로그아웃</button>
        <Modal
          onClick={() => {}}
          ModalCloseButton="취소"
          ModalOpenButton="기본 모달버튼 "
        >
          <div>여기가 모달의 내용입니다.</div>
        </Modal>

        <DetailContent ModalOpenButton="상세보기 버튼">
          <CardModal card={card} columnTitle="테스트" comments={[]} />
        </DetailContent>
      </div>
    </div>
  );
}
