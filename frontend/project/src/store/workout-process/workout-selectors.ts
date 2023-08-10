import { NameSpace } from '../../constant';
import { State } from '../../types/state';
import { Workout } from '../../types/workout';

export const getWorkouts = (state: State): Workout[] => state[NameSpace.Workout].workoutData.workouts;
export const getWorkoutCatalogLoading = (state: State): boolean => state[NameSpace.Workout].workoutData.isWorkoutCatalogLoading;
