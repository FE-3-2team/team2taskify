import { Modal } from "@/components/common/ModalPopup";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  columnData: {
    id: number;
    title: string;
  };
  setTitle: (v: string) => void;
  onUpdate: () => void;
  onDelete: () => void;
};

const ManageColumnModal = ({
  isOpen,
  setIsOpen,
  columnData,
  setTitle,
  onUpdate,
  onDelete,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);
        if (!open) {
          setTitle("");
        }
      }}
      ModalOpenButton={null}
      rightHandlerText="변경"
      leftHandlerText="삭제"
      rightOnClick={onUpdate}
      leftOnClick={onDelete}
    >
      <div>
        <h2 className="tablet:text-2xl-bold text-xl-bold tablet:mb-[24px] mb-[16px]">
          컬럼 관리
        </h2>
        <p className="tablet:text-2lg-medium text-lg-medium mb-[8px]">이름</p>
        <input
          type="text"
          placeholder="컬럼 이름을 입력해주세요"
          className="border border-gray-300 rounded-[8px] px-[16px] py-[15px] w-full h-[50px] tablet:text-lg-regular text-md-regular text-black-200"
          value={columnData.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default ManageColumnModal;
