import React, { useState } from "react";
import TextInput from "./TextInput"; // 같은 폴더에 있는 경우 경로 지정

const NewColumnCreation: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    // 입력값 길이가 2 미만 또는 12 초과면 오류 메시지 표시
    if (value && (value.length < 2 || value.length > 12)) {
      setError("중복된 컬럼 이름입니다");
    } else {
      setError("");
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 상태 초기화
    setName("");
    setError("");
  };

  const handleCreate = () => {
    // 생성 버튼 클릭 시 로직 실행
    if (!error && name) {
      console.log("새 컬럼 생성:", name);
      // 실제 생성 로직 추가 가능 (예: API 호출)
    }
  };

  return (
    <div
      className="max-w-md p-4 mx-auto border
     rounded-[8px]"
    >
      <h2 className="mb-4 text-2xl-bold">새 컬럼 생성</h2>
      <TextInput
        id="column-name-input"
        label="이름"
        placeholder="새로운 프로젝트"
        value={name}
        onChange={handleChange}
        maxLength={12}
        error={error}
      />
      <div className="flex space-x-4">
        <button
          onClick={handleCancel}
          className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-#D9D9D9 rounded md:text-lg"
        >
          취소
        </button>
        <button
          onClick={handleCreate}
          className="flex-1 px-4 py-2 text-sm font-semibold text-white rounded bg-violet-5534DA md:text-lg"
        >
          생성
        </button>
      </div>
    </div>
  );
};

export default NewColumnCreation;
