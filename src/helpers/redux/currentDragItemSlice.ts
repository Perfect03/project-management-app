import { createSlice } from '@reduxjs/toolkit';
import { ICurrentDragItem } from 'interfaces/redux';

const initialState: ICurrentDragItem = {
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
};

export const currentDragItemSlice = createSlice({
  name: 'currentDragItem',
  initialState,
  reducers: {
    isCurrentColumn(state, action) {
      state.currentColumnId = action.payload;
    },
    isCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
  },
});

export const { isCurrentColumn, isCurrentTask } = currentDragItemSlice.actions;

export default currentDragItemSlice.reducer;
