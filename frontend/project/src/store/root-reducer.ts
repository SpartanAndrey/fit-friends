import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constant';
//import { workoutProcess } from './workout-process/workout-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  //[NameSpace.Workout]: workoutProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
