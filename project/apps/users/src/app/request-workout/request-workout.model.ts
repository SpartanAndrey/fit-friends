import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequestWorkout, RequestStatus } from '@project/shared/app-types';

@Schema({
    collection: 'requests',
    timestamps: true
  })

export class RequestWorkoutModel extends Document implements RequestWorkout {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public initiatorId: string;

  @Prop({
    required: true,
    type: String,
    enum: RequestStatus,
    default: RequestStatus.Pending,
  })
  public status: RequestStatus;

  @Prop({
    required: true,
  })
  public updateStatusDate: Date;

}

export const RequestWorkoutSchema = SchemaFactory.createForClass(RequestWorkoutModel);
