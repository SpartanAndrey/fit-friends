import { OrderService } from './order.service';
import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { OrderRdo } from './rdo/order.rdo';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderQuery } from './query/order.query';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);
    return fillObject(OrderRdo, newOrder);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The order found.'
  })
  @Get(':id')
  async show(@Param('id') id: number) {
    const existOrder = await this.orderService.getOrder(id);
    return fillObject(OrderRdo, existOrder);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The orders are provided.'
  })
  @Get('/coach/:coachId')
  async index(@Param('coachId') coachId: string, @Query() query: OrderQuery) {
    const orders = await this.orderService.getOrders(coachId, query);
    return fillObject(OrderRdo, orders);
  }
}
