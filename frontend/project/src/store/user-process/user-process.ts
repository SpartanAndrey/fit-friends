import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../constant';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction, checkEmail, registerCoachAction, registerUserAction, fetchUserCoachAction, fetchUserCatalogAction, fetchUserAction, fetchUserSimpleAction, fetchUserOtherAction, fetchUserFriendsAction } from '../api-action';

const initialState: UserProcess = {
  userData: {
    authStatus: AuthorizationStatus.Unknown,
    loggedUser: null,
    existsEmail: false,
    coachInfo: null,
    userSimpleInfo: null,
    userInfo: null,
    userOtherInfo: null,
    isLoading: false,
    isUserCatalogLoading: false,
    users: [],
    friends: [],
    isFriendsListLoading: false,
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
      })
      .addCase(fetchUserCoachAction.pending, (state) => {
        state.userData.isLoading = true;
      })
      .addCase(fetchUserCoachAction.fulfilled, (state, action) => {
        state.userData.coachInfo = action.payload;
        state.userData.isLoading = false;
      })
      .addCase(fetchUserSimpleAction.pending, (state) => {
        state.userData.isLoading = true;
      })
      .addCase(fetchUserSimpleAction.fulfilled, (state, action) => {
        state.userData.userSimpleInfo = action.payload;
        state.userData.isLoading = false;
      })
      .addCase(fetchUserAction.pending, (state) => {
        state.userData.isLoading = true;
      })
      .addCase(fetchUserAction.fulfilled, (state, action) => {
        state.userData.userInfo = action.payload;
        state.userData.isLoading = false;
      })
      .addCase(fetchUserOtherAction.pending, (state) => {
        state.userData.isLoading = true;
      })
      .addCase(fetchUserOtherAction.fulfilled, (state, action) => {
        state.userData.userInfo = action.payload;
        state.userData.isLoading = false;
      })
      .addCase(fetchUserCatalogAction.pending, (state) => {
        state.userData.isUserCatalogLoading = true;
      })
      .addCase(fetchUserCatalogAction.fulfilled, (state, action) => {
        state.userData.users = action.payload;
        state.userData.isUserCatalogLoading = false;
      })
      .addCase(fetchUserCatalogAction.rejected, (state) => {
        state.userData.isUserCatalogLoading = false;
      })
      .addCase(fetchUserFriendsAction.pending, (state) => {
        state.userData.isFriendsListLoading = true;
      })
      .addCase(fetchUserFriendsAction.fulfilled, (state, action) => {
        state.userData.friends = action.payload;
        state.userData.isFriendsListLoading = false;
      })
      .addCase(fetchUserFriendsAction.rejected, (state) => {
        state.userData.isFriendsListLoading = false;
      });
  }
});
