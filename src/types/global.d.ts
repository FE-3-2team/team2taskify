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
  interface Card {
    id: number;
    title: string;
    description: string;
    tags: [string];
    dueDate: string;
    assignee: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
    imageUrl: string;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  }
  interface Comment {
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
}
