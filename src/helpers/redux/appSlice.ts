import { createSlice } from '@reduxjs/toolkit';
import { IState } from 'interfaces/redux';

const initialState: IState = {
  user: {
    userId: '',
    isAuth: false,
    currentLang: 'ru',
  },
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    userIdReducer(state, action) {
      state.user.userId = action.payload;
    },
    isAuthReducer(state, action) {
      state.user.isAuth = action.payload;
    },
    currentLang(state, action) {
      state.user.currentLang = action.payload;
    },
  },
});

export const { userIdReducer, isAuthReducer, currentLang } = appSlice.actions;

export default appSlice.reducer;
