import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import UnifiedInput from "@/components/common/Input";
import Button from "@/components/common/Button/Button";
import ProfileImg from "@/assets/icons/CardProfile.svg";

const ProfileContainer = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string>(ProfileImg);
  const [errorMsg, setErrorMsg] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 사용자 정보를 불러옴
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`
        );
        const userData = response.data;
        setEmail(userData.email); // API로부터 받은 이메일 설정
        setNickname(userData.nickname); // 닉네임도 초기화할 수 있음
        setProfileImage(userData.profileImageUrl || ProfileImg);
      } catch (error) {
        console.error("User data fetch error:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleSave = async () => {
    try {
      let uploadedImageUrl: string | null = null;
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);
        const imageResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/me/image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        uploadedImageUrl = imageResponse.data.profileImageUrl;
      }

      const updateBody = {
        nickname,
        profileImageUrl: uploadedImageUrl || profileImage,
      };

      const updateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
        updateBody,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Profile updated:", updateResponse.data);
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
              placeholder=""
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
