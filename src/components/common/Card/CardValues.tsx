//types

export interface CardData {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
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
