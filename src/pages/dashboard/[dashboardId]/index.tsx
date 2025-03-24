import Header from "@/components/common/Header";
import { DetailContent, Modal } from "@/components/common/ModalPopup";
import CardModal from "@/components/ModalContents/Card.modal";

export default function Dashboard() {
  const card = {
    id: 0,
    title: "컬럼 타이틀",
    description:
      "가다라마바사아자차카타파하가나다라 가다라마바사아자차카타파하가나다라가다라마바사아자차카타파하가나다라가다라마바사아자차카타파하가나다라가다라마바사아자차카타파하가나다라가다라마바사아자차카타파하가나다라가다라마바사아자차카타파하가나다라ㅍㅍㅍ가다라마바사아자차카타파하가나다라가다라마바사아자차카타파하가나다라",
    tags: ["태그1", "태그2", "태그3"],
    dueDate: null,
    assignee: {
      profileImageUrl: null,
      nickname: "유선향",
      id: 0,
    },
    imageUrl: null,
    teamId: "",
    columnId: 0,
    createdAt: "",
    updatedAt: "",
  };
  const test = [
    {
      id: 0,
      content: "",
      createdAt: "",
      updatedAt: "",
      cardId: 0,
      author: {
        profileImageUrl: null,
        nickname: "",
        id: 0,
      },
    },
  ];
  return (
    <div>
      <Header />
      <DetailContent ModalOpenButton={<div>테스트</div>}>
        <CardModal card={card} columnTitle="타이틀" comments={test} />
      </DetailContent>
    </div>
  );
}
