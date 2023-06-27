import { RequestStatus } from './request-status.enum';

export interface Request {
  id?: number;
  userId: string;
  initiatorId: string;
  createdAt: Date;
  updatedAt?: Date;
  status: RequestStatus
}
