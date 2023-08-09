import { UserGender, UserLevel, UserLocation, UserRole, WorkoutType } from '../constant';

export type UserCoach = {
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
  certificates?: string[];
  coachInfo?: string;
  isReadyToCoach?: boolean; 
}
