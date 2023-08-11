import { NameSpace } from '../../constant';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { Workout } from '../../types/workout';

export const getWorkouts = (state: State): Workout[] => state[NameSpace.Workout].workoutData.workouts;
export const getWorkoutCatalogLoadingStatus = (state: State): boolean => state[NameSpace.Workout].workoutData.isWorkoutCatalogLoading;
export const getWorkout = (state: State): Workout | null => state[NameSpace.Workout].workoutData.workout;
export const getWorkoutLoadingStatus = (state: State): boolean => state[NameSpace.Workout].workoutData.isWorkoutLoading;
export const getReviews = (state: State): Review[] => state[NameSpace.Workout].workoutData.reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Workout].workoutData.isReviewsLoading;
