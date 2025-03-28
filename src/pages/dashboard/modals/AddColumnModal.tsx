import { Modal } from "@/components/common/ModalPopup";

type Props = {
  ModalOpenButton: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  newColumnTitle: string;
  setNewColumnTitle: (value: string) => void;
  onCreateColumn: () => void;
  onCancel: () => void;
};

const AddColumnModal = ({
  ModalOpenButton,
  isOpen,
  setIsOpen,
  newColumnTitle,
  setNewColumnTitle,
  onCreateColumn,
  onCancel,
}: Props) => {
  return (
    <Modal
      className="bg-white border border-gray-300"
      ModalOpenButton={ModalOpenButton}
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);
        if (!open) {
          onCancel();
        }
      }}
      rightHandlerText="생성"
      rightOnClick={onCreateColumn}
      leftHandlerText="취소"
      leftOnClick={onCancel}
    >
      <div>
        <h2 className="tablet:text-2xl-bold text-xl-bold tablet:mb-[24px] mb-[16px]">
          새 컬럼 생성
        </h2>
        <p className="tablet:text-2lg-medium text-lg-medium mb-[8px]">이름</p>
        <input
          type="text"
          placeholder="컬럼 이름을 입력해주세요"
          className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddColumnModal;
