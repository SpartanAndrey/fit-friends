import { UserGender, UserLevel, UserLocation, UserRole, WorkoutType } from '../../constant';

export class CreateUserCoachDto {
  public name!: string;
  public email!: string;
  public password!: string;
  public gender!: UserGender;
  public role!: UserRole;
  public description?: string;
  public location!: UserLocation;
  public dateBirth?: Date;
  public avatar?: string;
  public image?: string;
  public level!: UserLevel;
  public workoutType!: WorkoutType[];
  public certificate?: string;
  public coachInfo?: string;
  public isReadyToCoach?: boolean; 
}
