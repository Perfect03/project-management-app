export interface IUserAuth {
  name?: string;
  login: string;
  password: string;
}

export interface IBoard {
  title: string;
  owner: string;
  users: string[];
}

export interface IColumn {
  title: string;
  order: number;
  boardId?: string;
}

export interface ITask {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: string[];
}

export interface ITaskInSet {
  _id: string;
  order: number;
  columnId: string;
}

export type ITaskSet = ITaskInSet[];

export interface IFile {
  boardId: string;
  taskId: string;
  file: File;
}

export interface IPointNew {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface IPointUpdate {
  _id: string;
  done: boolean;
}

export type IPointSet = IPointUpdate[];
