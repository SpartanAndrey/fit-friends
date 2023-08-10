import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constant';
import { WorkoutProcess } from '../../types/state';
import { fetchWorkoutCatalogAction } from '../api-action';

const initialState: WorkoutProcess = {
  workoutData: {
    isWorkoutCatalogLoading: false,
    workouts: [],
  }
};

export const workoutProcess = createSlice({
  name: NameSpace.Workout,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWorkoutCatalogAction.pending, (state) => {
        state.workoutData.isWorkoutCatalogLoading = true;
      })
      .addCase(fetchWorkoutCatalogAction.fulfilled, (state, action) => {
        state.workoutData.workouts = action.payload;
        state.workoutData.isWorkoutCatalogLoading = false;
      })
      .addCase(fetchWorkoutCatalogAction.rejected, (state) => {
        state.workoutData.isWorkoutCatalogLoading = false;
      });
  }
});
