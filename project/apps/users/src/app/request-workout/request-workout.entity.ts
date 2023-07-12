import { RequestStatus, RequestWorkout } from '@project/shared/app-types';

export class RequestWorkoutEntity implements RequestWorkout {
  public _id: string;
  public initiatorId: string;
  public userId: string;
  public status: RequestStatus;
  public updateStatusDate: Date;

  constructor(request: RequestWorkout) {
    this.fillEntity(request);
  }

  public fillEntity(request: RequestWorkout) {
    this._id = request._id;
    this.initiatorId= request.initiatorId;
    this.userId = request.userId;
    this.status = request.status;
    this.updateStatusDate = request.updateStatusDate;
  }

  public toObject() {
    return {
      ...this
    };
  }
}
