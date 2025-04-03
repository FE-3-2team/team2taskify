//types

export interface CardData {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
export interface EditCardData extends CardData {
  columnId: number;
  assignee: Assignee;
  members: Assignee[];
}
//initialValues
export const INITIAL_CARD = {
  title: "",
  description: "",
  dueDate: "",
  tags: [],
  imageUrl: "",
};

export const INITIAL_ASSIGNEE = {
  id: 0,
  nickname: "",
  profileImageUrl: "",
  userId: 0,
};

export const INITIAL_EDIT_CARD = {
  columnId: 0,
  assignee: INITIAL_ASSIGNEE,
  members: [INITIAL_ASSIGNEE],
  ...INITIAL_CARD,
};
