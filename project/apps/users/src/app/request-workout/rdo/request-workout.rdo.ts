import { Expose, Transform } from 'class-transformer';
import { RequestStatus } from '@project/shared/app-types';

export class RequestWorkoutRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public initiatorId: string;

  @Expose()
  public userId: string;

  @Expose()
  public status: RequestStatus;

  @Expose()
  public updateStatusDate: Date;

}