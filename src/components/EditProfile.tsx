import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ClipLoader } from "react-spinners";
import { instance } from "@/api/instance";
import UnifiedInput from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import ProfileImg from "@/assets/icons/CardProfile.svg";
import { AlertModal } from "@/components/ModalContents/AlertModal";
import useAuthStore from "@/utils/Zustand/zustand";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  // profileImage 타입을 string | null 로 관리 (기본값: ProfileImg)
  const [profileImage, setProfileImage] = useState<string | null>(ProfileImg);
  const [errorMsg, setErrorMsg] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [upImg, setUpImg] = useState<string | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  // 프로필 이미지 제거 상태 플래그
  const [removedImage, setRemovedImage] = useState(false);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    aspect: 1,
  } as Crop);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get("/users/me");
        const userData = response.data;
        setEmail(userData.email);
        setNickname(userData.nickname);
        setProfileImage(userData.profileImageUrl || ProfileImg);
        setRemovedImage(false);
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
      setIsLoading(true);
      const imageUrl = URL.createObjectURL(file);
      setUpImg(imageUrl);
      setCropping(true);
      setNewImageFile(file);
      setRemovedImage(false);
      setIsLoading(false);
    }
  };

  const onImageLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      imgRef.current = e.currentTarget;
    },
    []
  );

  const onCropComplete = (c: Crop) => {
    setCompletedCrop(c);
  };

  const onCropChange = (c: Crop) => {
    setCrop(c);
  };

  const makeClientCrop = async () => {
    if (imgRef.current && completedCrop?.width && completedCrop?.height) {
      const croppedImageUrl = await getCroppedImg(
        imgRef.current,
        completedCrop,
        "cropped.jpeg"
      );
      setProfileImage(croppedImageUrl);
      setCropping(false);
    }
  };

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop,
    fileName: string
  ): Promise<string> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return Promise.reject(new Error("2d context not available"));
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], fileName, { type: blob.type });
        if (profileImage) window.URL.revokeObjectURL(profileImage);
        const newCroppedImageUrl = window.URL.createObjectURL(file);
        resolve(newCroppedImageUrl);
      }, "image/jpeg");
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCancelCrop = () => {
    setCropping(false);
    setUpImg(null);
    setNewImageFile(null);
  };

  // 프로필 사진 제거 함수
  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setNewImageFile(null);
    setRemovedImage(true);
  };

  const handleSave = async () => {
    if (nickname.trim() === "") {
      setErrorMsg("닉네임을 입력해주세요.");
      return;
    }
    try {
      let uploadedImageUrl: string | null = null;
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);
        const imageResponse = await instance.post("/users/me/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedImageUrl = imageResponse.data.profileImageUrl;
      }
      // 기본 이미지인 경우, profileImage가 기본 이미지와 동일하면 null을 전송
      const currentProfileImage =
        profileImage === ProfileImg ? null : profileImage;
      const updateBody = {
        nickname,
        profileImageUrl:
          uploadedImageUrl !== null ? uploadedImageUrl : currentProfileImage,
      };

      const updateResponse = await instance.put("/users/me", updateBody);
      useAuthStore.setState({
        userNickname: updateResponse.data.nickname,
        profileImageUrl: updateResponse.data.profileImageUrl,
      });
      setAlertModalOpen(true);
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMsg("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="w-full max-w-[284px] tablet:max-w-[672px] p-[16px] tablet:p-[24px] bg-white rounded-[8px] tablet:rounded-[16px]">
        <h2 className="mb-[40px] tablet:mb-[24px] text-2lg-bold tablet:text-2xl-bold">
          프로필
        </h2>
        <div className="flex flex-col gap-6 tablet:flex-row">
          <div className="relative flex-shrink-0">
            <div
              className="relative w-[182px] h-[182px] overflow-hidden cursor-pointer"
              onClick={triggerFileInput}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <ClipLoader color="#ffffff" size={40} />
                </div>
              )}
              {!cropping && (
                <>
                  <Image
                    src={profileImage || ProfileImg}
                    alt="Profile"
                    fill
                    onLoadingComplete={() => setIsLoading(false)}
                    style={{ objectFit: "cover" }}
                  />
                  {profileImage && profileImage !== ProfileImg && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveProfileImage();
                      }}
                      className="absolute flex items-center justify-center w-6 h-6 text-sm text-gray-700 bg-white rounded-full shadow cursor-pointer top-1 right-1"
                    >
                      ×
                    </button>
                  )}
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
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
            />
            <UnifiedInput
              variant="title"
              label="닉네임"
              placeholder=""
              value={nickname}
              onChange={(val) => {
                setNickname(val);
                if (val.trim() !== "") setErrorMsg("");
              }}
              disable={false}
              hideAsterisk={true}
            />
            {errorMsg && (
              <p className="mt-2 text-sm text-[#d6173a]">{errorMsg}</p>
            )}
            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} variant="primary">
                저장
              </Button>
            </div>
          </div>
        </div>
        {cropping && upImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="p-4 bg-white rounded max-h-[90vh] overflow-y-auto">
              <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
              >
                <img
                  src={upImg}
                  alt="Crop me"
                  onLoad={onImageLoaded}
                  style={{ maxHeight: "35vh", width: "auto" }}
                />
              </ReactCrop>
              <div className="flex flex-col items-end gap-2 mt-4">
                <Button onClick={handleCancelCrop} variant="secondary">
                  취소
                </Button>
                <Button onClick={makeClientCrop} variant="primary">
                  완료
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AlertModal
        isOpen={alertModalOpen}
        message="프로필이 변경되었습니다"
        onConfirm={() => setAlertModalOpen(false)}
      />
    </>
  );
};

export default EditProfile;
