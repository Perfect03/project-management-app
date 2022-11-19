export interface IUserData {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: { id: string; name: string; login: string };
}

export interface IBoardsData {
  isLoading: boolean;
  error: string;
  boards: [];
}

export interface ISelectedBoard {
  isLoading: boolean;
  error: string;
  board: { title: string; owner: string; users: string[] };
}

export interface IGetState {
  userData: IUserData;
  boardsData: IBoardsData;
  selectedBoard: ISelectedBoard;
}
