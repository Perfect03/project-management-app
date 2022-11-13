import { createSlice } from '@reduxjs/toolkit';
import { IBoardsData } from 'interfaces/redux';

const initialState: IBoardsData = {
  isLoading: false,
  error: '',
  boards: [],
};

export const boardsDataSlice = createSlice({
  name: 'boardsData',
  initialState,
  reducers: {
    isLoadingReducer(state, action) {
      state.isLoading = action.payload;
    },
    isErrorBoardsData(state, action) {
      state.isLoading = action.payload;
    },
    boardsReducer(state, action) {
      state.boards = action.payload;
    },
  },
});

export const { isErrorBoardsData, isLoadingReducer, boardsReducer } = boardsDataSlice.actions;

export default boardsDataSlice.reducer;
