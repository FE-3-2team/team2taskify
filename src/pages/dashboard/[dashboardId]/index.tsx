import Header from "@/components/common/Header";
import { DetailContent, Modal } from "@/components/common/ModalPopup";
import CardModal from "@/components/ModalContents/Card.modal";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <DetailContent ModalOpenButton={<div>테스트</div>}>
        <CardModal cardId={11806} columnTitle="To do" columnId={46119} />
      </DetailContent>
    </div>
  );
}
