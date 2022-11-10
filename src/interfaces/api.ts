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
  title: string,
  order: number,
  boardId?: string
}