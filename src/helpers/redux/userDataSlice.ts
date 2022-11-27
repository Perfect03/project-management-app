import { createSlice } from '@reduxjs/toolkit';
import { userDataDefault } from 'consts/consts';
import { IUserData } from 'interfaces/redux';

const initialState: IUserData = userDataDefault;

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    isAuthReducer(state, action) {
      state.isAuth = action.payload;
    },
    isLoadingReducer(state, action) {
      state.isLoading = action.payload;
    },
    isErrorUserData(state, action) {
      state.error = action.payload;
    },
    userReducer(state, action) {
      state.user.id = action.payload._id;
      state.user.name = action.payload.name;
      state.user.login = action.payload.login;
    },
  },
});

export const { isAuthReducer, isLoadingReducer, isErrorUserData, userReducer } =
  userDataSlice.actions;

export default userDataSlice.reducer;
