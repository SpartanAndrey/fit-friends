import { OrderType } from './order-type.enum';
import { PaymentType } from './payment-type.enum';

export interface Order {
  id?: number;
  workoutId: number;
  orderType: OrderType;
  workoutPrice?: number;
  quantity?: number;
  totalPrice?: number;
  rating: number;
  review: string;
  paymentType: PaymentType;
  createdAt: Date;
}