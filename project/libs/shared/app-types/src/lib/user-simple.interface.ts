import { WorkoutTime } from './workout-time.enum';

export interface UserSimple {
  workoutTime: WorkoutTime;
  caloriesToBurnNumber: number;
  caloriesToSpendNumber: number;
  readyToTrain: boolean;
}
