import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../constant';
import { AuthData } from '../types/auth-data.js';
import { LoggedUserData } from '../types/logged-user-data.js';
import { saveToken, dropToken } from '../services/token';
import { QuestionnaireCoachData } from '../types/questionnaire-coach-data.js';
import { FileType } from '../types/file-type-data.js';
import { RegisteredUserData } from '../types/registered-user-data.js';
import { CreateUserCoachDto } from '../components/dto/create-user-coach.dto.js';
import { CreateUserSimpleDto } from '../components/dto/create-user-simple.dto.js';

export const checkAuthAction = createAsyncThunk<LoggedUserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'user/checkAuth',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<LoggedUserData>(APIRoute.Login);
      return data;
    },
  );

export const loginAction = createAsyncThunk<LoggedUserData, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password}, {extra: api}) => {
      const {data} = await api.post<LoggedUserData>(APIRoute.Login, {email, password});
      saveToken(data.accessToken);
      return data;
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'user/logout',
    async (_arg, {extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
    },
  );

  export const checkEmail = createAsyncThunk<string, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/checkEmail',
    async ({login: email}, {dispatch, extra: api}) => {
      const {data} = await api.post<string>(APIRoute.CheckEmail, {email});
      if(data) {
        return data;
      }
      return 'false';
    },
  );

  export const registerCoachAction = createAsyncThunk<
  LoggedUserData,
  CreateUserCoachDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'users/register', 
    async (CreateUserCoachDto, { extra: api }) => {
      const { data } = await api.post<LoggedUserData>(`${APIRoute.Register}`,CreateUserCoachDto);

      return data;
    },
  );

  export const registerUserAction = createAsyncThunk<
  LoggedUserData,
  CreateUserSimpleDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'users/register', 
    async (CreateUserSimpleDto, { extra: api }) => {
      const { data } = await api.post<LoggedUserData>(`${APIRoute.Register}`, CreateUserSimpleDto);

      return data;
    },
  );

