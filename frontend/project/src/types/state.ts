import { store } from '../store/index.js';
import { AuthorizationStatus } from '../constant';
import { LoggedUserData } from './logged-user-data.js';
import { UserCoach } from './user-coach.js';
import { UserFull } from './user-full.js';
import { Workout } from './workout.js';

export type UserProcess = {
  userData: {
    authStatus: AuthorizationStatus;
    loggedUser: LoggedUserData | null;
    existsEmail: boolean;
    userInfo: UserCoach | null;
    isLoading: boolean;
    isUserCatalogLoading: boolean;
    users: UserFull[];
  }
};

export type WorkoutProcess = {
  workoutData: {
    isWorkoutCatalogLoading:boolean;
    workouts: Workout[],
  }
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;