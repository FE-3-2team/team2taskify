export {};

declare global {
  // users/me: 내 정보 조회
  interface Me {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  }
  // /members : 멤버 조회
  interface Member {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
  }
}
