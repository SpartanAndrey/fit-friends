import dayjs from 'dayjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto) {

    const orderDto = {...dto, createdAt: dayjs().toDate(), rating: 0};
    const orderEntity = new OrderEntity(orderDto);
    return this.orderRepository.create(orderEntity);
  }

  async deleteOrder(id: number): Promise<void> {
    this.orderRepository.destroy(id);
  }

  async getOrder(id: number) {
    return this.orderRepository.findById(id);
  }

  async getOrders(coachId: string, query: OrderQuery) {
    return this.orderRepository.find(coachId, query);
  }
}
