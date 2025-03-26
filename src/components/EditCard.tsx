import React, { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import UnifiedInput from "@/components/common/Input";
import Button from "@/components/common/Button/Button";
import ProfileImg from "@/assets/icons/CardProfile.svg";

const ProfileContainer = () => {
  const [email] = useState("johndoe@gmail.com");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string>(ProfileImg);
  const [errorMsg, setErrorMsg] = useState("");

  // 새로 업로드할 파일을 저장하기 위한 상태
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 선택 시, 파일 유효성 검사 후 미리보기 및 파일 상태 업데이트
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrorMsg("지원하는 이미지 형식은 PNG, JPG만 가능합니다.");
        return;
      }
      if (file.size > maxSize) {
        setErrorMsg("파일 크기는 최대 5MB까지 허용됩니다.");
        return;
      }
      setErrorMsg("");
      // 미리보기용 URL 생성 및 상태 업데이트
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setNewImageFile(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 프로필 정보를 서버에 업데이트하는 함수
  const handleSave = async () => {
    try {
      let uploadedImageUrl: string | null = null;
      // 새 이미지 파일이 있는 경우 서버에 업로드
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);
        // POST 요청: 프로필 이미지 업로드
        const imageResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}//users/me/image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // 서버에서 반환한 profileImageUrl 값을 사용
        uploadedImageUrl = imageResponse.data.profileImageUrl;
      }

      const updateBody = {
        nickname,
        profileImageUrl: uploadedImageUrl || profileImage,
      };

      const updateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}//users/me`,
        updateBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile updated:", updateResponse.data);
      // 필요 시 상태 초기화나 성공 알림 등을 추가
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMsg("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-bold">프로필</h2>
        <div className="flex flex-col gap-6 tablet:flex-row">
          <div className="relative flex-shrink-0">
            {/* 이미지 클릭 시 파일 선택 */}
            <div
              className="relative w-[182px] h-[182px] overflow-hidden cursor-pointer"
              onClick={triggerFileInput}
            >
              <Image
                src={profileImage}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
              />
              {/* 오버레이 효과 */}
              <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black bg-opacity-0 hover:bg-opacity-30"></div>
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {errorMsg && (
              <p className="mt-2 text-sm text-red-500">{errorMsg}</p>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <UnifiedInput
              variant="email"
              label="이메일"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={() => {}}
              disable={true}
              readOnly={true}
              className="text-gray-500 opacity-50"
            />
            <UnifiedInput
              variant="title"
              label="닉네임"
              placeholder=""
              value={nickname}
              onChange={(val) => setNickname(val)}
              disable={false}
            />
            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} variant="primary">
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileContainer;
