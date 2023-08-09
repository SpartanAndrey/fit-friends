import { UserGender, UserLevel, UserLocation, UserRole, WorkoutTime, WorkoutType } from '../constant';

export type UserSimple = {
  id: string;
  name: string;
  email: string;
  gender: UserGender;
  role: UserRole;
  description?: string;
  location: UserLocation;
  dateBirth: Date;
  avatar?: string;
  image?: string;
  level: UserLevel;
  workoutType: WorkoutType[];
  workoutTime?: WorkoutTime;
  caloriesToBurnNumber?: number;
  caloriesToSpendNumber?: number;
  isReadyToTrain?: boolean;
}
