import { OrderType, PaymentType } from "../../constant";

export class CreateOrderDto {
  public workoutId!: number;
  public coachId!: string;
  public orderType!: OrderType;
  public workoutPrice?: number;
  public quantity?: number;
  public paymentType!: PaymentType;
}
