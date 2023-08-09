import { store } from '../store/index.js';
import { AuthorizationStatus } from '../constant';
import { LoggedUserData } from './logged-user-data.js';
import { UserCoach } from './user-coach.js';

export type UserProcess = {
  userData: {
    authStatus: AuthorizationStatus;
    loggedUser: LoggedUserData | null;
    existsEmail: boolean;
    userInfo: UserCoach | null;
    isLoading: boolean;
  }
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;