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
import { UserCoach } from '../types/user-coach.js';
import { UpdateUserCoachDto } from '../components/dto/update-user-coach.dto.js';
import { UpdateUserSimpleDto } from '../components/dto/update-user-simple.dto.js';
import { UserSimple } from '../types/user-simple.js';

export const checkAuthAction = createAsyncThunk<LoggedUserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'users/checkAuth',
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
    'users/login',
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
    'users/logout',
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
    'users/checkEmail',
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

  export const fetchUserCoachAction = createAsyncThunk<UserCoach, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     'users/get/coach',
     async (id, { dispatch, extra: api }) => {
       const { data } = await api.get<UserCoach>(`${APIRoute.Users}/${id}`);
       return data;
     });


    export const fetchUserSimpleAction = createAsyncThunk<UserSimple, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     'users/get/coach',
     async (id, { dispatch, extra: api }) => {
       const { data } = await api.get<UserSimple>(`${APIRoute.Users}/${id}`);
       return data;
     });

     
  export const updateUserCoachAction = createAsyncThunk<UserCoach, UpdateUserCoachDto, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     'users/update',
     async ( UpdateUserCoachDto, { dispatch, extra: api }) => {
       const { id } = UpdateUserCoachDto;
       delete UpdateUserCoachDto.id;
       const { data } = await api.post<UserCoach>(`${APIRoute.Users}/${id}`, UpdateUserCoachDto);
       return data;
     });

     export const updateUserSimpleAction = createAsyncThunk<UserSimple, UpdateUserSimpleDto, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
     }>(
       'users/update',
       async ( UpdateUserSimpleDto, { dispatch, extra: api }) => {
         const { id } = UpdateUserSimpleDto;
         delete UpdateUserSimpleDto.id;
         const { data } = await api.post<UserCoach>(`${APIRoute.Users}/${id}`, UpdateUserSimpleDto);
         return data;
       });

  

  export const uploadFile = createAsyncThunk<void, FileType, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
     }>(
       'files/upload',
       async (newFile: FileType, { dispatch, extra: api }) => {
        if (newFile.fileAvatar) {
          await api.post(`${APIRoute.Upload}`, newFile.fileAvatar);
        } else if (newFile.fileCertificate) {
          await api.post(`${APIRoute.Upload}`, newFile.fileCertificate);
        } else if (newFile.fileVideoWorkout) {
          await api.post(`${APIRoute.Upload}`, newFile.fileVideoWorkout);
        }
      });

