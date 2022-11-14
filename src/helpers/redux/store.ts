import { configureStore } from '@reduxjs/toolkit';
import boardsDataSlice from './boardsDataSlice';
import selectedBoardDataSlice from './selectedBoardSlice';
import userDataSlice from './userDataSlice';

export default configureStore({
  reducer: {
    userData: userDataSlice,
    boardsData: boardsDataSlice,
    selectedBoard: selectedBoardDataSlice,
  },
});
