import { useState } from "react";

const CommentBox: React.FC = () => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);

    // 300자에 도달하면 오류 메시지 표시, 그 전에는 메시지 없음
    if (value.length === 300) {
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

      <div className="w-full rounded-[8px] border p-4 text-lg-regular">
        <textarea
          id="comment-input"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={handleChange}
          maxLength={300}
          className="w-full h-[100px] resize-none outline-none border-0 focus:outline-none"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            className="w-[83px] h-[36px] rounded-[4px] border bg-white border-[#D9D9D9] pt-[9px] pr-[8px] pb-[9px] pl-[8px] text-violet-5534DA hover:bg-gray-100 text-xs-medium"
          >
            입력
          </button>
        </div>
      </div>

      {/* 오류 메시지를 댓글 입력 컨테이너 밑에 표시 */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CommentBox;
