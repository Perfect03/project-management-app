import { IBoard, IColumn, ITask } from './api';

export interface IUserData {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: { id: string; name: string; login: string };
}

export interface IBoardsData {
  isLoading: boolean;
  error: string;
  boards: IBoard[];
}

export interface ISelectedBoard {
  isLoading: boolean;
  error: string;
  board: { _id: string; title: string; owner: string; users: string[] };
  columns: IColumn[];
  tasks: ITask[];
}

export interface IGetState {
  userData: IUserData;
  boardsData: IBoardsData;
  selectedBoard: ISelectedBoard;
  searchData: { findedBoards: IBoard[] };
}
