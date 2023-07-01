import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSimple, UserLevel, WorkoutType, WorkoutTime } from '@project/shared/app-types';

@Schema()

export class UserSimpleModel extends Document implements UserSimple {
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
    type: String,
    enum: WorkoutTime,
    default: WorkoutTime.Short,
  })
  public workoutTime: WorkoutTime;

  @Prop()
  public coachInfo: string;

  @Prop({
    required: true,
    default: 1000,
  })
  public caloriesToBurnNumber: number;

  @Prop({
    required: true,
    default: 1000,
  })
  public caloriesToSpendNumber: number;

  @Prop({
    required: true,
  })
  public isReadyToTrain: boolean;
}

export const UserSimpleSchema = SchemaFactory.createForClass(UserSimpleModel);
