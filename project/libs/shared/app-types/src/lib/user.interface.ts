import { UserCoach } from './user-coach.interface';
import { UserGender } from './user-gender.enum';
import { UserLevel } from './user-level.enum';
import { UserLocation } from './user-location.enum';
import { UserRole } from './user-role.enum';
import { UserSimple } from './user-simple.interface';
import { WorkoutType } from './workout-type.enum';

export interface User extends UserCoach, UserSimple {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  gender: UserGender;
  dateBirth: Date;
  role: UserRole;
  description: string;
  location: UserLocation
  image?: string;
  level: UserLevel;
  workoutType: WorkoutType;
}
