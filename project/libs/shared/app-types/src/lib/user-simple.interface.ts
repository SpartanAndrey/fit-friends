import { UserLevel } from './user-level.enum';
import { WorkoutType } from './workout-type.enum';
import { WorkoutTime } from './workout-time.enum';

export interface UserSimple {
  level?: UserLevel;
  workoutType?: WorkoutType[];
  workoutTime?: WorkoutTime;
  caloriesToBurnNumber?: number;
  caloriesToSpendNumber?: number;
  isReadyToTrain?: boolean;
}
