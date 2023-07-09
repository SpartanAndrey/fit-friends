import { Order, OrderType, PaymentType } from '@project/shared/app-types';

export class OrderEntity implements Order {
  public id: number;
  public workoutId: number;
  public coachId: string;
  public orderType: OrderType;
  public workoutPrice: number;
  public quantity: number;
  public totalPrice: number;
  public paymentType: PaymentType;
  public createdAt: Date;

  constructor(order: Order) {
    this.fillEntity(order);
  }

  public fillEntity(order: Order) {
    this.id = order.id;
    this.workoutId = order.workoutId;
    this.coachId= order.coachId;
    this.orderType = order.orderType;
    this.workoutPrice = order.workoutPrice;
    this.quantity = order.quantity;
    this.totalPrice = order.workoutPrice * order.quantity;
    this.paymentType = order.paymentType;
    this.createdAt = order.createdAt;
  }

  public toObject() {
    return {
      ...this
    };
  }
}
