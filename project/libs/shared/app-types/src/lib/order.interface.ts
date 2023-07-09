import { OrderType } from './order-type.enum';
import { PaymentType } from './payment-type.enum';

export interface Order {
  id?: number;
  workoutId: number;
  coachId: string;
  orderType: OrderType;
  workoutPrice?: number;
  quantity?: number;
  totalPrice?: number;
  paymentType: PaymentType;
  createdAt: Date;
}
