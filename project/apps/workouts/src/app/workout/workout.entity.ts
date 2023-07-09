import { UserLevel, Workout, WorkoutGender, WorkoutTime, WorkoutType } from '@project/shared/app-types';

export class WorkoutEntity implements Workout{
  public id: number;
  public title: string;
  public backgroundImage: string;
  public description: string;
  public level: UserLevel;
  public type: WorkoutType;
  public time: WorkoutTime
  public price: number;
  public caloriesNumber: number;
  public gender: WorkoutGender;
  public demonstration?: string;
  public rating: number;
  public coachId: string;
  public specialOffer: boolean;
  public createdAt: Date;
  public updatedAt?: Date;

  constructor(workout: Workout) {
    this.fillEntity(workout);
  }

  public fillEntity(workout: Workout) {
    this.title = workout.title;
    this.backgroundImage = workout.backgroundImage;
    this.description = workout.description;
    this.level = workout.level;
    this.type = workout.type;
    this.time = workout.time;
    this.price = workout.price;
    this.caloriesNumber = workout.caloriesNumber;
    this.gender = workout.gender;
    this.demonstration = workout.demonstration;
    this.rating = workout.rating;
    this.coachId = workout.coachId;
    this.specialOffer = workout.specialOffer;
    this.createdAt = workout.createdAt;
    this.updatedAt = workout.updatedAt;
  }

  public toObject() {
    return {
      ...this
    };
  }
}
