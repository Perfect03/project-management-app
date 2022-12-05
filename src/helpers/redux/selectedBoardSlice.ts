import { createSlice } from '@reduxjs/toolkit';
import { selectedBoardDataDefault } from 'consts/consts';
import { ISelectedBoard } from 'interfaces/redux';

const initialState: ISelectedBoard = selectedBoardDataDefault;

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
    columnReducer(state, action) {
      state.columns = action.payload;
    },
    taskReducer(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { isLoadingReducer, isErrorSelectedBoard, boardReducer, columnReducer, taskReducer } =
  selectedBoardDataSlice.actions;

export default selectedBoardDataSlice.reducer;
