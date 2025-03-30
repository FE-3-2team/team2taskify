export {};

declare global {
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
  interface Member {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    userId: number;
    isOwner: boolean;
  }
  interface Assignee {
    id: number;
    userId: number;
    profileImageUrl: string | null;
    nickname: string;
  }
  interface Card {
    cardId: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: Date | null;
    assignee: Assignee | null;
    imageFile: File | null;
    imageUrl: string | null;
    columnId: number;
    createdAt?: string;
    updatedAt?: string;
  }
  interface CardComment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    author: {
      profileImageUrl: string | null;
      nickname: string;
      id: number;
    };
  }

  interface Dashboards {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }
  interface Invitation {
    id: number;
    inviter: {
      nickname: string;
      email: string;
      id: number;
    };
    teamId: string;
    dashboard: {
      title: string;
      id: number;
    };
    invitee: {
      nickname: string;
      email: string;
      id: number;
    };
  }
  interface Column {
    id: number;
    title: string;
    teamId: string;
    dashboardId: number;
    createdAt: string;
    updatedAt: string;
  }
}
