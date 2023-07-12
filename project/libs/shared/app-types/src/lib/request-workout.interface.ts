import { RequestStatus } from './request-status.enum';

export interface RequestWorkout {
  _id?: string;
  initiatorId: string;
  userId: string;
  status: RequestStatus;
  updateStatusDate: Date;
}
