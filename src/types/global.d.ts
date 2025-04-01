export {};

declare global {
  interface User {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId?: number;
    isOwner?: boolean;
  }
  interface Member {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    isOwner: boolean;
  }

  interface MemberData {
    totalCount: number;
    members: Member[];
  }
  interface Assignee {
    id: number;
    profileImageUrl: string | null;
    nickname: string;
    userId: number;
  }
  interface Card {
    cardId: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: Assignee | null;
    imageUrl: string | null;
    columnId: number;
    updatedAt?: string;
  }

  interface CardComment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
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
    createdAt: Date;
    updatedAt: Date;
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
    createdAt: Date;
    updatedAt: Date;
  }
}
