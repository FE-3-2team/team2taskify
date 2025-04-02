//types
export interface CardData {
  assignee: Assignee;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

//initialValues
export const INITIAL_CARD = {
  assignee: {
    id: 0,
    nickname: "",
    profileImageUrl: "",
    userId: 0,
  },
  title: "",
  description: "",
  dueDate: "",
  tags: [],
  imageUrl: "",
};

export const INITIAL_SUBMIT_CARD = {
  assigneeUserId: 0,
  dashboardId: 0,
  columnId: 0,
  title: "",
  description: "",
  dueDate: "",
  tags: [],
  imageUrl: "",
  imageFile: null,
};
