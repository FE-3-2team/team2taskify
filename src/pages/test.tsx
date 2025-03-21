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
          rightOnClick={() => {}}
          ModalCloseButton="취소"
          ModalOpenButton="기본 모달버튼 "
          rightHandlerText="생성"
        >
          <div>여기가 모달의 내용입니다 이안에 모달 컨텐츠를 넣어야 해요.</div>
        </Modal>
        <Modal
          rightOnClick={() => {}}
          ModalCloseButton="취소"
          ModalOpenButton="기본 모달버튼 "
          rightHandlerText="오른쪽"
          leftOnClick={() => {}}
          leftHandlerText="왼쪽"
        >
          <div>leftHandlerText와 leftOnClick을 넣어야 해요</div>
        </Modal>
        <Modal
          rightOnClick={() => {}}
          ModalCloseButton="취소"
          ModalOpenButton={
            <div className="w-[200px]">이렇게 사용하셔야 해요</div>
          }
          rightHandlerText="오른쪽"
          leftOnClick={() => {}}
          leftHandlerText="왼쪽"
        >
          <div>
            여기는 핸들러가 두개인 모달입니다. leftHandlerText와 leftOnClick을
            넣어야 해요
          </div>
        </Modal>
        <DetailContent ModalOpenButton="상세보기 버튼">
          <CardModal card={card} columnTitle="테스트" comments={[]} />
        </DetailContent>
      </div>
    </div>
  );
}
