import { OrderType, PaymentType } from "../constant";

export type Order = {
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