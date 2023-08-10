import { UserLevel, WorkoutGender, WorkoutTime, WorkoutType } from "../constant";

export type Workout = {
  id: number;
  title: string;
  backgroundImage: string;
  level: UserLevel;
  type: WorkoutType;
  time: WorkoutTime;
  price: number;
  caloriesNumber: number;
  description: string;
  gender: WorkoutGender;
  demonstration?: string;
  rating: number;
  coachId: string;
  specialOffer: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
