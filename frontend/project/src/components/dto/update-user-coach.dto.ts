import { UserGender, UserLevel, UserLocation, UserRole, WorkoutTime, WorkoutType } from '../../constant';

export class UpdateUserCoachDto {
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
  public certificates?: string[];
  public coachInfo?: string;
  public isReadyToCoach?: boolean; 
}
