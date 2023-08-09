import { UserGender, UserLevel, UserLocation, UserRole, WorkoutTime, WorkoutType } from '../../constant';

export class UpdateUserSimpleDto {
  public id?: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public gender?: UserGender;
  public role?: UserRole;
  public description?: string;
  public location?: UserLocation;
  public dateBirth?: Date;
  public avatar?: string;
  public image?: string;
  public level?: UserLevel;
  public workoutType?: WorkoutType[];
  public workoutTime?: WorkoutTime;
  public caloriesToBurnNumber?: number;
  public caloriesToSpendNumber?: number;
  public isReadyToTrain?: boolean;
}
