import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constant';
import { WorkoutProcess } from '../../types/state';
import { fetchReviewsAction, fetchWorkoutAction, fetchWorkoutCatalogAction } from '../api-action';

const initialState: WorkoutProcess = {
  workoutData: {
    isWorkoutCatalogLoading: false,
    isWorkoutLoading: false,
    isReviewsLoading: false,
    workouts: [],
    workout: null,
    reviews: [],
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
      })
      .addCase(fetchWorkoutAction.pending, (state) => {
        state.workoutData.isWorkoutLoading = true;
      })
      .addCase(fetchWorkoutAction.fulfilled, (state, action) => {
        state.workoutData.workout = action.payload;
        state.workoutData.isWorkoutLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.workoutData.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.workoutData.reviews = action.payload;
        state.workoutData.isReviewsLoading = false;
      });
  }
});
