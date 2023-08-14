import { LatLngExpression } from 'leaflet';
import { UserGender, UserLevel, UserLocation, UserRole, WorkoutTime, WorkoutType } from '../constant';

export  type UserFull = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  gender: UserGender;
  dateBirth?: Date;
  role: UserRole;
  description?: string;
  location: UserLocation;
  image?: string;
  friends?: string[];
  balance?: UserBalance;
  notifications?: Notification[];
  level: UserLevel;
  workoutType: WorkoutType[];
  certificates?: string[];
  coachInfo?: string;
  isReadyToCoach?: boolean;
  workoutTime?: WorkoutTime;
  caloriesToBurnNumber?: number;
  caloriesToSpendNumber?: number;
  isReadyToTrain?: boolean;
}

export type WorkoutsData = {
  id: number;
  quantity: number;
}

export interface UserBalance {
  workouts: WorkoutsData[];
  totalWorkoutQuantity: number;
}

export interface Notification {
  date: Date;
  text: string;
}

export type Location = {
  name: UserLocation;
  location: LatLngExpression;
};

