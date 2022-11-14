import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './appSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});
