export type RequestWorkout = {
  id: string;
  initiatorId: string;
  userId: string;
  status: RequestStatus;
  updateStatusDate: Date;
}

export enum RequestStatus {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}
