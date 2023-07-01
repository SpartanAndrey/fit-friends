import { UserCoach } from './user-coach.interface';
import { UserSimple } from './user-simple.interface';
import { User } from './user.interface';

export interface UserFull extends User, UserCoach, UserSimple {}
