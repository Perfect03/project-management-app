import { configureStore } from '@reduxjs/toolkit';
import boardsDataSlice from './boardsDataSlice';
import searchDataSlice from './searchDataSlice';
import selectedBoardDataSlice from './selectedBoardSlice';
import userDataSlice from './userDataSlice';

export default configureStore({
  reducer: {
    userData: userDataSlice,
    boardsData: boardsDataSlice,
    selectedBoard: selectedBoardDataSlice,
    searchData: searchDataSlice,
  },
});
