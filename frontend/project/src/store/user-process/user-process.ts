import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../constant';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction, checkEmail, registerCoachAction, registerUserAction } from '../api-action';

const initialState: UserProcess = {
  userData: {
    authStatus: AuthorizationStatus.Unknown,
    loggedUser: null,
    existsEmail: false
  }
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData.authStatus = AuthorizationStatus.Auth;
        state.userData.loggedUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.userData.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData.authStatus = AuthorizationStatus.Auth;
        state.userData.loggedUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.userData.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.userData.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.userData.existsEmail = false;
      })
      .addCase(checkEmail.rejected, (state) => {
        state.userData.existsEmail = true;
      })
      .addCase(registerCoachAction.fulfilled, (state, action) => {
        state.userData.authStatus = AuthorizationStatus.Auth;
        state.userData.loggedUser = action.payload;
      })
      .addCase(registerCoachAction.rejected, (state) => {
        state.userData.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.userData.authStatus = AuthorizationStatus.Auth;
        state.userData.loggedUser = action.payload;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.userData.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});


