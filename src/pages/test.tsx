import React from "react";
import ProfileContainer from "@/components/EditCard";

const ProfileTestPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">프로필 테스트 페이지</h1>
      <ProfileContainer />
    </div>
  );
};
const testpage = () => {
  return (
    <div className="absolute top-5 left-5 w-full max-w-[672px] rounded-2xl p-6 gap-6">
      <ProfileContainer />
    </div>
  );
};

export default testpage;
