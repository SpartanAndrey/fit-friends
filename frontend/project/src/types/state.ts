import { store } from '../store/index.js';
import { AuthorizationStatus } from '../constant';
import { LoggedUserData } from './logged-user-data.js';
import { UserCoach } from './user-coach.js';
import { UserFull } from './user-full.js';
import { Workout } from './workout.js';
import { Review } from './review.js';
import { UserSimple } from './user-simple.js';

export type UserProcess = {
  userData: {
    authStatus: AuthorizationStatus;
    loggedUser: LoggedUserData | null;
    existsEmail: boolean;
    coachInfo: UserCoach | null;
    userInfo: UserFull | null;
    userOtherInfo: UserFull | null;
    userSimpleInfo: UserSimple | null;
    isLoading: boolean;
    isUserCatalogLoading: boolean;
    users: UserFull[];
  }
};

export type WorkoutProcess = {
  workoutData: {
    isWorkoutCatalogLoading: boolean;
    isCoachWorkoutsLoading: boolean;
    isWorkoutLoading: boolean;
    isReviewsLoading: boolean;
    coachWorkouts: Workout[];
    workouts: Workout[],
    workout: Workout | null,
    reviews: Review[],
  }
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;