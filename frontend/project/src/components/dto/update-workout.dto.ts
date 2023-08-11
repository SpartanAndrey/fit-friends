import { UserLevel, WorkoutGender, WorkoutTime, WorkoutType } from "../../constant";

export class UpdateWorkoutDto {
  public id?: number;
  public title?: string;
  public backgroundImage?: string;
  public description?: string;
  public level?: UserLevel;
  public type?: WorkoutType;
  public time?: WorkoutTime;
  public gender?: WorkoutGender;
  public price?: number;
  public caloriesNumber?: number;
  public demonstration?: string;
  public coachId?: string;
  public specialOffer?: boolean; 
}