import { UserCoach } from './user-coach.interface';
import { UserGender } from './user-gender.enum';
import { UserLocation } from './user-location.enum';
import { UserRole } from './user-role.enum';
import { UserSimple } from './user-simple.interface';

export interface User extends UserCoach, UserSimple {
  _id?: string;
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
}
