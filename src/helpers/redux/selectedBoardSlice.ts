import { createSlice } from '@reduxjs/toolkit';
import { ISelectedBoard } from 'interfaces/redux';

const initialState: ISelectedBoard = {
  isLoading: false,
  error: '',
  board: {},
};

export const selectedBoardDataSlice = createSlice({
  name: 'selectedBoard',
  initialState,
  reducers: {
    isLoadingReducer(state, action) {
      state.isLoading = action.payload;
    },
    isErrorSelectedBoard(state, action) {
      state.isLoading = action.payload;
    },
    boardReducer(state, action) {
      state.board = action.payload;
    },
  },
});

export const { isLoadingReducer, isErrorSelectedBoard, boardReducer } =
  selectedBoardDataSlice.actions;

export default selectedBoardDataSlice.reducer;
