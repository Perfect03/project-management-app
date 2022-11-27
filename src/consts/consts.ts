export const boardsDataDefault = {
    isLoading: false,
  error: '',
  boards: [],
}

export const CurrentDragItemDefault = {
    currentColumnId: '',
  currentTask: {
    title: '',
    order: 0,
    description: '',
    userId: 0,
    users: [],
    boardId: '',
    columnId: '',
    _id: '',
  },
}

export const selectedBoardDataDefault = {
    isLoading: false,
  error: '',
  board: { _id: '', title: '', owner: '', users: [] },
  columns: [],
  tasks: [],
}

export const userDataDefault = {
    isAuth: false,
  isLoading: false,
  error: '',
  user: {
    id: '',
    name: '',
    login: '',
  },
}