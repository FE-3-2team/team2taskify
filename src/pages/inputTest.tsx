import React, { useState } from "react";
import UnifiedInput from "../components/common/Input/TestInput2";

export default function InputTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(""); // "yyyy-MM-dd" 형식의 문자열

  return (
    <div className="container p-4 mx-auto space-y-8">
      <section>
        <UnifiedInput
          variant="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={setEmail}
        />
      </section>

      <section>
        <UnifiedInput
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={setPassword}
        />
      </section>

      <section>
        <UnifiedInput
          variant="title"
          label="제목"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={setTitle}
        />
      </section>

      <section>
        <UnifiedInput
          variant="comment"
          label="댓글"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={setComment}
          onSubmit={async () => {
            console.log("댓글 제출:", comment);
          }}
        />
      </section>

      <section>
        <UnifiedInput
          variant="date"
          label="마감일"
          placeholder="날짜를 입력해 주세요"
          value={date}
          onChange={setDate}
        />
      </section>
    </div>
  );
}
