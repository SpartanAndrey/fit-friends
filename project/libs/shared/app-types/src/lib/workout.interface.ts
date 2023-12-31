import { UserLevel } from './user-level.enum';
import { WorkoutGender } from './workout-gender.enum';
import { WorkoutTime } from './workout-time.enum';
import { WorkoutType } from './workout-type.enum';

export interface Workout {
  id?: number;
  title: string;
  backgroundImage: string;
  level: UserLevel;
  type: WorkoutType;
  time: WorkoutTime
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
