import { createSlice } from '@reduxjs/toolkit';
import { CurrentDragItemDefault } from 'consts/consts';
import { ICurrentDragItem } from 'interfaces/redux';

const initialState: ICurrentDragItem = CurrentDragItemDefault;

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
