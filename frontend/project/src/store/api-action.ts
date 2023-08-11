import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, DEFAULT_QUERY_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_DIRECTION_USER, DEFAULT_SORT_TYPE } from '../constant';
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
import { UserFull } from '../types/user-full.js';
import { UserQuery, WorkoutCatalogQuery } from '../types/query.js';
import { Workout } from '../types/workout.js';
import { Review } from '../types/review.js';
import { CreateReviewDto } from '../components/dto/create-review.dto.js';
import { UpdateWorkoutDto } from '../components/dto/update-workout.dto.js';
import { CreateOrderDto } from '../components/dto/create-order.dto.js';
import { Order } from '../types/order.js';


//сервис пользователей

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

  export const fetchUserAction = createAsyncThunk<UserFull, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     'users/get',
     async (id, { dispatch, extra: api }) => {
       const { data } = await api.get<UserFull>(`${APIRoute.Users}/${id}`);
       return data;
     });

  export const fetchUserCoachAction = createAsyncThunk<UserCoach, undefined, {
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
     'users/get/simple',
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
       const { data } = await api.patch<UserCoach>(`${APIRoute.Users}/${id}`, UpdateUserCoachDto);
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
         const { data } = await api.patch<UserCoach>(`${APIRoute.Users}/${id}`, UpdateUserSimpleDto);
         return data;
       });

  export const fetchUserCatalogAction = createAsyncThunk<UserFull[], UserQuery | undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      'users/catalog',
      async (query, {extra: api}) => {
        try {
          const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_QUERY_LIMIT}&`;
          const sortDirection = query && query.sortDirection ? `sortDirection=${query.sortDirection}&` : `limit=${DEFAULT_SORT_DIRECTION_USER}&`;
          const page = query && query.page ? `page=${query.page}&` : 'page=1&';
          const role = query && query.role ? `role=${query.role}&` : '';
          const location = query && query.location ? `location=${query.location}&` : '';
          const level = query && query.level ? `level=${query.level}&` : '';
          const type = query && query.workoutType ? `workoutType=${query.workoutType.join(',').trim()}` : '';

          const {data} = await api.get<UserFull[]>(`${APIRoute.Users}?${limit}${sortDirection}${page}${role}${level}${location}${type}`);
          return data;

        } catch (error) {

          return Promise.reject(error);
        }
      });

  //сервис тренировок

  export const fetchWorkoutCatalogAction = createAsyncThunk<Workout[], WorkoutCatalogQuery | undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      'workouts/catalog',
      async (query, {extra: api}) => {
        try {
          const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_QUERY_LIMIT}&`;
          const sortDirection = query && query.sortDirection ? `sortDirection=${query.sortDirection}&` : `limit=${DEFAULT_SORT_DIRECTION}&`;
          const SortType = query && query.sortType ? `sortType=${query.sortType}&` : `limit=${DEFAULT_SORT_TYPE}&`;
          const page = query && query.page ? `page=${query.page}&` : 'page=1&';
          const priceMin = query && query.priceMin ? `priceMin=${query.priceMin}&` : '';
          const priceMax = query && query.priceMax ? `priceMax=${query.priceMax}&` : '';
          const caloriesMin = query && query.caloriesMin ? `caloriesMin=${query.caloriesMin}&` : '';
          const caloriesMax = query && query.caloriesMax ? `caloriesMax=${query.caloriesMax}&` : '';
          const ratingMin = query && query.ratingMin ? `ratingMin=${query.ratingMin}&` : '';
          const ratingMax = query && query.ratingMax ? `ratingMax=${query.ratingMax}&` : '';
          const types = query && query.types ? `trainingType=${query.types.join(',').trim()}` : '';

          const {data} = await api.get<Workout[]>(`${APIRoute.Users}?${limit}${sortDirection}${SortType}${page}${types}${priceMin}${priceMax}${caloriesMin}${caloriesMax}${ratingMin}${ratingMax}`);
          return data;

        } catch (error) {

          return Promise.reject(error);
        }
      });

      export const fetchWorkoutAction = createAsyncThunk<Workout, string, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
       }>(
         'users/get',
         async (id, { dispatch, extra: api }) => {
           const { data } = await api.get<Workout>(`${APIRoute.Workouts}/${id}`);
           return data;
         });

  export const updateWorkoutAction = createAsyncThunk<Workout, UpdateWorkoutDto, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     'workouts/update',
     async ( UpdateWorkoutDto, { dispatch, extra: api }) => {
       const { id } = UpdateWorkoutDto;
       delete UpdateWorkoutDto.id;
       const { data } = await api.patch<Workout>(`${APIRoute.Users}/${id}`, UpdateWorkoutDto);
       return data;
     });

//комментарии
export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
    'workout/reviews',
    async (workoutId, {extra: api}) => {
        const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${workoutId}`);
        return data;
    });

    export const addReviewAction = createAsyncThunk<
    Review,
    CreateReviewDto,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'reviews/add', 
      async (CreateReviewDto, { extra: api }) => {
        const { data } = await api.post<Review>(`${APIRoute.Reviews}`,CreateReviewDto);
  
        return data;
      },
    );


//заказы

export const postOrderAction = createAsyncThunk<
    Order,
    CreateOrderDto,
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'orders/post', 
      async (CreateOrderDto, { extra: api }) => {
        const { data } = await api.post<Order>(`${APIRoute.Orders}`, CreateOrderDto);
  
        return data;
      },
    );


//загрузка файлов

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

