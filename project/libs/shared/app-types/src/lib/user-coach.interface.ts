import { UserLevel } from './user-level.enum';
import { WorkoutType } from './workout-type.enum';

export interface UserCoach {
  level?: UserLevel;
  workoutType?: WorkoutType[];
  certificate?: string[];
  coachInfo?: string;
  isReadyToCoach?: boolean;
}
