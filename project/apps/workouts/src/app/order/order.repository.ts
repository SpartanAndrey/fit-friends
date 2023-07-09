import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';
import { Order } from '@project/shared/app-types';
import { OrderQuery } from './query/order.query';

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(entity: OrderEntity): Promise<Order> {
    return this.prisma.order.create({
      data: { 
        ...entity
      },
    }) as unknown as Order;
  }

  public async update(orderId: number, entity: OrderEntity): Promise<Order> {
    return this.prisma.order.update({
      where: { 
        orderId 
      },
      data: { 
        ...entity 
      },
    }) as unknown as Order;
  }

  public async destroy(orderId: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        orderId,
      }
    });
  }

  public async findById(orderId: number): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: { 
        orderId
      },
    }) as unknown as Order;
  }

  public async find(coachId: string, { limit, sortDirection, sortType, page }: OrderQuery): Promise<Order[]> {
    
    return this.prisma.order.findMany({
      where: {
        coachId: coachId,
      },
      take: limit,
      orderBy: [
        { [sortType]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as Order[];
  }
}
