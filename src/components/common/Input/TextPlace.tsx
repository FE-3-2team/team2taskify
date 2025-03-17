import { useState } from "react";

const CommentBox: React.FC = () => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);

    if (value && (value.length < 2 || value.length > 300)) {
      setError("최대 300자 까지 입력 할 수 있습니다.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim() || error) return;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment }),
      });

      if (!response.ok) {
        console.error("서버 요청 실패");
      } else {
        setComment("");
      }
    } catch (error) {
      console.error("요청 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="comment-input"
        className="block mb-2 text-sm text-gray-700 text-lg-regular"
      >
        댓글
        {comment && !error ? (
          <span className="text-violet-700">*</span>
        ) : (
          <span className="text-gray-700">*</span>
        )}
      </label>

      {/* 컨테이너: 520px 너비, 8px border-radius, 1px border, 16px 패딩 */}
      <div className="w-full max-w-[520px] rounded-[8px] border p-4">
        {/* 텍스트영역: 전체 너비, 높이 100px, resize 방지, border 제거 */}
        <textarea
          id="comment-input"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={handleChange}
          maxLength={300}
          className="w-full h-[100px] resize-none outline-none border-0 focus:outline-none"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        {/* 버튼: 너비 83px, 높이 32px, 4px border-radius, 1px border, 지정된 패딩, 배경 흰색, border 색상 #D9D9D9 */}
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            className="w-[83px] h-[32px] rounded-[4px] border bg-white border-[#D9D9D9] pt-[9px] pr-[31px] pb-[9px] pl-[31px] text-gray-700 hover:bg-gray-100"
          >
            입력
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
