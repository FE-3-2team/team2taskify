import { Login } from "@/api/auth";
import useAuthStore from "@/utils/Zustand/zustand";
import { useStore } from "zustand";
import { removeItem } from "@/utils/localstorage";
import CardModal from "@/components/ModalContents/Card.modal";
export default function Test() {
  const store = useStore(useAuthStore, (state) => state);
  const TestLogout = () => {
    store.logout();
    removeItem("accessToken");
  };

  const TestLogin = async () => {
    await Login();
  };

  const cardData = {
    id: 0,
    title: "할일목록인데, 이름이 길면 어떻게 해야할지 생각중입니다.",
    description:
      "설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요 설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요설명이 너무 길면 이상할테니 이부분도 스크롤해야겠어요 ",
    tags: ["태그1", "태그2", "태그3", "태그4"],
    dueDate: null,
    assignee: {
      profileImageUrl: null,
      nickname: "유선향",
      id: 0,
    },
    imageUrl: null,
    teamId: "13-4",
    columnId: 0,
    createdAt: "2025-03-20T07:16:02.691Z",
    updatedAt: "2025-03-20T07:16:02.691Z",
  };
  return (
    <div className="h-dvw">
      <div>컴포넌트등 테스트 페이지 입니다.</div>

      <div className="flex flex-col">
        <button onClick={TestLogin}>
          이버튼을 누르면 accessToken을 받습니다.
        </button>
        <button onClick={TestLogout}>로그아웃</button>
        <CardModal card={cardData} columnTitle="컬럼 이름" />
      </div>
    </div>
  );
}
