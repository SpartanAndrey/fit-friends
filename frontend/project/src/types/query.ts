import { SortDirection, SortType, UserLevel, UserLocation, UserRole, WorkoutTime, WorkoutType } from "../constant";

export type UserQuery = {
  limit?: number;
  sortDirection?: SortDirection;
  sortType?: SortType;
  page?: number;
  role?: UserRole;
  location?: UserLocation[];
  level?: UserLevel;
  workoutType?: WorkoutType[];
}

export type WorkoutCatalogQuery = {
  limit?: number;
  sortDirection?: SortDirection;
  sortType?: SortType;
  page?: number;
  types?: WorkoutType[];
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  coachId?: string;
}

export type WorkoutListQuery = {
  limit?: number;
  sortDirection?: SortDirection;
  sortType?: SortType;
  page?: number;
  types?: WorkoutType[];
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  times: WorkoutTime[];
  coachId?: string;
}


