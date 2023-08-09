import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserCoach, UserLevel, WorkoutType } from '@project/shared/app-types';

@Schema()

export class UserCoachModel extends Document implements UserCoach {
  @Prop({
    required: true,
    type: String,
    enum: UserLevel,
    default: UserLevel.Beginner,
  })
  public level: UserLevel;

  @Prop({
    required: true,
    type: String,
  })
  public workoutType: WorkoutType[];

  @Prop({
    required: true,
  })
  public certificate: string[];

  @Prop()
  public coachInfo: string;

  @Prop()
  public isReadyToCoach: boolean;


}

export const UserCoachSchema = SchemaFactory.createForClass(UserCoachModel);
