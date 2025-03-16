export {};

declare global {
  // users/me 데이터 + members: 멤버조회 데이터
  interface User {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    userId?: number;
    isOwner?: boolean;
  }
}
