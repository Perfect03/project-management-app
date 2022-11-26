import { configureStore } from '@reduxjs/toolkit';
import boardsDataSlice from './boardsDataSlice';
import selectedBoardDataSlice from './selectedBoardSlice';
import userDataSlice from './userDataSlice';
import currentDragItemSlice from './currentDragItemSlice'

export default configureStore({
  reducer: {
    userData: userDataSlice,
    boardsData: boardsDataSlice,
    selectedBoard: selectedBoardDataSlice,
    currentDragItem: currentDragItemSlice,
  },
});
