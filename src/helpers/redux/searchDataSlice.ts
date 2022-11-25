import { createSlice } from '@reduxjs/toolkit';
import { IBoard, ITask } from 'interfaces/api';

const initialState: { findedBoards: IBoard[] } = {
  findedBoards: [],
};

const searchDataSlice = createSlice({
  name: 'findedBoards',
  initialState,
  reducers: {
    findedBoardsReducer(state, action) {
      state.findedBoards = action.payload;
    },
  },
});

export const { findedBoardsReducer } = searchDataSlice.actions;

export default searchDataSlice.reducer;
