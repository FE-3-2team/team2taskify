//types
export interface CardData {
  assigneeUserId: number;
  dashboardId?: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CardSubmitData extends CardData {
  imageFile: File;
}
//initialValues
export const INITIAL_CARD = {
  assigneeUserId: 0,
  dashboardId: 0,
  columnId: 0,
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
